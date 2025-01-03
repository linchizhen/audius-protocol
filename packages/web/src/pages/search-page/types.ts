import {
  SearchCategory,
  useGetSearchResults as useGetSearchResultsApi
} from '@audius/common/api'
import { ID } from '@audius/common/models'
import { IconComponent } from '@audius/harmony'
import { Mood } from '@audius/sdk'

import { categories } from './categories'

export type ViewLayout = 'grid' | 'list'
export const viewLayoutOptions: { label: string; value: ViewLayout }[] = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' }
]

// NOTE: This is different from SearchCategory because
// it uses `profiles` instead of `users`
export enum CategoryView {
  ALL = 'all',
  PROFILES = 'profiles',
  TRACKS = 'tracks',
  PLAYLISTS = 'playlists',
  ALBUMS = 'albums'
}

export type Filter =
  | 'genre'
  | 'mood'
  | 'key'
  | 'bpm'
  | 'isPremium'
  | 'hasDownloads'
  | 'isVerified'

export type Category = {
  filters: Filter[]
  icon?: IconComponent
}

export type MoodInfo = {
  label: Mood
  value: Mood
  icon: JSX.Element
}

type SearchResultsApiType = ReturnType<typeof useGetSearchResultsApi>

export type SearchResultsType<C extends SearchCategory> = {
  status: SearchResultsApiType['status']
  data: C extends 'all'
    ? {
        users: ID[]
        tracks: ID[]
        playlists: ID[]
        albums: ID[]
      }
    : ID[]
}

export type CategoryKey = keyof typeof categories
