import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

export const HeroPageLayout = ({
  heroImage,
  heroImageGradient = null,
  heroContent,
  heroProps = {},
  children,
}) => {
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
