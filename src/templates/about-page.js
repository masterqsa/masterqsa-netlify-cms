import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { SectionHeader, OrganismHeader } from '../components/core/Headers'
import Text from '../components/core/Text'
import CallToAction from '../components/callToAction/CallToAction'
import DevelopedIcon from '../components/icons/DevelopedIcon'
import ProductivityIcon from '../components/icons/ProductivityIcon'
import FocusedIcon from '../components/icons/FocusedIcon'
import HeroPageLayout from '../components/HeroPageLayout'
import { HTMLContent } from '../components/Content'

const pitchIcons = {
  DevelopedIcon,
  ProductivityIcon,
  FocusedIcon,
}

export const AboutPageTemplate = ({
  title,
  description,
  image,
  introHeading,
  introDescription,
  introImage,
  pitches,
}) => {
  return (
    <HeroPageLayout
      heroImage={image}
      heroContent={
        <div className="container">
          <div className="has-text-white aboutPage__header">
            <SectionHeader style={{ marginBottom: '2rem' }}>
              {title}
            </SectionHeader>
            <Text>
              <HTMLContent content={description.childMarkdownRemark.html} />
            </Text>
          </div>
        </div>
      }
      heroProps={{
        className: `aboutPage__heroImage`,
        style: {
          backgroundImage: `linear-gradient(rgba(11, 103, 82, .9), rgba(11, 103, 82, .9))`,
        },
      }}
      isContentfulImage
    >
      <section className="section section--gradient">
        <div className="container has-text-centered">
          <SectionHeader intro={introHeading} style={{ marginTop: '2rem' }} />
          <Text style={{ maxWidth: '951px', margin: '0 auto' }}>
            <HTMLContent className="is-size-4" content={introDescription} />
          </Text>
          <div className="aboutPage__image">
            <Img {...introImage} />
          </div>
        </div>
        <div className="aboutPage__pitches">
          {pitches.map(({ title, description, icon }, idx, list) => {
            const Icon = pitchIcons[icon]

            return (
              <div
                key={title}
                className="has-text-white aboutPage__pitch"
                style={{
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
                <HTMLContent content={description} style={{ marginTop: '1rem' }} />
              </div>
            )
          })}
        </div>
        <div className="container">
          <CallToAction />
        </div>
      </section>
    </HeroPageLayout>
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
        fluid(maxWidth: 2048, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      introHeading
      introDescription {
        json
      }
      introImage {
        fluid(maxWidth: 2048, quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      pitches {
        title
        description {
          json
        }
        icon
      }
    }
  }
`
