import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { SectionHeader } from '../core/Headers'
import Text from '../core/Text'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const CONTENT_QUERY = graphql`
  query CallToActionQuery1 {
    markdownRemark(frontmatter: { content_key: { eq: "call-to-action" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        description
      }
    }
  }
`

export const CallToAction = () => {
  const { markdownRemark: { frontmatter } } = useStaticQuery(CONTENT_QUERY)

  return (
    <div className="qsaGetStarted">
      <div className="qsaGetStarted__inner">
        <div className="qsaGetStarted__content">
          <SectionHeader className="qsaGetStarted__header has-text-white">
            {frontmatter.title}
          </SectionHeader>
          <Text className="qsaGetStarted__description has-text-white">{frontmatter.description}</Text>
          <Link className="button is-primary" to="/blog">
            Get Started
          </Link>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div
          className="qsaGetStarted__imageContainer"
        >
          <div 
            className="qsaGetStarted__image"
          >
            <PreviewCompatibleImage
              imageInfo={{
                image: frontmatter.image,
                childImageSharp: frontmatter.image ? frontmatter.image.childImageSharp : frontmatter.image
              }}
            />
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
    </div>
  )
}

CallToAction.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    }),
  }),
}

export default CallToAction
