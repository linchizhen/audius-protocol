import { useCallback, useState } from 'react'

import {
  ID,
  Name,
  PlaylistLibraryID,
  PlaylistLibraryKind,
  ShareSource
} from '@audius/common/models'
import {
  cacheCollectionsActions,
  cacheCollectionsSelectors,
  cacheTracksSelectors,
  playlistLibraryActions,
  shareModalUIActions
} from '@audius/common/store'
import {
  Flex,
  IconSpeaker,
  PopupMenuItem,
  Text,
  useTheme
} from '@audius/harmony'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom-v5-compat'
import { useToggle } from 'react-use'

import { make, useRecord } from 'common/store/analytics/actions'
import { Draggable } from 'components/dragndrop'
import { DeleteCollectionConfirmationModal } from 'components/edit-collection/DeleteCollectionConfirmationModal'
import {
  DragDropKind,
  selectDraggingId,
  selectDraggingKind
} from 'store/dragndrop/slice'
import { useSelector } from 'utils/reducer'
import { BASE_URL } from 'utils/route'

import { LeftNavDroppable } from '../LeftNavDroppable'
import { LeftNavLink } from '../LeftNavLink'

import { NavItemKebabButton } from './NavItemKebabButton'
import { PlaylistUpdateDot } from './PlaylistUpdateDot'
import { usePlaylistPlayingStatus } from './usePlaylistPlayingStatus'

const { addTrackToPlaylist } = cacheCollectionsActions
const { getCollection } = cacheCollectionsSelectors
const { getTrack } = cacheTracksSelectors
const { reorder } = playlistLibraryActions
const { requestOpen } = shareModalUIActions

const messages = {
  editPlaylistLabel: 'Edit playlist',
  edit: 'Edit',
  share: 'Share',
  delete: 'Delete'
}

const acceptedKinds: DragDropKind[] = [
  'track',
  'playlist',
  'library-playlist',
  'playlist-folder'
]

type CollectionNavItemProps = {
  id: PlaylistLibraryID
  name: string
  url: string
  isOwned: boolean
  level: number
  hasUpdate?: boolean
  onClick?: () => void
  isChild?: boolean
}

export const CollectionNavItem = (props: CollectionNavItemProps) => {
  const { id, name, url, isOwned, level, hasUpdate, onClick, isChild } = props
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const location = useLocation()
  const isSelected = location.pathname === url
  const dispatch = useDispatch()
  const record = useRecord()
  const navigate = useNavigate()

  const { spacing } = useTheme()

  const collection = useSelector((state) =>
    getCollection(state, { id: typeof id === 'string' ? null : id })
  )

  const { permalink } = collection ?? {}

  const [isDeleteConfirmationOpen, toggleDeleteConfirmationOpen] =
    useToggle(false)

  const handleDragEnter = useCallback(() => {
    setIsDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  const handleEdit = useCallback(() => {
    if (typeof id === 'number') {
      navigate(`${permalink}/edit`)
      record(make(Name.PLAYLIST_OPEN_EDIT_FROM_LIBRARY, {}))
    }
  }, [id, navigate, permalink, record])

  const handleShare = useCallback(() => {
    if (typeof id === 'number') {
      dispatch(
        requestOpen({
          type: 'collection',
          collectionId: id,
          source: ShareSource.LEFT_NAV
        })
      )
    }
  }, [dispatch, id])

  const handleDelete = useCallback(() => {
    toggleDeleteConfirmationOpen()
  }, [toggleDeleteConfirmationOpen])

  const kebabItems: PopupMenuItem[] = [
    {
      text: messages.edit,
      onClick: handleEdit
    },
    { text: messages.share, onClick: handleShare },
    { text: messages.delete, onClick: handleDelete }
  ]

  const handleDrop = useCallback(
    (draggingId: PlaylistLibraryID, kind: DragDropKind) => {
      if (kind === 'track') {
        if (typeof id === 'number') {
          dispatch(addTrackToPlaylist(draggingId as ID, id))
        }
      } else {
        dispatch(
          reorder({
            draggingId,
            droppingId: id,
            draggingKind: kind as PlaylistLibraryKind
          })
        )
      }
    },
    [dispatch, id]
  )

  const draggingKind = useSelector(selectDraggingKind)
  const draggingId = useSelector(selectDraggingId)
  const track = useSelector((state) =>
    getTrack(state, { id: typeof draggingId === 'string' ? null : draggingId })
  )
  const hiddenTrackCheck =
    !!track && !!collection && track?.is_unlisted && !collection?.is_private

  const isDisabled =
    (draggingKind === 'track' && !isOwned) ||
    draggingId === id ||
    (draggingKind === 'playlist-folder' && level > 0) ||
    hiddenTrackCheck

  const isPlayingFromThisPlaylist = usePlaylistPlayingStatus(id)

  if (!name || !url) return null

  const indentAmount = level * spacing.m

  return (
    <>
      <LeftNavDroppable
        acceptedKinds={acceptedKinds}
        onDrop={handleDrop}
        disabled={isDisabled}
      >
        <Draggable
          id={id}
          text={name}
          // Draggables require full URL
          link={`${BASE_URL}${url}`}
          kind='library-playlist'
        >
          <LeftNavLink
            to={url}
            onClick={onClick}
            disabled={isDisabled}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            textSize='s'
            variant='compact'
            css={{
              '& > div': {
                marginLeft: indentAmount
              }
            }}
            rightIcon={
              isPlayingFromThisPlaylist ? (
                <IconSpeaker
                  size='s'
                  color={isSelected ? 'staticWhite' : 'accent'}
                />
              ) : null
            }
            leftOverride={hasUpdate ? <PlaylistUpdateDot /> : null}
            isChild={isChild}
          >
            <Flex
              alignItems='center'
              w='100%'
              h='xl'
              pl={indentAmount}
              gap='xs'
              css={{ position: 'relative' }}
              justifyContent='space-between'
            >
              <Text
                variant='body'
                size='s'
                css={{ maxWidth: '160px' }}
                ellipses
              >
                {name}
              </Text>
              <NavItemKebabButton
                visible={isOwned && isHovering && !isDraggingOver}
                aria-label={messages.editPlaylistLabel}
                items={kebabItems}
                isSelected={isSelected}
              />
            </Flex>
          </LeftNavLink>
        </Draggable>
      </LeftNavDroppable>

      {isOwned && typeof id === 'number' ? (
        <DeleteCollectionConfirmationModal
          collectionId={id}
          visible={isDeleteConfirmationOpen}
          onCancel={toggleDeleteConfirmationOpen}
        />
      ) : null}
    </>
  )
}
