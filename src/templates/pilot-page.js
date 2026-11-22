import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import CallToAction from '../components/callToAction/CallToAction'
import PilotForm from '../components/contact/PilotForm'
import turboSpiral from '../img/turbo-spiral.svg'

export const PilotPageTemplate = ({ title, description }) => {
  return (
    <React.Fragment>
      <section className="tq-page-hero tq-page-hero--compact">
        <img
          src={turboSpiral}
          alt=""
          aria-hidden="true"
          className="tq-page-hero__watermark"
        />
        <div className="tq-wrap tq-page-hero__inner">
          <div className="tq-eyebrow tq-eyebrow--light">
            <span className="tq-eyebrow__dot" aria-hidden="true" />
            <span>PILOT PROGRAM</span>
          </div>
          <h1 className="tq-page-hero__title">{title}</h1>
          <p className="tq-page-hero__lead">{description}</p>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div style={{ maxWidth: '720px', margin: '0 auto 56px' }}>
            <PilotForm />
          </div>
          <CallToAction />
        </div>
      </section>
    </React.Fragment>
  )
}

PilotPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const PilotPage = ({ data }) => {
  const { contentfulPilotPage } = data

  return (
    <Layout>
      <PilotPageTemplate
        title={contentfulPilotPage.title}
        description={contentfulPilotPage.description}
        image={contentfulPilotPage.heroImage}
      />
    </Layout>
  )
}

PilotPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PilotPage

export const pilotPageQuery = graphql`
  query PilotPage {
    contentfulPilotPage {
      title
      description
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`
