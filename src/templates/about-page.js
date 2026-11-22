import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import CallToAction from '../components/callToAction/CallToAction'
import DevelopedIcon from '../components/icons/DevelopedIcon'
import ProductivityIcon from '../components/icons/ProductivityIcon'
import FocusedIcon from '../components/icons/FocusedIcon'
import PCISSCLogoNoGlobe from '../components/PCISSCLogoNoGlobe'
import { HTMLContent } from '../components/Content'

import turboSpiral from '../img/turbo-spiral.svg'
import aboutEditorial from '../img/refresh/about-editorial.jpg'

const pitchIcons = {
  DevelopedIcon,
  ProductivityIcon,
  FocusedIcon,
}

const PITCH_CARD_MODIFIERS = ['', 'tq-pitch-card--mid', 'tq-pitch-card--bright']

const AboutPageTemplate = ({
  title,
  description,
  introHeading,
  introDescription,
  pitches = [],
}) => {
  const ledeHtml =
    description &&
    description.childMarkdownRemark &&
    description.childMarkdownRemark.html

  return (
    <React.Fragment>
      <section className="tq-page-hero">
        <img
          src={turboSpiral}
          alt=""
          aria-hidden="true"
          className="tq-page-hero__watermark"
        />
        <div className="tq-wrap tq-page-hero__inner">
          <div className="tq-eyebrow tq-eyebrow--light">
            <span className="tq-eyebrow__dot" aria-hidden="true" />
            <span>ABOUT TURBOQSA</span>
          </div>
          <h1 className="tq-page-hero__title">{title}</h1>
          {ledeHtml && (
            <div className="tq-page-hero__lead">
              <HTMLContent content={ledeHtml} />
            </div>
          )}
        </div>
      </section>

      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <div
            className="tq-section__header tq-section__header--center"
            style={{ maxWidth: '880px' }}
          >
            {introHeading && (
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>{introHeading}</span>
              </div>
            )}
            {introDescription && (
              <div className="tq-richtext" style={{ fontSize: '18px' }}>
                <HTMLContent content={introDescription} />
              </div>
            )}
          </div>

          <div className="tq-editorial-frame">
            <img
              src={aboutEditorial}
              alt="Architectural glass illustration representing structured security assessment engineering"
            />
          </div>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div className="tq-about-pitches" style={{ marginBottom: '48px' }}>
            {pitches.map(({ title: pitchTitle, description: pitchDesc, icon }, idx) => {
              const Icon = pitchIcons[icon]
              const cardModifier =
                PITCH_CARD_MODIFIERS[idx % PITCH_CARD_MODIFIERS.length]

              return (
                <div
                  key={pitchTitle}
                  className={`tq-pitch-card ${cardModifier}`}
                >
                  {Icon && (
                    <Icon
                      style={{
                        width: '44px',
                        height: '44px',
                      }}
                    />
                  )}
                  <h3>{pitchTitle}</h3>
                  <HTMLContent content={pitchDesc} />
                </div>
              )
            })}
          </div>

          <div
            className="tq-card"
            style={{
              marginBottom: '48px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div className="tq-eyebrow" style={{ marginBottom: '8px' }}>
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>ECOSYSTEM &amp; PARTICIPATION</span>
              </div>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
                Dedicated PCI Specialist Within the Turbo Assessment Portfolio
              </h2>
              <p style={{ margin: 0, color: 'var(--tq-muted)' }}>
                TurboQSA LLC builds purpose-built assessment software for
                Qualified Security Assessors, ISAs, and compliance practices —
                spanning specialized PCI DSS v4.0.1 ROC &amp; Standalone SAQ
                delivery alongside multi-standard reporting at{' '}
                <a
                  href="https://www.turboassessment.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--tq-green)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  www.turboassessment.com ↗
                </a>
                .
              </p>
            </div>
            <div className="tq-pci-trust">
              <PCISSCLogoNoGlobe />
              <div>
                <div className="tq-pci-trust__label">
                  PCI Security Standards Council
                </div>
                <div className="tq-pci-trust__sub">
                  Associate Participating Organization
                </div>
              </div>
            </div>
          </div>

          <CallToAction />
        </div>
      </section>
    </React.Fragment>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.object,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  introHeading: PropTypes.string.isRequired,
  introDescription: PropTypes.object,
  introImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pitches: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.object.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
}

const AboutPage = ({ data }) => {
  const { contentfulAboutUsPage } = data

  return (
    <Layout>
      <AboutPageTemplate
        title={contentfulAboutUsPage.title}
        description={contentfulAboutUsPage.lede}
        image={contentfulAboutUsPage.heroImage}
        introHeading={contentfulAboutUsPage.introHeading}
        introDescription={contentfulAboutUsPage.introDescription}
        introImage={contentfulAboutUsPage.introImage}
        pitches={contentfulAboutUsPage.pitches}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage {
    contentfulAboutUsPage {
      title
      lede {
        childMarkdownRemark {
          html
        }
      }
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      introHeading
      introDescription {
        raw
      }
      introImage {
        gatsbyImageData(
          width: 1344
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      pitches {
        title
        description {
          raw
        }
        icon
      }
    }
  }
`
