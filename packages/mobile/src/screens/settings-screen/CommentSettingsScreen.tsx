import React, { useCallback } from 'react'

import { useGetCurrentUserId, useGetMutedUsers } from '@audius/common/api'
import { useMuteUser } from '@audius/common/context'
import { useSelectTierInfo } from '@audius/common/hooks'
import { commentsMessages as messages } from '@audius/common/messages'
import { Status } from '@audius/common/models'
import { formatCount } from '@audius/common/utils'
import { Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useToggle } from 'react-use'

import {
  Flex,
  Text,
  Button,
  Divider,
  IconMessageBlock,
  IconUser,
  IconVerified
} from '@audius/harmony-native'
import { IconAudioBadge } from 'app/components/audio-rewards'
import { Screen, ScreenContent, ProfilePicture } from 'app/components/core'
import { LoadingSpinner } from 'app/harmony-native/components/LoadingSpinner/LoadingSpinner'
import { useNavigation } from 'app/hooks/useNavigation'
import { makeStyles } from 'app/styles'
import { useThemePalette } from 'app/utils/theme'

const useStyles = makeStyles(({ spacing, palette }) => ({
  description: {
    backgroundColor: palette.white,
    width: '100%'
  },
  scrollContainer: {
    backgroundColor: palette.white
  },
  loadingSpinner: {
    width: spacing(8),
    height: spacing(8)
  }
}))

export const CommentSettingsScreen = () => {
  const styles = useStyles()
  const { data: currentUserId } = useGetCurrentUserId({})
  const { data: mutedUsers, status } = useGetMutedUsers(
    {
      userId: currentUserId!
    },
    { force: true }
  )

  return (
    <Screen
      title={messages.commentSettings}
      variant='secondary'
      topbarRight={null}
      icon={IconMessageBlock}
    >
      <ScreenContent>
        <Flex p='xl' style={styles.description} gap='l'>
          <Text>{messages.description}</Text>
          {mutedUsers?.length === 0 ? (
            <Text color='subdued'>{messages.noMutedUsers}</Text>
          ) : null}
        </Flex>
        <ScrollView style={styles.scrollContainer}>
          {status === Status.LOADING ? (
            <Flex direction='row' justifyContent='center'>
              <LoadingSpinner style={styles.loadingSpinner} />
            </Flex>
          ) : null}

          {mutedUsers?.map((user) => (
            <UserListItem key={user.user_id} user={user} />
          ))}
        </ScrollView>
      </ScreenContent>
    </Screen>
  )
}

const UserListItem = (props) => {
  const { user } = props
  const palette = useThemePalette()
  const { tier } = useSelectTierInfo(user.user_id)
  const { navigate } = useNavigation()
  const [muteUser] = useMuteUser()
  const [isMuted, toggleMuted] = useToggle(true)

  const handleRowPress = useCallback(() => {
    navigate('Profile', { id: user.user_id })
  }, [navigate, user.user_id])

  return (
    <>
      <Flex direction='column' p='l' gap='s'>
        <Pressable onPress={handleRowPress}>
          <Flex direction='row' gap='s'>
            <ProfilePicture userId={user.user_id} size='large' />
            <Flex direction='column' gap='xs'>
              <Flex direction='column' gap='2xs'>
                <Flex direction='row' gap='xs' alignItems='center'>
                  <Text size='s'>{user.name}</Text>
                  {user.is_verified ? (
                    <IconVerified
                      height={14}
                      width={14}
                      fill={palette.staticPrimary}
                      fillSecondary={palette.staticWhite}
                    />
                  ) : null}
                  <IconAudioBadge tier={tier} height={14} width={14} />
                </Flex>
                <Text size='s'>@{user.handle}</Text>
              </Flex>
              <Flex direction='row' mb='auto' gap='xs' alignItems='center'>
                <IconUser size='s' color='subdued' />
                <Text size='s' strength='strong' color='subdued'>
                  {formatCount(user.follower_count)}
                </Text>
                <Text size='s' color='subdued'>
                  {messages.followers}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Pressable>

        <Flex alignItems='center'>
          <Button
            variant={isMuted ? 'primary' : 'secondary'}
            size='small'
            fullWidth
            onPress={() => {
              muteUser({ mutedUserId: user.user_id, isMuted })
              toggleMuted()
            }}
          >
            {isMuted ? messages.unmute : messages.mute}
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}
