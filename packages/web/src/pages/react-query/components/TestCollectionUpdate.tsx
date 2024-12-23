import { useState } from 'react'

import { useCollection, useUpdateCollection } from '@audius/common/api'
import { Button, Flex, Text, TextInput } from '@audius/harmony'

type Props = {
  playlistId: string
}

export const TestCollectionUpdate = ({ playlistId }: Props) => {
  const { data: collection } = useCollection(playlistId)
  const updateCollection = useUpdateCollection()
  const [newTitle, setNewTitle] = useState('')

  const handleUpdateTitle = () => {
    if (!collection) return
    updateCollection.mutate({
      playlistId,
      metadata: {
        playlistName: newTitle
      },
      userId: collection.user.id
    })
    // Clear input after submitting
    setNewTitle('')
  }

  if (!collection) return null

  return (
    <Flex direction='column' gap='m'>
      <Text variant='heading'>
        Update Collection: {collection.playlistName}
      </Text>
      <Text>Current Title: {collection.playlistName}</Text>
      <Flex gap='m' alignItems='center'>
        <TextInput
          label='New title'
          placeholder='Enter new title'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={updateCollection.isPending}
        />
        <Button
          variant='primary'
          onClick={handleUpdateTitle}
          isLoading={updateCollection.isPending}
          disabled={!newTitle.trim()}
        >
          Update Title
        </Button>
      </Flex>
      {updateCollection.isError && (
        <Text>Error: {updateCollection.error.message}</Text>
      )}
      {updateCollection.isSuccess && <Text>Successfully updated title!</Text>}
    </Flex>
  )
}
