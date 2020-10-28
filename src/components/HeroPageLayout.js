import React from 'react'
import PropTypes from 'prop-types'
import useResponsiveHeroImage from '../hooks/useResponsiveHeroImage'

export const HeroPageLayout = ({
  heroImage,
  heroContent,
  heroProps = {},
  children,
  isContentfulImage = false
}) => {
  const { imageContainerRef, imageProps } = useResponsiveHeroImage(heroImage, isContentfulImage)

  return (
    <React.Fragment>
      <div
        {...heroProps}
        className={['full-width-image', 'margin-top-0', heroProps.className]
          .filter(Boolean)
          .join(' ')}
        ref={imageContainerRef}
      >
        <img {...imageProps} />
        {heroContent}
      </div>
      <div className="default-background">{children}</div>
    </React.Fragment>
  )
}

HeroPageLayout.propTypes = {
  heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heroContent: PropTypes.node.isRequired,
  heroProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  isContentfulImage: PropTypes.bool
}

export default HeroPageLayout
