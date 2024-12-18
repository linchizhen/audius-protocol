/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * API
 * Audius V1 API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AlbumBacklink } from './AlbumBacklink';
import {
    AlbumBacklinkFromJSON,
    AlbumBacklinkFromJSONTyped,
    AlbumBacklinkToJSON,
} from './AlbumBacklink';
import type { RemixParent } from './RemixParent';
import {
    RemixParentFromJSON,
    RemixParentFromJSONTyped,
    RemixParentToJSON,
} from './RemixParent';
import type { TrackArtwork } from './TrackArtwork';
import {
    TrackArtworkFromJSON,
    TrackArtworkFromJSONTyped,
    TrackArtworkToJSON,
} from './TrackArtwork';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Track
 */
export interface Track {
    /**
     * 
     * @type {TrackArtwork}
     * @memberof Track
     */
    artwork: TrackArtwork;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    genre: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    trackCid?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    previewCid?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    origFileCid?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    origFilename?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Track
     */
    isOriginalAvailable: boolean;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    mood?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    releaseDate?: string;
    /**
     * 
     * @type {RemixParent}
     * @memberof Track
     */
    remixOf?: RemixParent;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    repostCount: number;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    favoriteCount: number;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    commentCount: number;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    tags?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    title: string;
    /**
     * 
     * @type {User}
     * @memberof Track
     */
    user: User;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    duration: number;
    /**
     * 
     * @type {boolean}
     * @memberof Track
     */
    isDownloadable: boolean;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    playCount: number;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    permalink: string;
    /**
     * 
     * @type {boolean}
     * @memberof Track
     */
    isStreamable?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    ddexApp?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof Track
     */
    playlistsContainingTrack?: Array<number>;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    pinnedCommentId?: number;
    /**
     * 
     * @type {AlbumBacklink}
     * @memberof Track
     */
    albumBacklink?: AlbumBacklink;
}

/**
 * Check if a given object implements the Track interface.
 */
export function instanceOfTrack(value: object): value is Track {
    let isInstance = true;
    isInstance = isInstance && "artwork" in value && value["artwork"] !== undefined;
    isInstance = isInstance && "genre" in value && value["genre"] !== undefined;
    isInstance = isInstance && "id" in value && value["id"] !== undefined;
    isInstance = isInstance && "isOriginalAvailable" in value && value["isOriginalAvailable"] !== undefined;
    isInstance = isInstance && "repostCount" in value && value["repostCount"] !== undefined;
    isInstance = isInstance && "favoriteCount" in value && value["favoriteCount"] !== undefined;
    isInstance = isInstance && "commentCount" in value && value["commentCount"] !== undefined;
    isInstance = isInstance && "title" in value && value["title"] !== undefined;
    isInstance = isInstance && "user" in value && value["user"] !== undefined;
    isInstance = isInstance && "duration" in value && value["duration"] !== undefined;
    isInstance = isInstance && "isDownloadable" in value && value["isDownloadable"] !== undefined;
    isInstance = isInstance && "playCount" in value && value["playCount"] !== undefined;
    isInstance = isInstance && "permalink" in value && value["permalink"] !== undefined;

    return isInstance;
}

export function TrackFromJSON(json: any): Track {
    return TrackFromJSONTyped(json, false);
}

export function TrackFromJSONTyped(json: any, ignoreDiscriminator: boolean): Track {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'artwork': TrackArtworkFromJSON(json['artwork']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'genre': json['genre'],
        'id': json['id'],
        'trackCid': !exists(json, 'track_cid') ? undefined : json['track_cid'],
        'previewCid': !exists(json, 'preview_cid') ? undefined : json['preview_cid'],
        'origFileCid': !exists(json, 'orig_file_cid') ? undefined : json['orig_file_cid'],
        'origFilename': !exists(json, 'orig_filename') ? undefined : json['orig_filename'],
        'isOriginalAvailable': json['is_original_available'],
        'mood': !exists(json, 'mood') ? undefined : json['mood'],
        'releaseDate': !exists(json, 'release_date') ? undefined : json['release_date'],
        'remixOf': !exists(json, 'remix_of') ? undefined : RemixParentFromJSON(json['remix_of']),
        'repostCount': json['repost_count'],
        'favoriteCount': json['favorite_count'],
        'commentCount': json['comment_count'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'title': json['title'],
        'user': UserFromJSON(json['user']),
        'duration': json['duration'],
        'isDownloadable': json['is_downloadable'],
        'playCount': json['play_count'],
        'permalink': json['permalink'],
        'isStreamable': !exists(json, 'is_streamable') ? undefined : json['is_streamable'],
        'ddexApp': !exists(json, 'ddex_app') ? undefined : json['ddex_app'],
        'playlistsContainingTrack': !exists(json, 'playlists_containing_track') ? undefined : json['playlists_containing_track'],
        'pinnedCommentId': !exists(json, 'pinned_comment_id') ? undefined : json['pinned_comment_id'],
        'albumBacklink': !exists(json, 'album_backlink') ? undefined : AlbumBacklinkFromJSON(json['album_backlink']),
    };
}

export function TrackToJSON(value?: Track | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'artwork': TrackArtworkToJSON(value.artwork),
        'description': value.description,
        'genre': value.genre,
        'id': value.id,
        'track_cid': value.trackCid,
        'preview_cid': value.previewCid,
        'orig_file_cid': value.origFileCid,
        'orig_filename': value.origFilename,
        'is_original_available': value.isOriginalAvailable,
        'mood': value.mood,
        'release_date': value.releaseDate,
        'remix_of': RemixParentToJSON(value.remixOf),
        'repost_count': value.repostCount,
        'favorite_count': value.favoriteCount,
        'comment_count': value.commentCount,
        'tags': value.tags,
        'title': value.title,
        'user': UserToJSON(value.user),
        'duration': value.duration,
        'is_downloadable': value.isDownloadable,
        'play_count': value.playCount,
        'permalink': value.permalink,
        'is_streamable': value.isStreamable,
        'ddex_app': value.ddexApp,
        'playlists_containing_track': value.playlistsContainingTrack,
        'pinned_comment_id': value.pinnedCommentId,
        'album_backlink': AlbumBacklinkToJSON(value.albumBacklink),
    };
}

