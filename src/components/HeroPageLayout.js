import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'

export const HeroPageLayout = ({
  heroImage,
  heroImageClassName,
  heroImageGradient = null,
  heroImageStyle = {},
  heroContent,
  heroContentProps = {},
  heroProps = {},
  children,
}) => {
  if (heroImage.gatsbyImageData) {
    return (
      <React.Fragment>
        <div
          {...heroProps}
          className={['full-width-image', 'margin-top-0', heroProps.className]
            .filter(Boolean)
            .join(' ')}
          style={{ position: `relative`, ...heroProps.style }}
        >
          <div style={{ display: 'grid', width: '100%', height: '100%' }}>
            <GatsbyImage
              style={{
                gridArea: '1/1',
                // maxHeight: '541px',
                ...heroImageStyle,
              }}
              className={["heroPageLayout__image", heroImageClassName]
                .filter(Boolean)
                .join(' ')}
              image={heroImage.gatsbyImageData}
              alt=""
            />
            <div
              style={{
                // By using the same grid area for both, they are stacked on top of each other
                gridArea: '1/1',
                position: 'relative',
                // This centers the other elements inside the hero component
                placeItems: 'center',
                display: 'grid',
                backgroundImage: heroImageGradient,
              }}
              {...heroContentProps}
            >
              {heroContent}
            </div>
          </div>
        </div>
        <div className="default-background">{children}</div>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <div
        {...heroProps}
        className={['full-width-image', 'margin-top-0', heroProps.className]
          .filter(Boolean)
          .join(' ')}
        style={{ position: `relative`, ...heroProps.style }}
      >
        <Img
          {...heroImage}
          className="heroImage"
          style={{ position: `absolute` }}
        />
        <div
          className="heroImage__scrim"
          style={{ backgroundImage: heroImageGradient }}
        />
        {heroContent}
      </div>
      <div className="default-background">{children}</div>
    </React.Fragment>
  )
}

HeroPageLayout.propTypes = {
  heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heroImageGradient: PropTypes.string,
  heroContent: PropTypes.node.isRequired,
  heroProps: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default HeroPageLayout
