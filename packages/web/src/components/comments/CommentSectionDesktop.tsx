import { useRef } from 'react'

import { useCurrentCommentSection } from '@audius/common/context'
import { useFeatureFlag } from '@audius/common/hooks'
import { FeatureFlags } from '@audius/common/services'
import { Button, Divider, Flex, LoadingSpinner, Paper } from '@audius/harmony'
import InfiniteScroll from 'react-infinite-scroller'

import { useMainContentRef } from 'pages/MainContentContext'

import { CommentForm } from './CommentForm'
import { CommentHeader } from './CommentHeader'
import { CommentSkeletons } from './CommentSkeletons'
import { CommentSortBar } from './CommentSortBar'
import { CommentThread } from './CommentThread'
import { NoComments } from './NoComments'

/**
 * This component is responsible for
 * - Render header & containers
 * - Mapping through the root comments array
 * - Infinite scrolling pagination
 */
export const CommentSectionDesktop = () => {
  const {
    currentUserId,
    comments,
    commentSectionLoading,
    isLoadingMorePages,
    reset,
    hasMorePages,
    loadMorePages
  } = useCurrentCommentSection()

  const mainContentRef = useMainContentRef()
  const { isEnabled: commentPostFlag = false } = useFeatureFlag(
    FeatureFlags.COMMENT_POSTING_ENABLED
  )
  const commentPostAllowed = currentUserId !== undefined && commentPostFlag
  const commentSectionRef = useRef<HTMLDivElement | null>(null)
  const showCommentSortBar = comments.length > 1

  if (commentSectionLoading) {
    return <CommentSkeletons />
  }

  return (
    <Flex
      gap='l'
      direction='column'
      w='100%'
      alignItems='flex-start'
      ref={commentSectionRef}
    >
      <CommentHeader />
      <Button
        onClick={() => {
          reset(true)
        }}
      >
        Refresh{' '}
      </Button>
      <Paper w='100%' direction='column'>
        {commentPostAllowed ? (
          <>
            <Flex gap='s' p='xl' w='100%' direction='column'>
              <CommentForm />
            </Flex>

            <Divider color='default' orientation='horizontal' />
          </>
        ) : null}
        <Flex ph='xl' pv='l' w='100%' direction='column' gap='l'>
          {showCommentSortBar ? <CommentSortBar /> : null}
          <InfiniteScroll
            hasMore={hasMorePages}
            loadMore={loadMorePages}
            getScrollParent={() => mainContentRef.current ?? null}
            useWindow={false}
            threshold={-250}
          >
            <Flex direction='column' gap='xl' pt='m'>
              {comments.length === 0 ? <NoComments /> : null}
              {comments.map(({ id }) => (
                <CommentThread commentId={id} key={id} />
              ))}
              {isLoadingMorePages ? (
                <Flex justifyContent='center' mt='l'>
                  <LoadingSpinner css={{ width: 20, height: 20 }} />
                </Flex>
              ) : null}
            </Flex>
          </InfiniteScroll>
        </Flex>
      </Paper>
    </Flex>
  )
}
