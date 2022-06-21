import { useCallback } from 'react'

import {
  getNotificationEntities,
  getNotificationUser
} from 'audius-client/src/common/store/notifications/selectors'
import { RemixCosign } from 'audius-client/src/common/store/notifications/types'
import { isEqual } from 'lodash'
import { View } from 'react-native'

import IconRemix from 'app/assets/images/iconRemix.svg'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { EventNames } from 'app/types/analytics'
import { make } from 'app/utils/analytics'
import { getTrackRoute } from 'app/utils/routes'

import {
  NotificationHeader,
  NotificationText,
  NotificationTile,
  NotificationTitle,
  EntityLink,
  UserNameLink,
  ProfilePicture,
  NotificationTwitterButton
} from '../Notification'
import { useDrawerNavigation } from '../useDrawerNavigation'

const messages = {
  title: 'Remix Co-sign',
  cosign: 'Co-signed your Remix of',
  shareTwitterText: (trackTitle: string, handle: string) =>
    `My remix of ${trackTitle} was Co-Signed by ${handle} on @AudiusProject #Audius`
}

type RemixCosignNotificationProps = {
  notification: RemixCosign
}

export const RemixCosignNotification = (
  props: RemixCosignNotificationProps
) => {
  const { notification } = props
  const navigation = useDrawerNavigation()
  const { childTrackId, parentTrackUserId } = notification
  const user = useSelectorWeb(state => getNotificationUser(state, notification))
  const userName = user?.name
  const tracks = useSelectorWeb(
    state => getNotificationEntities(state, notification),
    isEqual
  )

  const childTrack = tracks.find(({ track_id }) => track_id === childTrackId)
  const parentTrack = tracks.find(
    ({ owner_id }) => owner_id === parentTrackUserId
  )
  const parentTrackTitle = parentTrack?.title

  const handlePress = useCallback(() => {
    if (childTrack) {
      navigation.navigate({
        native: {
          screen: 'Track',
          params: { id: childTrack.track_id, fromNotifications: true }
        },
        web: {
          route: getTrackRoute(childTrack)
        }
      })
    }
  }, [childTrack, navigation])

  const handleTwitterShareData = useCallback(
    (twitterHandle: string | undefined) => {
      const handle = twitterHandle ? `@${twitterHandle}` : userName
      if (parentTrackTitle && handle) {
        const shareText = messages.shareTwitterText(parentTrackTitle, handle)
        const analytics = make({
          eventName: EventNames.NOTIFICATIONS_CLICK_REMIX_COSIGN_TWITTER_SHARE,
          text: shareText
        })
        return { shareText, analytics }
      }
      return null
    },
    [userName, parentTrackTitle]
  )

  if (!user || !childTrack || !parentTrack) return null

  const twitterUrl = getTrackRoute(childTrack, true)

  return (
    <NotificationTile notification={notification} onPress={handlePress}>
      <NotificationHeader icon={IconRemix}>
        <NotificationTitle>{messages.title}</NotificationTitle>
      </NotificationHeader>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ProfilePicture profile={user} />
        <View style={{ flex: 1 }}>
          <NotificationText>
            <UserNameLink user={user} /> {messages.cosign}{' '}
            <EntityLink entity={parentTrack} />
          </NotificationText>
        </View>
      </View>
      <NotificationTwitterButton
        type='dynamic'
        url={twitterUrl}
        handle={user.handle}
        shareData={handleTwitterShareData}
      />
    </NotificationTile>
  )
}
