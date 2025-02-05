import { OptionalId, Playlist } from '@audius/sdk'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { playlistMetadataForUpdateWithSDK } from '~/adapters/collection'
import { fileToSdk } from '~/adapters/track'
import { useAppContext } from '~/context/appContext'
import { Collection } from '~/models/Collection'
import { ID } from '~/models/Identifiers'

import { QUERY_KEYS } from './queryKeys'

type MutationContext = {
  previousCollection: Playlist | undefined
}

type UpdateCollectionParams = {
  playlistId: ID
  userId: ID
  metadata: Partial<Collection>
  coverArtFile?: File
}

export const useUpdateCollection = () => {
  const { audiusSdk } = useAppContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      playlistId,
      userId,
      metadata,
      coverArtFile
    }: UpdateCollectionParams) => {
      if (!audiusSdk) throw new Error('SDK not initialized')

      const encodedPlaylistId = OptionalId.parse(playlistId)
      const encodedUserId = OptionalId.parse(userId)
      if (!encodedPlaylistId || !encodedUserId) throw new Error('Invalid ID')

      const sdkMetadata = playlistMetadataForUpdateWithSDK(
        metadata as Collection
      )

      const response = await audiusSdk.playlists.updatePlaylist({
        coverArtFile: coverArtFile
          ? fileToSdk(coverArtFile, 'cover_art')
          : undefined,
        playlistId: encodedPlaylistId,
        userId: encodedUserId,
        metadata: sdkMetadata
      })

      return response
    },
    onMutate: async ({ playlistId, metadata }): Promise<MutationContext> => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.collection, playlistId]
      })

      // Snapshot the previous values
      const previousCollection = queryClient.getQueryData<Playlist>([
        QUERY_KEYS.collection,
        playlistId
      ])

      // Optimistically update collection
      queryClient.setQueryData(
        [QUERY_KEYS.collection, playlistId],
        (old: any) => ({
          ...old,
          ...metadata
        })
      )

      // Return context with the previous collection
      return { previousCollection }
    },
    onError: (_err, { playlistId }, context?: MutationContext) => {
      // If the mutation fails, roll back collection data
      if (context?.previousCollection) {
        queryClient.setQueryData(
          ['collection', playlistId],
          context.previousCollection
        )
      }
    },
    onSettled: (_, __) => {
      // Always refetch after error or success to ensure cache is in sync with server
      // queryClient.invalidateQueries({ queryKey: ['collection', playlistId] })
    }
  })
}
