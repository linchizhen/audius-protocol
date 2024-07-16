import { IconComponent } from '@audius/harmony'

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
