import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { SectionHeader } from '../core/Headers'
import Text from '../core/Text'
import { HTMLContent } from '../Content'
import { GatsbyImage } from 'gatsby-plugin-image'

const CONTENT_QUERY = graphql`
  query CallToActionQuery {
    contentfulCallToAction {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        gatsbyImageData(
          width: 280
          quality: 100
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      ctaButtonLabel
      ctaButtonLink
    }
  }
`

export const CallToAction = () => {
  const { contentfulCallToAction } = useStaticQuery(CONTENT_QUERY)

  return (
    <div className="qsaGetStarted">
      <div className="qsaGetStarted__inner">
        <div className="qsaGetStarted__content">
          <SectionHeader className="qsaGetStarted__header has-text-white">
            {contentfulCallToAction.title}
          </SectionHeader>
          <Text className="qsaGetStarted__description has-text-white">
            <HTMLContent
              content={
                contentfulCallToAction.description.childMarkdownRemark.html
              }
            />
          </Text>
          <Link
            className="button is-primary"
            to={contentfulCallToAction.ctaButtonLink}
          >
            {contentfulCallToAction.ctaButtonLabel}
          </Link>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div className="qsaGetStarted__imageContainer">
          <div className="qsaGetStarted__image">
            <GatsbyImage image={contentfulCallToAction.image.gatsbyImageData} />
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
    </div>
  )
}

CallToAction.propTypes = {}

export default CallToAction
