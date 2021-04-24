import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { SectionHeader } from '../components/core/Headers'
import CallToAction from '../components/callToAction/CallToAction'
import ContactForm from '../components/contact/ContactForm'
import HeroPageLayout from '../components/HeroPageLayout'

export const ContactPageTemplate = ({
  title,
  address,
  phone,
  email,
  formTitle,
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
          <div>
            <address className="contactPage__address is-size-5">
              {address}
              <br />
              <a href={`tel:${phone}`} className="has-text-white">
                {phone}
              </a>
              <br />
              <a href={`mailto:${email}`} className="has-text-white">
                {email}
              </a>
            </address>
            <div
              className="is-size-4 is-size-5-mobile has-text-weight-semibold"
              style={{ maxWidth: '374px', margin: '0 auto' }}
            >
              {formTitle}
            </div>
          </div>
        </div>
      }
      heroImageClassName="contactPage__heroImage"
      heroImageGradient="linear-gradient(rgba(40, 89, 226, .8), rgba(40, 89, 226, .8))"
      heroProps={{
        className: `contactPage__heroContact`,
      }}
    >
      <div className="contactForm">
        <ContactForm />
      </div>
      <div className="section">
        <div className="container">
          <CallToAction />
        </div>
      </div>
    </HeroPageLayout>
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
