/*
 * This file was generated by a tool.
 * Rerun sql-ts to regenerate this file.
 */
export interface AuthenticationRow {
  cipherText: string
  createdAt: Date
  deletedAt?: Date | null
  iv: string
  lookupKey: string
  updatedAt: Date
}
export interface AuthMigrationRow {
  createdAt: Date
  handle: string
  updatedAt: Date
}
export interface BotScoreRow {
  createdAt: Date
  id?: number
  recaptchaContext: string
  recaptchaHostname: string
  recaptchaScore: string
  updatedAt: Date
  walletAddress: string
}
export interface CognitoFlowIdentityRow {
  createdAt: Date
  maskedIdentity: string
  updatedAt: Date
}
export interface CognitoFlowRow {
  createdAt: Date
  handle: string
  id: string
  score: string
  sessionId: string
  status: string
  updatedAt: Date
}
export interface FingerprintRow {
  createdAt: Date
  id?: number
  origin: enum_Fingerprints_origin
  updatedAt: Date
  userId: number
  visitorId: string
}
export interface InstagramUserRow {
  accessToken: string
  blockchainUserId?: number | null
  createdAt: Date
  id?: number
  profile: any
  updatedAt: Date
  uuid: string
  verified?: boolean
}
export interface NotificationActionRow {
  actionEntityId: number
  actionEntityType: string
  blocknumber: number
  createdAt: Date
  id?: number
  notificationId: string
  updatedAt: Date
}
export interface NotificationBrowserSubscriptionRow {
  authKey: string
  createdAt: Date
  enabled?: boolean
  endpoint: string
  p256dhKey: string
  updatedAt: Date
  userId: number
}
export interface NotificationDeviceTokenRow {
  awsARN?: string | null
  createdAt: Date
  deviceToken: string
  deviceType: enum_NotificationDeviceTokens_deviceType
  enabled?: boolean
  updatedAt: Date
  userId: number
}
export interface NotificationEmailRow {
  createdAt: Date
  emailFrequency?: enum_NotificationEmails_emailFrequency
  id?: number
  timestamp: Date
  updatedAt: Date
  userId?: number | null
}
export interface NotificationRow {
  blocknumber?: number | null
  createdAt: Date
  entityId?: number | null
  id: string
  isHidden?: boolean | null
  isRead?: boolean | null
  isViewed: boolean
  metadata?: any | null
  timestamp?: Date | null
  type?: enum_Notifications_type | null
  updatedAt: Date
  userId?: number | null
}
export interface ProtocolServiceProviderRow {
  createdAt: Date
  minimumDelegationAmount: string
  updatedAt: Date
  wallet: string
}
export interface PushedAnnouncementNotificationRow {
  announcementId?: string | null
  createdAt: Date
  id?: number
  updatedAt: Date
}
export interface PushNotificationBadgeCountRow {
  createdAt: Date
  iosBadgeCount?: number | null
  updatedAt: Date
  userId: number
}
export interface ReactionRow {
  createdAt: Date
  id?: number
  reactedTo: string
  reactionType: string
  reactionValue: number
  senderWallet: string
  slot: number
  updatedAt: Date
}
export interface RewardAttesterValueRow {
  createdAt: Date
  offset?: number
  startingBlock?: number
  updatedAt: Date
}
export interface SequelizeMetaRow {
  name: string
}
export interface SolanaNotificationActionRow {
  actionEntityId: number
  actionEntityType: string
  createdAt: Date
  id?: number
  notificationId: string
  slot: number
  updatedAt: Date
}
export interface SolanaNotificationRow {
  createdAt: Date
  entityId?: number | null
  id: string
  isHidden?: boolean | null
  isRead?: boolean | null
  isViewed?: boolean | null
  metadata?: any | null
  slot?: number | null
  type?: enum_SolanaNotifications_type | null
  updatedAt: Date
  userId?: number | null
}
export interface SubscriptionRow {
  createdAt: Date
  subscriberId: number
  updatedAt: Date
  userId: number
}
export interface TikTokUserRow {
  blockchainUserId?: number | null
  createdAt: Date
  id?: number
  profile: any
  updatedAt: Date
  uuid: string
  verified?: boolean
}
export interface TrackListenCountRow {
  createdAt: Date
  hour: Date
  listens?: number | null
  trackId: number
  updatedAt: Date
}
export interface TransactionRow {
  contractAddress: string
  contractFn: string
  contractRegistryKey: string
  createdAt: Date
  decodedABI: any
  encodedABI: string
  receipt: any
  senderAddress: string
  updatedAt: Date
}
export interface TwitterUserRow {
  blockchainUserId?: number | null
  createdAt: Date
  id?: number
  twitterProfile: any
  updatedAt: Date
  uuid: string
  verified: boolean
}
export interface UserBankTransactionMetadataRow {
  createdAt: Date
  metadata: any
  transactionSignature: string
  updatedAt: Date
  userId: number
}
export interface UserEventRow {
  createdAt: Date
  hasSentDownloadAppEmail?: boolean
  hasSignedInNativeMobile?: boolean
  needsRecoveryEmail?: boolean | null
  playlistUpdates?: any | null
  updatedAt: Date
  walletAddress: string
}
export interface UserIPRow {
  createdAt: Date
  handle: string
  updatedAt: Date
  userIP: string
}
export interface UserNotificationBrowserSettingRow {
  announcements?: boolean
  createdAt: Date
  favorites?: boolean
  followers?: boolean
  messages?: boolean
  milestonesAndAchievements?: boolean
  remixes?: boolean
  reposts?: boolean
  comments?: boolean
  mentions?: boolean
  updatedAt: Date
  userId: number
}
export interface UserNotificationMobileSettingRow {
  announcements?: boolean
  createdAt: Date
  favorites?: boolean
  followers?: boolean
  messages?: boolean
  milestonesAndAchievements?: boolean
  remixes?: boolean
  reposts?: boolean
  comments?: boolean
  mentions?: boolean
  updatedAt: Date
  userId: number
}
export interface UserRow {
  appliedRules?: any | null
  blockchainUserId?: number | null
  createdAt: Date
  email: string
  handle?: string | null
  id?: number
  IP?: string | null
  isBlockedFromEmails?: boolean | null
  isBlockedFromNotifications?: boolean | null
  isBlockedFromRelay?: boolean | null
  isConfigured?: boolean
  isEmailDeliverable?: boolean | null
  lastSeenDate: Date
  timezone?: string | null
  updatedAt: Date
  walletAddress?: string | null
}
export enum enum_SolanaNotifications_type {
  'ChallengeReward' = 'ChallengeReward',
  'MilestoneListen' = 'MilestoneListen',
  'TipSend' = 'TipSend',
  'TipReceive' = 'TipReceive',
  'Reaction' = 'Reaction',
  'SupporterRankUp' = 'SupporterRankUp',
  'SupportingRankUp' = 'SupportingRankUp',
  'SupporterDethroned' = 'SupporterDethroned'
}
export enum enum_Notifications_type {
  'Follow' = 'Follow',
  'RepostTrack' = 'RepostTrack',
  'RepostPlaylist' = 'RepostPlaylist',
  'RepostAlbum' = 'RepostAlbum',
  'FavoriteTrack' = 'FavoriteTrack',
  'FavoritePlaylist' = 'FavoritePlaylist',
  'FavoriteAlbum' = 'FavoriteAlbum',
  'CreateTrack' = 'CreateTrack',
  'CreatePlaylist' = 'CreatePlaylist',
  'CreateAlbum' = 'CreateAlbum',
  'Announcement' = 'Announcement',
  'MilestoneListen' = 'MilestoneListen',
  'MilestoneRepost' = 'MilestoneRepost',
  'MilestoneFavorite' = 'MilestoneFavorite',
  'MilestoneFollow' = 'MilestoneFollow',
  'RemixCreate' = 'RemixCreate',
  'RemixCosign' = 'RemixCosign',
  'TrendingTrack' = 'TrendingTrack',
  'AddTrackToPlaylist' = 'AddTrackToPlaylist'
}
export enum enum_NotificationEmails_emailFrequency {
  'daily' = 'daily',
  'weekly' = 'weekly',
  'off' = 'off',
  'live' = 'live'
}
export enum enum_NotificationDeviceTokens_deviceType {
  'ios' = 'ios',
  'android' = 'android',
  'safari' = 'safari'
}
export enum enum_Fingerprints_origin {
  'web' = 'web',
  'mobile' = 'mobile',
  'desktop' = 'desktop'
}
