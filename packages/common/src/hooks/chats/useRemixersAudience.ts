import { useMemo } from 'react'

import {
  useCurrentUserId,
  useGetRemixedTracks,
  useGetRemixersCount
} from '~/api'
import { ID } from '~/models'

export const useRemixersAudience = ({
  remixedTrackId
}: {
  remixedTrackId?: ID
}) => {
  const { data: currentUserId } = useCurrentUserId()
  const { data: remixersCount } = useGetRemixersCount({
    userId: currentUserId!,
    trackId: remixedTrackId
  })

  const { data: remixedTracks } = useGetRemixedTracks({
    userId: currentUserId!
  })
  const isDisabled = !remixedTracks?.length

  const remixedTracksOptions = useMemo(
    () =>
      (remixedTracks ?? []).map((track) => ({
        value: track.trackId,
        label: track.title
      })),
    [remixedTracks]
  )

  return {
    isDisabled,
    remixersCount,
    remixedTracksOptions
  }
}
