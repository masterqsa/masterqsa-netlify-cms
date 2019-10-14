import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { SectionHeader, OrganismHeader } from '../components/core/Headers'
import Text from '../components/core/Text'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import CallToAction from '../components/callToAction/CallToAction'
import DevelopedIcon from '../components/icons/DevelopedIcon'
import ProductivityIcon from '../components/icons/ProductivityIcon'
import FocusedIcon from '../components/icons/FocusedIcon'

const pitchIcons = {
  DevelopedIcon,
  ProductivityIcon,
  FocusedIcon,
}

export const AboutPageTemplate = ({
  title,
  description,
  heroImage,
  intro,
  pitches,
}) => {
  return (
    <React.Fragment>
      <div
        className="full-width-image margin-top-0"
        style={{
          height: '354px',
          backgroundImage: `linear-gradient(rgba(11, 103, 82, .9), rgba(11, 103, 82, .9)), url(${
            !!heroImage.childImageSharp
              ? heroImage.childImageSharp.fluid.src
              : heroImage
          })`,
          backgroundPosition: `center 40px`,
          backgroundAttachment: `fixed`,
          backgroundSize: 'contain',
        }}
      >
        <div className="container">
          <div className="has-text-white" style={{ maxWidth: '500px' }}>
            <SectionHeader style={{ marginBottom: '2rem' }}>
              {title}
            </SectionHeader>
            <Text>{description}</Text>
          </div>
        </div>
      </div>
      <section className="section section--gradient">
        <div className="container has-text-centered">
          <SectionHeader intro={intro.heading} style={{ marginTop: '2rem' }} />
          <Text style={{ maxWidth: '951px', margin: '0 auto' }}>
            <p className="is-size-4">{intro.description}</p>
          </Text>
          <div
            style={{
              maxHeight: '558px',
              marginTop: '4rem',
              overflow: 'hidden',
            }}
          >
            <PreviewCompatibleImage
              imageInfo={{
                image: intro.image,
                childImageSharp: intro.image
                  ? intro.image.childImageSharp
                  : intro.image,
              }}
            />
          </div>
        </div>
        <div
          className="flex"
          style={{
            alignItems: 'stretch',
            marginTop: '5rem',
            marginBottom: '2rem',
          }}
        >
          {pitches.map(({ title, description, icon }, idx, list) => {
            const Icon = pitchIcons[icon]

            return (
              <div
                key={title}
                className="has-text-white"
                style={{
                  padding: '3rem',
                  flex: `1 0 ${list.length / 3}%`,
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, ${idx *
                    0.2}), rgba(0, 0, 0, ${idx *
                    0.2})), linear-gradient(#2047b5, #2047b5)`,
                }}
              >
                {Icon && (
                  <Icon
                    style={{
                      width: '3rem',
                      height: '3rem',
                      marginLeft: '-0.5rem',
                    }}
                  />
                )}
                <OrganismHeader>{title}</OrganismHeader>
                <Text style={{ marginTop: '1rem' }}>{description}</Text>
              </div>
            )
          })}
        </div>
        <div className="container">
          <CallToAction />
        </div>
      </section>
    </React.Fragment>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  intro: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
  pitches: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        heroImage={post.frontmatter.heroImage}
        intro={post.frontmatter.intro}
        pitches={post.frontmatter.pitches}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        intro {
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
        pitches {
          title
          description
          icon
        }
      }
    }
  }
`
