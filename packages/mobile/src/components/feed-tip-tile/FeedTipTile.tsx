import { useCallback, useEffect } from 'react'

import { useProxySelector } from '@audius/common/hooks'
import type { User } from '@audius/common/models'
import {
  accountSelectors,
  cacheUsersSelectors,
  tippingSelectors,
  tippingActions
} from '@audius/common/store'
import { storeDismissedTipInfo } from 'common/store/tipping/sagas'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { IconButton, IconClose } from '@audius/harmony-native'
import { FadeInView, Tile } from 'app/components/core'
import { make, track } from 'app/services/analytics'
import { localStorage } from 'app/services/local-storage'
import { makeStyles } from 'app/styles'
import { EventNames } from 'app/types/analytics'

import { FeedTipTileSkeleton } from './FeedTipTileSkeleton'
import { ReceiverDetails } from './ReceiverDetails'
import { SendTipButton } from './SendTipButton'
import { SenderDetails } from './SenderDetails'

const { setShowTip, fetchRecentTips } = tippingActions
const { getShowTip, getTipToDisplay } = tippingSelectors
const { getUsers } = cacheUsersSelectors
const { getUserId } = accountSelectors

const useStyles = makeStyles(({ spacing, palette }) => ({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing(3),
    marginTop: spacing(3),
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  skeleton: {
    paddingBottom: 0
  }
}))

export const FeedTipTile = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const accountId = useSelector(getUserId)

  const showTip = useSelector(getShowTip)

  const { tipToDisplay, usersMap, tipperIds } = useProxySelector((state) => {
    const tipToDisplay = getTipToDisplay(state)
    if (!tipToDisplay) {
      return { tipToDisplay: null, usersMap: {}, tipperIds: [] }
    }
    const { sender_id, receiver_id, followee_supporter_ids } = tipToDisplay
    const tipperIds = [sender_id, receiver_id, ...followee_supporter_ids]
    const usersMap = getUsers(state, { ids: tipperIds })
    return { tipToDisplay, usersMap, tipperIds }
  }, [])

  useEffect(() => {
    dispatch(fetchRecentTips())
  }, [dispatch])

  const handlePressClose = useCallback(async () => {
    await storeDismissedTipInfo(localStorage, tipToDisplay?.receiver_id || -1)
    dispatch(setShowTip({ show: false }))
    if (accountId && tipToDisplay) {
      track(
        make({
          eventName: EventNames.TIP_FEED_TILE_DISMISS,
          accountId: `${accountId}`,
          receiverId: `${tipToDisplay.receiver_id}`,
          device: 'native'
        })
      )
    }
  }, [dispatch, accountId, tipToDisplay])

  if (!showTip) {
    return null
  }

  const tipsLoading =
    !tipToDisplay || Object.keys(usersMap).length !== tipperIds.length

  if (tipsLoading) return <FeedTipTileSkeleton />

  return (
    <Tile styles={{ tile: styles.tile }}>
      <FadeInView>
        <View style={styles.header}>
          <ReceiverDetails receiver={usersMap[tipToDisplay.receiver_id]} />
          <IconButton
            icon={IconClose}
            style={{ alignSelf: 'flex-start' }}
            size='m'
            color='subdued'
            onPress={handlePressClose}
          />
        </View>
        <SenderDetails
          senders={[
            tipToDisplay.sender_id,
            ...tipToDisplay.followee_supporter_ids
          ]
            .map((id) => usersMap[id])
            .filter((user): user is User => !!user)}
          receiver={usersMap[tipToDisplay.receiver_id]}
        />
        <SendTipButton receiver={usersMap[tipToDisplay.receiver_id]} />
      </FadeInView>
    </Tile>
  )
}
