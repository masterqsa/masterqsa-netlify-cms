import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

function QuickForm() {
    return (
        <form className="quickForm">
            <div role="group" aria-labelledby="quickForm__label--client" className="field">
                <span id="quickForm__label--client" className="label">How can we contact you?</span>
                <input type="text" name="name" placeholder="Your name" aria-label="Your name" className="field" />
                <input type="email" name="email" placeholder="Your email" aria-label="Your email" className="field" />
            </div>
            <label htmlFor="quickForm__field--source" className="label">
                How did you hear about us?
            </label>
            <div className="field">
                <div className="select is-block">
                    <select name="source" id="quickForm__field--source">
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <button type="submit" className="button is-primary">
                Request Demo
            </button>
        </form>
    )
}

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
    why,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
          backgroundSize: '100%',
          backgroundPositionY: '-185px'
      }}
    >
      <div
        style={{
          display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '1046px',
            width: '100%'
        }}
      >
          <div style={{ maxWidth: '500px' }}>
              <h1
                  className="mainTitle"
              >
                  {subheading}
              </h1>
          </div>
          <QuickForm />
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="">
          <div className="">
            <div className="">
                <div className="" style={{ marginBottom: '80px '}}>
                    <h2>{intro.heading}</h2>
                    <h3>{intro.subHeading}</h3>
                    <p className="intro__description">{intro.description}</p>
                </div>
                <div className="">
                    <div className="columns is-gapless">
                        <div className="column is-6" style={{ backgroundColor: '#f4f4f4' }}>
                            <div style={{ padding: '90px 70px 90px 100px' }}>
                                <h3 className="has-text-left" style={{ marginBottom: '28px' }}>{why.heading}</h3>
                                <p style={{ marginBottom: '26px' }}>{why.description}</p>
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
                                    !!why.image.childImageSharp ? why.image.childImageSharp.fluid.src : why.image
                                })`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                        </div>
                    </div>
                </div>
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  subHeading: PropTypes.string
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        why={frontmatter.why}
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
        title
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
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          subHeading
          description
        }
      }
    }
  }
`
