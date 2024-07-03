import { searchApiFetch } from '@audius/common/api'
import { Track } from '@audius/common/models'
import {
  accountSelectors,
  cacheTracksSelectors,
  getContext,
  searchResultsPageTracksLineupActions as tracksActions,
  searchResultsPageSelectors,
  SearchKind
} from '@audius/common/store'
import { trimToAlphaNumeric } from '@audius/common/utils'
import { select, all, call } from 'typed-redux-saga'

import { LineupSagas } from 'common/store/lineup/sagas'
import { getTagSearchResults } from 'common/store/pages/search-page/sagas'
import { isMobileWeb } from 'common/utils/isMobileWeb'

const { getSearchTracksLineup, getSearchResultsPageTracks } =
  searchResultsPageSelectors
const { getTracks } = cacheTracksSelectors
const { getUserId } = accountSelectors

function* getSearchPageResultsTracks({
  offset,
  limit,
  payload: { category, query, isTagSearch, filters, dispatch }
}: {
  offset: number
  limit: number
  payload?: any
}) {
  const isNativeMobile = yield* getContext('isNativeMobile')
  if (category === SearchKind.TRACKS || isNativeMobile || isMobileWeb()) {
    // If we are on the tracks sub-page of search or mobile, which we should paginate on
    let results: Track[]
    if (isTagSearch) {
      const { tracks } = yield* call(
        getTagSearchResults,
        trimToAlphaNumeric(query),
        category,
        limit,
        offset
      )
      results = tracks
    } else {
      const audiusBackend = yield* getContext('audiusBackendInstance')
      const apiClient = yield* getContext('apiClient')
      const reportToSentry = yield* getContext('reportToSentry')
      const currentUserId = yield* select(getUserId)

      const { tracks } = yield* call(
        searchApiFetch.getSearchResults,
        {
          currentUserId,
          query,
          category,
          limit,
          offset,
          ...filters
        },
        {
          audiusBackend,
          apiClient,
          reportToSentry,
          dispatch
        } as any
      )
      results = tracks as unknown as Track[]
    }
    if (results) return results
    return [] as Track[]
  } else {
    // If we are part of the all results search page
    try {
      const trackIds = yield* select(getSearchResultsPageTracks)

      // getTracks returns an unsorted map of ID to track metadata.
      // We sort this object by trackIds, which is returned sorted by discprov.
      const [tracks, sortedIds] = yield* all([
        select(getTracks, { ids: trackIds }),
        select(getSearchResultsPageTracks)
      ])
      const sortedTracks = (sortedIds as number[]).map((id) => tracks[id])
      return sortedTracks as Track[]
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

class SearchPageResultsSagas extends LineupSagas<Track> {
  constructor() {
    super(
      tracksActions.prefix,
      tracksActions,
      getSearchTracksLineup,
      getSearchPageResultsTracks
    )
  }
}

export default function sagas() {
  return new SearchPageResultsSagas().getSagas()
}
