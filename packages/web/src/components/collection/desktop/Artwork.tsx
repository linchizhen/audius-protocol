import { ComponentType, SVGProps, useEffect } from 'react'

import { imageBlank } from '@audius/common/assets'
import { SquareSizes, CoverArtSizes } from '@audius/common/models'
import { cacheCollectionsSelectors } from '@audius/common/store'
import { Nullable } from '@audius/common/utils'
import { Button, IconPencil } from '@audius/harmony'
import { Link } from 'react-router-dom'

import { useSelector } from 'common/hooks/useSelector'
import DynamicImage from 'components/dynamic-image/DynamicImage'
import { useCollectionCoverArt } from 'hooks/useCollectionCoverArt'

import styles from './CollectionHeader.module.css'

const { getCollection } = cacheCollectionsSelectors

const messages = {
  addArtwork: 'Add Artwork',
  changeArtwork: 'Change Artwork',
  removeArtwork: 'Remove Artwork',
  coverArtAltText: 'Collection Cover Art'
}

type ArtworkProps = {
  collectionId: number
  coverArtSizes: Nullable<CoverArtSizes>
  callback: () => void
  gradient?: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  imageOverride?: string
  isOwner: boolean
}

export const Artwork = (props: ArtworkProps) => {
  const {
    collectionId,
    coverArtSizes,
    callback,
    gradient,
    icon: Icon,
    imageOverride,
    isOwner
  } = props

  const collection = useSelector((state) =>
    getCollection(state, { id: collectionId })
  )

  const { is_image_autogenerated, permalink } = collection ?? {}

  const image = useCollectionCoverArt(
    collectionId,
    coverArtSizes,
    SquareSizes.SIZE_1000_BY_1000
  )

  const hasImage = image && image !== imageBlank

  useEffect(() => {
    // If there's a gradient, this is a smart collection. Just immediately call back
    if (image || gradient || imageOverride || image === '') {
      callback()
    }
  }, [image, callback, gradient, imageOverride])

  return (
    <DynamicImage
      wrapperClassName={styles.coverArtWrapper}
      alt={messages.coverArtAltText}
      className={styles.coverArt}
      image={gradient || imageOverride || image}
    >
      {Icon ? (
        <Icon
          color='staticWhite'
          width='100%'
          height='100%'
          css={{
            background: gradient,
            path: { mixBlendMode: 'overlay', opacity: 0.3 }
          }}
        />
      ) : null}
      {isOwner ? (
        <span className={styles.imageEditButtonWrapper}>
          <Button variant='tertiary' iconLeft={IconPencil} asChild>
            <Link
              to={{
                pathname: `${permalink}/edit`,
                search: `?focus=${
                  hasImage && !is_image_autogenerated ? undefined : 'artwork'
                }`
              }}
            >
              {hasImage && !is_image_autogenerated
                ? messages.removeArtwork
                : hasImage
                ? messages.changeArtwork
                : messages.addArtwork}
            </Link>
          </Button>
        </span>
      ) : null}
    </DynamicImage>
  )
}
