import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { SectionHeader } from '../components/core/Headers'
import PlansOverview from '../components/PlansOverview'
import CallToAction from '../components/callToAction/CallToAction'

export const PricingPageTemplate = ({ title }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <SectionHeader
          className="has-text-centered pricingPage__header"
        >
          {title}
        </SectionHeader>
        <PlansOverview />
        <CallToAction />
      </div>
    </section>
  )
}

PricingPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
}

const PricingPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PricingPageTemplate title={post.frontmatter.title} />
    </Layout>
  )
}

PricingPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PricingPage

export const pricingPageQuery = graphql`
  query PricingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
