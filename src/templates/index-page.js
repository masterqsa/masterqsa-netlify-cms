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
import HeroPageLayout from '../components/HeroPageLayout'
import { HTMLContent } from '../components/Content'

export const IndexPageTemplate = ({
  image,
  mainpitch,
  intro,
  why,
  pricing,
  isPreview = false,
}) => {
  return (
    <HeroPageLayout
      heroImage={image}
      heroContent={
        <div className="mainPage__pitch">
          <div style={{ maxWidth: '500px' }}>
            <PageHeader className="mainPage__title">
              <span style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}>
                {mainpitch}
              </span>
            </PageHeader>
          </div>
          <ContactForm className="quickForm--home is-hidden-mobile" />
        </div>
      }
    >
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
                  <HTMLContent content={intro.description} className="intro__description" />
                </div>
                <div className="">
                  <div className="columns is-gapless mainPage__intro">
                    <div className="column is-half-desktop is-two-thirds-tablet">
                      <div className="mainPage__introText">
                        <SectionHeader
                          className="has-text-left"
                          style={{ marginBottom: '28px' }}
                        >
                          {why.heading}
                        </SectionHeader>
                        <HTMLContent content={why.description} style={{ marginBottom: '26px' }} />
                        <Link className="btn" to="/contact">
                          Get Started
                          <span className="icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="column is-half-desktop is-one-third-tablet"
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
    </HeroPageLayout>
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
