import { useMemo } from 'react'

import { ChatBlastAudience } from '@audius/sdk'

import {
  useGetPurchasersCount,
  useGetRemixersCount,
  useCurrentUser,
  useCurrentUserId
} from '~/api'

export const useFirstAvailableBlastAudience = () => {
  const { data: currentUserId } = useCurrentUserId()
  const { data: user } = useCurrentUser()

  const { data: purchasersCount } = useGetPurchasersCount(
    {
      userId: currentUserId!
    },
    {
      disabled: !currentUserId
    }
  )
  const { data: remixersCount } = useGetRemixersCount(
    {
      userId: currentUserId!
    },
    {
      disabled: !currentUserId
    }
  )

  const firstAvailableAudience = useMemo(() => {
    if (user?.follower_count) return ChatBlastAudience.FOLLOWERS
    if (user?.supporter_count) return ChatBlastAudience.TIPPERS
    if (purchasersCount) return ChatBlastAudience.CUSTOMERS
    if (remixersCount) return ChatBlastAudience.REMIXERS
    return null
  }, [
    user?.follower_count,
    user?.supporter_count,
    purchasersCount,
    remixersCount
  ])

  return firstAvailableAudience
}
