import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import { SectionHeader, PageHeader } from '../components/core/Headers'
import Text from '../components/core/Text'
import CallToAction from '../components/callToAction/CallToAction'
import PlansOverview from '../components/PlansOverview'
import ContactForm from '../components/contact/ContactForm'

export const IndexPageTemplate = ({
  image,
  mainpitch,
  intro,
  why,
  pricing,
  isPreview = false,
}) => {
  return (
  <div>
    <div
      className="full-width-image mainpitch__image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: '1046px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '500px' }}>
          <PageHeader className="mainTitle">
            <span style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}>{mainpitch}</span>
          </PageHeader>
        </div>
        <ContactForm className="quickForm--home is-hidden-mobile" />
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="">
          <div className="">
            <div className="">
              <div
                className=""
                style={{ marginTop: '2rem', marginBottom: '80px' }}
              >
                <SectionHeader
                  intro={intro.heading}
                  className="has-text-centered"
                  style={{ maxWidth: '755px', margin: '0 auto' }}
                >
                  {intro.subheading}
                </SectionHeader>
                <Text className="intro__description">{intro.description}</Text>
              </div>
              <div className="">
                <div className="columns is-gapless">
                  <div
                    className="column is-6"
                  >
                    <div className="introWhy">
                      <SectionHeader
                        className="has-text-left"
                        style={{ marginBottom: '28px' }}
                      >
                        {why.heading}
                      </SectionHeader>
                      <Text style={{ marginBottom: '26px' }}>
                        {why.description}
                      </Text>
                      <Link className="btn" to="/blog">
                        Get Started
                        <span className="icon">
                          <i className="fas fa-arrow-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="column is-6"
                    style={{
                      backgroundImage: `url(${
                        !!why.image.childImageSharp
                          ? why.image.childImageSharp.fluid.src
                          : why.image
                      })`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <SectionHeader
                  className="has-text-left"
                  intro="Latest stories"
                  style={{ marginBottom: '1rem' }}
                >
                  Stories
                </SectionHeader>
                <BlogRoll />
                <div className="has-text-centered">
                  <Link className="button is-outlined is-primary" to="/blog">
                    Read more
                  </Link>
                </div>
              </div>
              <div className="pricing-section">
                <div
                  className="background"
                  style={{
                    backgroundImage: `url(${
                      !!pricing.image.childImageSharp
                        ? pricing.image.childImageSharp.fluid.src
                        : pricing.image
                    })`,
                  }}
                ></div>
                <SectionHeader className="has-text-white has-text-centered">
                  {pricing.heading}
                </SectionHeader>
                {!isPreview && <PlansOverview variant="HOME" />}
              </div>
              {!isPreview && <CallToAction />}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)
                }

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mainpitch: PropTypes.string,
  intro: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
  }),
  why: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  isPreview: PropTypes.bool,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        mainpitch={frontmatter.mainpitch}
        intro={frontmatter.intro}
        why={frontmatter.why}
        pricing={frontmatter.pricing}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        mainpitch
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        why {
          heading
          description
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        intro {
          heading
          subheading
          description
        }
        pricing {
          heading
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
  }
`
