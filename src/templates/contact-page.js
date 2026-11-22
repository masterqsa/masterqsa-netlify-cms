import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import CallToAction from '../components/callToAction/CallToAction'
import ContactForm from '../components/contact/ContactForm'
import turboSpiral from '../img/turbo-spiral.svg'

export const ContactPageTemplate = ({
  title,
  address,
  phone,
  email,
  formTitle,
}) => {
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
            <span>SALES &amp; DEMO INQUIRIES</span>
          </div>
          <h1 className="tq-page-hero__title">{title}</h1>
          <p className="tq-page-hero__lead">{formTitle}</p>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div className="tq-contact-layout" style={{ marginBottom: '56px' }}>
            <div>
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>HOW WE CAN HELP</span>
              </div>
              <h2 className="tq-section__title" style={{ fontSize: '28px' }}>
                Connect With the TurboQSA Team
              </h2>
              <p style={{ color: 'var(--tq-muted)' }}>
                Reach out to schedule a live walkthrough of PCI DSS v4.0.1 ROCs
                and Standalone SAQs, discuss Pay-as-you-go pricing details and
                custom package deals, or ask about 13-standard expansion on
                Turbo Assessment.
              </p>

              <div className="tq-contact-info-list">
                <div className="tq-contact-info-item">
                  <strong>Phone</strong>
                  <a href={`tel:${phone}`}>{phone}</a>
                </div>
                <div className="tq-contact-info-item">
                  <strong>Email</strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="tq-contact-info-item">
                  <strong>Office</strong>
                  <span>{address}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '14px',
                  alignItems: 'center',
                }}
              >
                <Link className="tq-text-link" to="/pricing">
                  Review Pay-As-You-Go Billing Model →
                </Link>
                <a
                  className="tq-text-link"
                  href="https://www.turboassessment.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Turbo Assessment Multi-Standard Suite ↗
                </a>
              </div>
            </div>

            <ContactForm />
          </div>

          <CallToAction />
        </div>
      </section>
    </React.Fragment>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const ContactPage = ({ data }) => {
  const { contentfulContactPage, contentfulContactInformation } = data

  return (
    <Layout>
      <ContactPageTemplate
        title={contentfulContactPage.title}
        address={contentfulContactInformation.address}
        phone={contentfulContactInformation.phoneNumber}
        email={contentfulContactInformation.email}
        formTitle={contentfulContactPage.formTitle}
        image={contentfulContactPage.heroImage}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage {
    contentfulContactPage {
      title
      formTitle
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }

    contentfulContactInformation {
      email
      phoneNumber
      address
    }
  }
`
