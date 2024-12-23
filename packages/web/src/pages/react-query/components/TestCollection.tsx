import { useCollection } from '@audius/common/api'
import { Flex, Text } from '@audius/harmony'

type Props = {
  playlistId: string
}

export const TestCollection = ({ playlistId }: Props) => {
  const { data: collection, isLoading, error } = useCollection(playlistId)

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading collection: {error.message}</Text>
  if (!collection) return null

  return (
    <Flex direction='column' gap='m'>
      <Text variant='heading'>{collection.playlistName}</Text>
      <Text>{collection.description || 'No description'}</Text>
      <Text>By: {collection.user.name}</Text>
      <Text>Bio: {collection.user.bio}</Text>
      <Text>Track Count: {collection.playlistContents.length}</Text>
      <Text>Repost Count: {collection.repostCount}</Text>
      <Text>Favorite Count: {collection.favoriteCount}</Text>
      <Text>Track 1: {collection.tracks?.[0].title}</Text>
      <Text>Track 1 User: {collection.tracks?.[0].user.name}</Text>
      <Text>Track 1 User Bio: {collection.tracks?.[0].user.bio}</Text>
    </Flex>
  )
}
