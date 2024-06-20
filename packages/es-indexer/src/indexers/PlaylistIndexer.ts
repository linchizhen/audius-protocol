import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types'
import {
  keyBy,
  merge,
  countBy,
  entries,
  flow,
  head,
  last,
  maxBy,
  partialRight,
  compact,
} from 'lodash'
import { dialPg } from '../conn'
import { splitTags } from '../helpers/splitTags'
import { indexNames } from '../indexNames'
import { BlocknumberCheckpoint } from '../types/blocknumber_checkpoint'
import { PlaylistDoc } from '../types/docs'
import { BaseIndexer } from './BaseIndexer'
import {
  lowerKeyword,
  noWhitespaceLowerKeyword,
  sharedIndexSettings,
  standardSuggest,
  standardText,
} from './sharedIndexSettings'

export class PlaylistIndexer extends BaseIndexer<PlaylistDoc> {
  constructor() {
    super('playlists', 'playlist_id')
  }

  mapping: IndicesCreateRequest = {
    index: indexNames.playlists,
    settings: merge(sharedIndexSettings, {}),
    mappings: {
      dynamic: false,
      properties: {
        blocknumber: { type: 'integer' },
        playlist_owner_id: { type: 'keyword' },
        created_at: { type: 'date' },
        updated_at: { type: 'date' },
        is_album: { type: 'boolean' },
        is_private: { type: 'boolean' },
        permalink: lowerKeyword,
        is_delete: { type: 'boolean' },
        routes: lowerKeyword,
        suggest: standardSuggest,
        playlist_name: {
          ...lowerKeyword,
          fields: {
            searchable: standardText,
          },
        },
        'playlist_contents.track_ids.track': { type: 'keyword' },
        purchaseable: { type: 'boolean' },

        user: {
          properties: {
            handle: {
              ...noWhitespaceLowerKeyword,
              fields: {
                searchable: standardText,
              },
            },
            name: {
              ...lowerKeyword,
              fields: {
                searchable: standardText,
              },
            },
            location: lowerKeyword,
            follower_count: { type: 'integer' },
            is_verified: { type: 'boolean' },
            created_at: { type: 'date' },
            updated_at: { type: 'date' },
          },
        },

        // saves
        saved_by: { type: 'keyword' },
        save_count: { type: 'integer' },
        // reposts
        reposted_by: { type: 'keyword' },
        repost_count: { type: 'integer' },

        dominant_mood: lowerKeyword,

        tracks: {
          properties: {
            mood: lowerKeyword,
            genre: lowerKeyword,
            tags: lowerKeyword,
            play_count: { type: 'integer' },
            repost_count: { type: 'integer' },
            save_count: { type: 'integer' },
            downloadable: { type: 'boolean' },
            has_stems: { type: 'boolean' },
          },
        },
        is_image_autogenerated: { type: 'boolean' },
      },
    },
  }

  baseSelect(): string {
    return `
      -- etl playlists
      select 
        playlists.*,
        case when playlists.stream_conditions->>'usdc_purchase'
          is not null then true
          else false
        end as purchaseable,

        json_build_object(
          'handle', users.handle,
          'name', users.name,
          'location', users.location,
          'follower_count', follower_count,
          'is_verified', users.is_verified,
          'created_at', users.created_at,
          'updated_at', users.updated_at
        ) as user,

        array(
          select slug
          from playlist_routes pr
          where
            pr.playlist_id = playlists.playlist_id
          order by is_current
        ) as routes,

        array(
          select user_id 
          from reposts
          where
            is_delete = false
            and repost_type != 'track'::reposttype
            and repost_item_id = playlist_id
            order by created_at desc
        ) as reposted_by,
      
        array(
          select user_id 
          from saves
          where
            is_delete = false
            and save_type != 'track'::savetype
            and save_item_id = playlist_id
            order by created_at desc
        ) as saved_by

      from playlists 
      join users on playlist_owner_id = user_id
      left join aggregate_user on users.user_id = aggregate_user.user_id
      where 1=1 
    `
  }

  checkpointSql(checkpoint: BlocknumberCheckpoint): string {
    // really we should mark playlist stale if any of the playlist tracks changes
    // but don't know how to do the sql for that... so the low tech solution would be to re-do playlists from scratch
    // which might actually be faster, since it's a very small collection
    // in which case we could just delete this function

    // track play_count will also go stale (same problem as above)

    return `
      and playlist_id in (
        select playlist_id from playlists where blocknumber >= ${checkpoint.playlists}
        union
        select save_item_id from saves where save_type in ('playlist', 'album') and blocknumber >= ${checkpoint.saves}
        union
        select repost_item_id from reposts where repost_type in ('playlist', 'album') and blocknumber >= ${checkpoint.reposts}
      )`
  }

  async withBatch(rows: PlaylistDoc[]) {
    // collect all the track IDs
    const trackIds = new Set<number>()
    for (let row of rows) {
      row.playlist_contents.track_ids
        .map((t: any) => t.track)
        .filter(Boolean)
        .forEach((t: any) => trackIds.add(t))
    }

    // fetch the tracks...
    const tracksById = await this.getTracks(Array.from(trackIds))

    // pull track data onto playlist
    for (let playlist of rows) {
      playlist.tracks = playlist.playlist_contents.track_ids
        .map((t: any) => tracksById[t.track])
        .filter(Boolean)

      // determine most common mood
      playlist.dominant_mood = flow(
        compact,
        countBy,
        entries,
        partialRight(maxBy, last),
        head
      )(playlist.tracks.map((t) => t.mood)) as string

      playlist.total_play_count = playlist.tracks.reduce(
        (acc, s) => acc + parseInt(s.play_count),
        0
      )
    }
  }

  withRow(row: PlaylistDoc) {
    row.suggest = [row.playlist_name, row.user.handle, row.user.name]
      .filter((x) => x)
      .join(' ')
    row.repost_count = row.reposted_by.length
    row.save_count = row.saved_by.length
    const slug = row.routes[row.routes.length - 1]
    const collectionType = row.is_album ? 'album' : 'playlist'
    row.permalink = `/${row.user.handle}/${collectionType}/${slug}`
  }

  private async getTracks(trackIds: number[]) {
    if (!trackIds.length) return {}
    const pg = dialPg()
    const idList = Array.from(trackIds).join(',')
    // do we want artist name from users
    // or save + repost counts from aggregate_track?
    const q = `
      select 
        track_id,
        genre,
        mood,
        tags,
        title,
        created_at,
        coalesce(aggregate_track.repost_count, 0) as repost_count,
        coalesce(aggregate_track.save_count, 0) as save_count,
        coalesce(aggregate_plays.count, 0) as play_count,
        is_downloadable as downloadable,

        array(
          select stems.child_track_id
          from stems
          left join tracks as stem_track on stems.child_track_id = stem_track.track_id
          where
            stem_track.is_delete = false
            and stems.parent_track_id = tracks.track_id
        ) as stem_ids
  
      from tracks
      left join aggregate_track using (track_id)
      left join aggregate_plays on tracks.track_id = aggregate_plays.play_item_id
      where 
        is_delete = false
        and is_unlisted = false
        and track_id in (${idList})`
    const allTracks = await pg.query(q)
    for (let t of allTracks.rows) {
      t.tags = splitTags(t.tags)
      t.has_stems = t.stem_ids.length > 0
    }
    return keyBy(allTracks.rows, 'track_id')
  }
}
