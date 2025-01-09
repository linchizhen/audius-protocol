import type { FunctionComponent } from 'react'

import { type IconProps as HarmonyIconProps } from '@audius/harmony/src/components/icon'
import type { AnimatedProps } from 'react-native-reanimated'
import type { SvgProps } from 'react-native-svg'

export type IconProps = Omit<SvgProps, 'color'> &
  HarmonyIconProps &
  AnimatedProps<SvgProps> & {
    fillSecondary?: string
  }

export type IconComponent = FunctionComponent<IconProps>

export { default as IconAlbum } from '@audius/harmony/src/assets/icons/Album.svg'
export { default as IconFilter } from '@audius/harmony/src/assets/icons/Filter.svg'
export { default as IconSearch } from '@audius/harmony/src/assets/icons/Search.svg'
export { default as IconAllTime } from '@audius/harmony/src/assets/icons/AllTime.svg'
export { default as IconFolder } from '@audius/harmony/src/assets/icons/Folder.svg'
export { default as IconSend } from '@audius/harmony/src/assets/icons/Send.svg'
export { default as IconAppearance } from '@audius/harmony/src/assets/icons/Appearance.svg'
export { default as IconGift } from '@audius/harmony/src/assets/icons/Gift.svg'
export { default as IconSettings } from '@audius/harmony/src/assets/icons/Settings.svg'
export { default as IconArrowLeft } from '@audius/harmony/src/assets/icons/ArrowLeft.svg'
export { default as IconHeart } from '@audius/harmony/src/assets/icons/Heart.svg'
export { default as IconShare } from '@audius/harmony/src/assets/icons/Share.svg'
export { default as IconArrowRight } from '@audius/harmony/src/assets/icons/ArrowRight.svg'
export { default as IconImage } from '@audius/harmony/src/assets/icons/Image.svg'
export { default as IconShieldCheck } from '@audius/harmony/src/assets/icons/ShieldCheck.svg'
export { default as IconShieldUser } from '@audius/harmony/src/assets/icons/ShieldUser.svg'
export { default as IconBoxHeart } from '@audius/harmony/src/assets/icons/BoxHeart.svg'
export { default as IconIndent } from '@audius/harmony/src/assets/icons/Indent.svg'
export { default as IconShuffle } from '@audius/harmony/src/assets/icons/Shuffle.svg'
export { default as IconCalendarDay } from '@audius/harmony/src/assets/icons/CalendarDay.svg'
export { default as IconInfo } from '@audius/harmony/src/assets/icons/Info.svg'
export { default as IconSignOut } from '@audius/harmony/src/assets/icons/SignOut.svg'
export { default as IconCalendarMonth } from '@audius/harmony/src/assets/icons/CalendarMonth.svg'
export { default as IconKebabHorizontal } from '@audius/harmony/src/assets/icons/KebabHorizontal.svg'
export { default as IconSkipNext } from '@audius/harmony/src/assets/icons/SkipNext.svg'
export { default as IconCalendarWeek } from '@audius/harmony/src/assets/icons/CalendarWeek.svg'
export { default as IconKey } from '@audius/harmony/src/assets/icons/Key.svg'
export { default as IconSkipPrevious } from '@audius/harmony/src/assets/icons/SkipPrevious.svg'
export { default as IconCamera } from '@audius/harmony/src/assets/icons/Camera.svg'
export { default as IconLibrary } from '@audius/harmony/src/assets/icons/Library.svg'
export { default as IconSkull } from '@audius/harmony/src/assets/icons/Skull.svg'
export { default as IconCampfire } from '@audius/harmony/src/assets/icons/Campfire.svg'
export { default as IconLink } from '@audius/harmony/src/assets/icons/Link.svg'
export { default as IconSort } from '@audius/harmony/src/assets/icons/Sort.svg'
export { default as IconCaretDown } from '@audius/harmony/src/assets/icons/CaretDown.svg'
export { default as IconListeningHistory } from '@audius/harmony/src/assets/icons/ListeningHistory.svg'
export { default as IconSortDown } from '@audius/harmony/src/assets/icons/SortDown.svg'
export { default as IconCaretLeft } from '@audius/harmony/src/assets/icons/CaretLeft.svg'
export { default as IconListens } from '@audius/harmony/src/assets/icons/Listens.svg'
export { default as IconSortUp } from '@audius/harmony/src/assets/icons/SortUp.svg'
export { default as IconCaretRight } from '@audius/harmony/src/assets/icons/CaretRight.svg'
export { default as IconLock } from '@audius/harmony/src/assets/icons/Lock.svg'
export { default as IconSpeaker } from '@audius/harmony/src/assets/icons/Speaker.svg'
export { default as IconCaretUp } from '@audius/harmony/src/assets/icons/CaretUp.svg'
export { default as IconLockUnlocked } from '@audius/harmony/src/assets/icons/LockUnlocked.svg'
export { default as IconSpecialAccess } from '@audius/harmony/src/assets/icons/SpecialAccess.svg'
export { default as IconCart } from '@audius/harmony/src/assets/icons/Cart.svg'
export { default as IconMessage } from '@audius/harmony/src/assets/icons/Message.svg'
export { default as IconMessages } from '@audius/harmony/src/assets/icons/Messages.svg'
export { default as IconMerch } from '@audius/harmony/src/assets/icons/Merch.svg'
export { default as IconStar } from '@audius/harmony/src/assets/icons/Star.svg'
export { default as IconCastAirplay } from '@audius/harmony/src/assets/icons/CastAirplay.svg'
export { default as IconMessageBlock } from '@audius/harmony/src/assets/icons/MessageBlock.svg'
export { default as IconMessageSlash } from '@audius/harmony/src/assets/icons/MessageSlash.svg'
export { default as IconStars } from '@audius/harmony/src/assets/icons/Stars.svg'
export { default as IconCastChromecast } from '@audius/harmony/src/assets/icons/CastChromecast.svg'
export { default as IconMessageLocked } from '@audius/harmony/src/assets/icons/MessageLocked.svg'
export { default as IconTastemaker } from '@audius/harmony/src/assets/icons/Tastemaker.svg'
export { default as IconCheck } from '@audius/harmony/src/assets/icons/Check.svg'
export { default as IconMessageUnblock } from '@audius/harmony/src/assets/icons/MessageUnblock.svg'
export { default as IconThumbsDown } from '@audius/harmony/src/assets/icons/ThumbsDown.svg'
export { default as IconClose } from '@audius/harmony/src/assets/icons/Close.svg'
export { default as IconMinus } from '@audius/harmony/src/assets/icons/Minus.svg'
export { default as IconThumbsUp } from '@audius/harmony/src/assets/icons/ThumbsUp.svg'
export { default as IconCloseAlt } from '@audius/harmony/src/assets/icons/CloseAlt.svg'
export { default as IconMood } from '@audius/harmony/src/assets/icons/Mood.svg'
export { default as IconTipping } from '@audius/harmony/src/assets/icons/Tipping.svg'
export { default as IconCloudDownload } from '@audius/harmony/src/assets/icons/CloudDownload.svg'
export { default as IconNoWifi } from '@audius/harmony/src/assets/icons/NoWifi.svg'
export { default as IconTowerBroadcast } from '@audius/harmony/src/assets/icons/TowerBroadcast.svg'
export { default as IconTransaction } from '@audius/harmony/src/assets/icons/Transaction.svg'
export { default as IconCloudDownloadError } from '@audius/harmony/src/assets/icons/CloudDownloadError.svg'
export { default as IconNote } from '@audius/harmony/src/assets/icons/Note.svg'
export { default as IconTrash } from '@audius/harmony/src/assets/icons/Trash.svg'
export { default as IconCloudDownloadInactive } from '@audius/harmony/src/assets/icons/CloudDownloadInactive.svg'
export { default as IconNotificationOff } from '@audius/harmony/src/assets/icons/NotificationOff.svg'
export { default as IconTrending } from '@audius/harmony/src/assets/icons/Trending.svg'
export { default as IconCloudDownloadPaused } from '@audius/harmony/src/assets/icons/CloudDownloadPaused.svg'
export { default as IconNotificationOn } from '@audius/harmony/src/assets/icons/NotificationOn.svg'
export { default as IconTrophy } from '@audius/harmony/src/assets/icons/Trophy.svg'
export { default as IconCloudDownloadQueued } from '@audius/harmony/src/assets/icons/CloudDownloadQueued.svg'
export { default as IconPause } from '@audius/harmony/src/assets/icons/Pause.svg'
export { default as IconTurntable } from '@audius/harmony/src/assets/icons/Turntable.svg'
export { default as IconCloudUpload } from '@audius/harmony/src/assets/icons/CloudUpload.svg'
export { default as IconPencil } from '@audius/harmony/src/assets/icons/Pencil.svg'
export { default as IconUser } from '@audius/harmony/src/assets/icons/User.svg'
export { default as IconUserArrowRotate } from '@audius/harmony/src/assets/icons/UserArrowRotate.svg'
export { default as IconCollectible } from '@audius/harmony/src/assets/icons/Collectible.svg'
export { default as IconPlay } from '@audius/harmony/src/assets/icons/Play.svg'
export { default as IconUserFollow } from '@audius/harmony/src/assets/icons/UserFollow.svg'
export { default as IconCompose } from '@audius/harmony/src/assets/icons/Compose.svg'
export { default as IconPlaylists } from '@audius/harmony/src/assets/icons/Playlists.svg'
export { default as IconUserFollowers } from '@audius/harmony/src/assets/icons/UserFollowers.svg'
export { default as IconCopy } from '@audius/harmony/src/assets/icons/Copy.svg'
export { default as IconPlus } from '@audius/harmony/src/assets/icons/Plus.svg'
export { default as IconUserFollowing } from '@audius/harmony/src/assets/icons/UserFollowing.svg'
export { default as IconCreatePlaylist } from '@audius/harmony/src/assets/icons/CreatePlaylist.svg'
export { default as IconPodcastBack } from '@audius/harmony/src/assets/icons/PodcastBack.svg'
export { default as IconUserGroup } from '@audius/harmony/src/assets/icons/UserGroup.svg'
export { default as IconCrown } from '@audius/harmony/src/assets/icons/Crown.svg'
export { default as IconPodcastForward } from '@audius/harmony/src/assets/icons/PodcastForward.svg'
export { default as IconUserList } from '@audius/harmony/src/assets/icons/UserList.svg'
export { default as IconDashboard } from '@audius/harmony/src/assets/icons/Dashboard.svg'
export { default as IconQuestionCircle } from '@audius/harmony/src/assets/icons/QuestionCircle.svg'
export { default as IconQrCode } from '@audius/harmony/src/assets/icons/QrCode.svg'
export { default as IconUserUnfollow } from '@audius/harmony/src/assets/icons/UserUnfollow.svg'
export { default as IconDesktop } from '@audius/harmony/src/assets/icons/Desktop.svg'
export { default as IconRadar } from '@audius/harmony/src/assets/icons/Radar.svg'
export { default as IconVisibilityHidden } from '@audius/harmony/src/assets/icons/VisibilityHidden.svg'
export { default as IconDonate } from '@audius/harmony/src/assets/icons/Donate.svg'
export { default as IconReceive } from '@audius/harmony/src/assets/icons/Receive.svg'
export { default as IconVisibilityPublic } from '@audius/harmony/src/assets/icons/VisibilityPublic.svg'
export { default as IconDrag } from '@audius/harmony/src/assets/icons/Drag.svg'
export { default as IconRefresh } from '@audius/harmony/src/assets/icons/Refresh.svg'
export { default as IconVolumeLevel0 } from '@audius/harmony/src/assets/icons/VolumeLevel0.svg'
export { default as IconEarnings } from '@audius/harmony/src/assets/icons/Earnings.svg'
export { default as IconRemix } from '@audius/harmony/src/assets/icons/Remix.svg'
export { default as IconVolumeLevel1 } from '@audius/harmony/src/assets/icons/VolumeLevel1.svg'
export { default as IconEmailAddress } from '@audius/harmony/src/assets/icons/EmailAddress.svg'
export { default as IconRemove } from '@audius/harmony/src/assets/icons/Remove.svg'
export { default as IconVolumeLevel2 } from '@audius/harmony/src/assets/icons/VolumeLevel2.svg'
export { default as IconEmbed } from '@audius/harmony/src/assets/icons/Embed.svg'
export { default as IconRepeatOff } from '@audius/harmony/src/assets/icons/RepeatOff.svg'
export { default as IconVolumeLevel3 } from '@audius/harmony/src/assets/icons/VolumeLevel3.svg'
export { default as IconError } from '@audius/harmony/src/assets/icons/Error.svg'
export { default as IconRepost } from '@audius/harmony/src/assets/icons/Repost.svg'
export { default as IconWallet } from '@audius/harmony/src/assets/icons/Wallet.svg'
export { default as IconExplore } from '@audius/harmony/src/assets/icons/Explore.svg'
export { default as IconRobot } from '@audius/harmony/src/assets/icons/Robot.svg'
export { default as IconWand } from '@audius/harmony/src/assets/icons/Wand.svg'
export { default as IconExternalLink } from '@audius/harmony/src/assets/icons/ExternalLink.svg'
export { default as IconRocket } from '@audius/harmony/src/assets/icons/Rocket.svg'
export { default as IconWithdraw } from '@audius/harmony/src/assets/icons/Withdraw.svg'
export { default as IconFeed } from '@audius/harmony/src/assets/icons/Feed.svg'
export { default as IconSave } from '@audius/harmony/src/assets/icons/Save.svg'
export { default as IconRecoveryEmail } from '@audius/harmony/src/assets/icons/RecoveryEmail.svg'
export { default as IconHeadphones } from '@audius/harmony/src/assets/icons/Headphones.svg'
export { default as IconValidationCheck } from '@audius/harmony/src/assets/icons/ValidationCheck.svg'
export { default as IconValidationX } from '@audius/harmony/src/assets/icons/ValidationX.svg'
export { default as IconSoundwave } from '@audius/harmony/src/assets/icons/Soundwave.svg'
export { default as IconCreditCard } from '@audius/harmony/src/assets/icons/CreditCard.svg'
export { default as IconWaveform } from '@audius/harmony/src/assets/icons/Waveform.svg'
export { default as IconMoneyBracket } from '@audius/harmony/src/assets/icons/MoneyBracket.svg'
export { default as IconPin } from '@audius/harmony/src/assets/icons/Pin.svg'
export { default as IconPaperAirplane } from '@audius/harmony/src/assets/icons/PaperAirplane.svg'
export { default as IconArrowUpToLine } from '@audius/harmony/src/assets/icons/ArrowUpToLine.svg'

// Two Tone / Special Styling

export { default as IconArtistBadge } from '@audius/harmony/src/assets/icons/ArtistBadge.svg'
export { default as IconCosign } from '@audius/harmony/src/assets/icons/Cosign.svg'
export { default as IconMultiselectAdd } from '@audius/harmony/src/assets/icons/MultiselectAdd.svg'
export { default as IconMultiselectRemove } from '@audius/harmony/src/assets/icons/MultiselectRemove.svg'
export { default as IconPlaybackPause } from '@audius/harmony/src/assets/icons/PlaybackPause.svg'
export { default as IconPlaybackPlay } from '@audius/harmony/src/assets/icons/PlaybackPlay.svg'
export { default as IconVerified } from '@audius/harmony/src/assets/icons/Verified.svg'

// VIP Tier Badges
export { default as IconTokenBronze } from '@audius/harmony/src/assets/icons/TokenBronze.svg'
export { default as IconTokenGold } from '@audius/harmony/src/assets/icons/TokenGold.svg'
export { default as IconTokenPlatinum } from '@audius/harmony/src/assets/icons/TokenPlatinum.svg'
export { default as IconTokenSilver } from '@audius/harmony/src/assets/icons/TokenSilver.svg'
// The TokenNoTier svg doesnt work on mobile, so we use a png component instead
export { IconTokenNoTier } from './components/IconTokenNoTier'

// File Types
export { default as IconFile3GA } from '@audius/harmony/src/assets/icons/file3GA.svg'
export { default as IconFile3GP } from '@audius/harmony/src/assets/icons/file3GP.svg'
export { default as IconFileAAC } from '@audius/harmony/src/assets/icons/fileAAC.svg'
export { default as IconFileAIF } from '@audius/harmony/src/assets/icons/fileAIF.svg'
export { default as IconFileAIFF } from '@audius/harmony/src/assets/icons/fileAIFF.svg'
export { default as IconFileAMR } from '@audius/harmony/src/assets/icons/fileAMR.svg'
export { default as IconFileAWB } from '@audius/harmony/src/assets/icons/fileAWB.svg'
export { default as IconFileFLAC } from '@audius/harmony/src/assets/icons/fileFLAC.svg'
export { default as IconFileM4A } from '@audius/harmony/src/assets/icons/fileM4A.svg'
export { default as IconFileM4B } from '@audius/harmony/src/assets/icons/fileM4B.svg'
export { default as IconFileM4P } from '@audius/harmony/src/assets/icons/fileM4P.svg'
export { default as IconFileM4R } from '@audius/harmony/src/assets/icons/fileM4R.svg'
export { default as IconFileM4V } from '@audius/harmony/src/assets/icons/fileM4V.svg'
export { default as IconFileMP2 } from '@audius/harmony/src/assets/icons/fileMP2.svg'
export { default as IconFileMP3 } from '@audius/harmony/src/assets/icons/fileMP3.svg'
export { default as IconFileMP4 } from '@audius/harmony/src/assets/icons/fileMP4.svg'
export { default as IconFileMPGA } from '@audius/harmony/src/assets/icons/fileMPGA.svg'
export { default as IconFileOGA } from '@audius/harmony/src/assets/icons/fileOGA.svg'
export { default as IconFileOGG } from '@audius/harmony/src/assets/icons/fileOGG.svg'
export { default as IconFileOGM } from '@audius/harmony/src/assets/icons/fileOGM.svg'
export { default as IconFileOGV } from '@audius/harmony/src/assets/icons/fileOGV.svg'
export { default as IconFileOGX } from '@audius/harmony/src/assets/icons/fileOGX.svg'
export { default as IconFileAIFC } from '@audius/harmony/src/assets/icons/fileAIFC.svg'
export { default as IconFileOPUS } from '@audius/harmony/src/assets/icons/fileOPUS.svg'
export { default as IconFileSPX } from '@audius/harmony/src/assets/icons/fileSPX.svg'
export { default as IconFileTS } from '@audius/harmony/src/assets/icons/fileTS.svg'
export { default as IconFileTSA } from '@audius/harmony/src/assets/icons/fileTSA.svg'
export { default as IconFileTSV } from '@audius/harmony/src/assets/icons/fileTSV.svg'
export { default as IconFileWAV } from '@audius/harmony/src/assets/icons/fileWAV.svg'
export { default as IconFileWAVE } from '@audius/harmony/src/assets/icons/fileWAVE.svg'
export { default as IconFileWEBM } from '@audius/harmony/src/assets/icons/fileWEBM.svg'
export { default as IconFileXWMA } from '@audius/harmony/src/assets/icons/fileXWMA.svg'

// Creative Commons

export { default as IconCcBy } from '@audius/harmony/src/assets/icons/ccBy.svg'
export { default as IconCcCC } from '@audius/harmony/src/assets/icons/ccCC.svg'
export { default as IconCcNC_EU } from '@audius/harmony/src/assets/icons/ccNC-EU.svg'
export { default as IconCcNC_JP } from '@audius/harmony/src/assets/icons/ccNC-JP.svg'
export { default as IconCcNC } from '@audius/harmony/src/assets/icons/ccNC.svg'
export { default as IconCcND } from '@audius/harmony/src/assets/icons/ccND.svg'
export { default as IconCcPD } from '@audius/harmony/src/assets/icons/ccPD.svg'
export { default as IconCcRemix } from '@audius/harmony/src/assets/icons/ccRemix.svg'
export { default as IconCcSA } from '@audius/harmony/src/assets/icons/ccSA.svg'
export { default as IconCcSampling } from '@audius/harmony/src/assets/icons/ccSampling.svg'
export { default as IconCcSamplingPlus } from '@audius/harmony/src/assets/icons/ccSamplingPlus.svg'
export { default as IconCcShare } from '@audius/harmony/src/assets/icons/ccShare.svg'
export { default as IconCcZero } from '@audius/harmony/src/assets/icons/ccZero.svg'

// Logos
export { default as IconAudiusLogo } from '@audius/harmony/src/assets/icons/AudiusLogo.svg'
export { default as IconAudiusLogoColor } from '@audius/harmony/src/assets/icons/AudiusLogoColor.svg'
export { default as IconAudiusLogoHorizontal } from '@audius/harmony/src/assets/icons/AudiusLogoHorizontal.svg'
export { default as IconAudiusLogoHorizontalColor } from '@audius/harmony/src/assets/icons/AudiusLogoHorizontalColor.svg'
export { default as IconAudiusLogoVertical } from '@audius/harmony/src/assets/icons/AudiusLogoVertical.svg'
export { default as IconLogoCoinbase } from '@audius/harmony/src/assets/icons/Coinbase.svg'
export { default as IconLogoCoinbasePay } from '@audius/harmony/src/assets/icons/Coinbase.svg'
export { default as IconLogoLinkByStripe } from '@audius/harmony/src/assets/icons/LinkByStripe.svg'
export { default as IconDiscord } from '@audius/harmony/src/assets/icons/Discord.svg'
export { default as IconFacebook } from '@audius/harmony/src/assets/icons/Facebook.svg'
export { default as IconMetamask } from '@audius/harmony/src/assets/icons/Metamask.svg'
export { default as IconSnapChat } from '@audius/harmony/src/assets/icons/SnapChat.svg'
export { default as IconTelegram } from '@audius/harmony/src/assets/icons/Telegram.svg'
export { default as IconTwitter } from '@audius/harmony/src/assets/icons/Twitter.svg'
export { default as IconTikTok } from '@audius/harmony/src/assets/icons/TikTok.svg'
export { default as IconInstagram } from '@audius/harmony/src/assets/icons/Instagram.svg'
export { default as IconLogoCircle } from '@audius/harmony/src/assets/icons/LogoCircle.svg'
export { default as IconLogoCircleCoinbase } from '@audius/harmony/src/assets/icons/LogoCircleCoinbase.svg'
export { default as IconLogoCircleETH } from '@audius/harmony/src/assets/icons/LogoCircleETH.svg'
export { default as IconLogoCircleSOL } from '@audius/harmony/src/assets/icons/LogoCircleSOL.svg'
export { default as IconLogoCircleSTR } from '@audius/harmony/src/assets/icons/LogoCircleSTR.svg'
export { default as IconLogoCircleUSD } from '@audius/harmony/src/assets/icons/LogoCircleUSD.svg'
export { default as IconLogoCircleUSDC } from '@audius/harmony/src/assets/icons/LogoCircleUSDC.svg'
export { default as IconSolana } from '@audius/harmony/src/assets/icons/LogoSolana.svg'
export { default as IconPhantom } from '@audius/harmony/src/assets/icons/LogoPhantom.svg'
export { default as IconPhantomPlain } from '@audius/harmony/src/assets/icons/LogoPhantomPlain.svg'

export { default as Soundwave } from '@audius/harmony/src/assets/animations/Soundwave.json'
export { default as SoundwaveCircle } from '@audius/harmony/src/assets/animations/SoundwaveCircle.json'

// Playback Rate Icons
export { default as IconPlaybackRate0_5x } from '@audius/harmony/src/assets/icons/iconPlaybackRate0_5x.svg'
export { default as IconPlaybackRate0_8x } from '@audius/harmony/src/assets/icons/iconPlaybackRate0_8x.svg'
export { default as IconPlaybackRate0_9x } from '@audius/harmony/src/assets/icons/iconPlaybackRate0_9x.svg'
export { default as IconPlaybackRate1x } from '@audius/harmony/src/assets/icons/iconPlaybackRate1x.svg'
export { default as IconPlaybackRate1_1x } from '@audius/harmony/src/assets/icons/iconPlaybackRate1_1x.svg'
export { default as IconPlaybackRate1_2x } from '@audius/harmony/src/assets/icons/iconPlaybackRate1_2x.svg'
export { default as IconPlaybackRate1_5x } from '@audius/harmony/src/assets/icons/iconPlaybackRate1_5x.svg'
export { default as IconPlaybackRate2x } from '@audius/harmony/src/assets/icons/iconPlaybackRate2x.svg'
export { default as IconPlaybackRate2_5x } from '@audius/harmony/src/assets/icons/iconPlaybackRate2_5x.svg'
export { default as IconPlaybackRate3x } from '@audius/harmony/src/assets/icons/iconPlaybackRate3x.svg'
