import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { SectionHeader } from '../components/core/Headers'
import CallToAction from '../components/callToAction/CallToAction'
import PilotForm from '../components/contact/PilotForm'
import HeroPageLayout from '../components/HeroPageLayout'

export const PilotPageTemplate = ({
  title,
  description,
  image,
}) => {
  return (
    <HeroPageLayout
      heroImage={image}
      heroContent={
        <div className="container has-text-white has-text-centered">
          <SectionHeader className="contactPage__header has-text-centered">
            {title}
          </SectionHeader>
            <div
              className="is-size-4 is-size-5-mobile has-text-weight-semibold"
              style={{ maxWidth: '640px', margin: '0 auto' }}
            >
            {description}
          </div>
        </div>
      }
      heroProps={{
        className: `contactPage__heroImage`,
        style: {
          backgroundImage: `linear-gradient(rgb(11, 103, 82, 0.9), rgba(11, 103, 82, 0.5))`,
        },
      }}
    >
      <div className="contactForm">
        <PilotForm />
      </div>
      <div className="section">
        <div className="container">
          <CallToAction />
        </div>
      </div>
    </HeroPageLayout>
  )
}

PilotPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const PilotPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PilotPageTemplate
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

PilotPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PilotPage

export const pilotPageQuery = graphql`
  query PilotPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
