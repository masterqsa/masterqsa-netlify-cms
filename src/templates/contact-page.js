import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { SectionHeader } from '../components/core/Headers'
import CallToAction from '../components/callToAction/CallToAction'
import ContactForm from '../components/contact/ContactForm'

export const ContactPageTemplate = ({
  title,
  address,
  phone,
  email,
  formTitle,
  image,
}) => {
  const backgroundImage = image
    ? !!image.childImageSharp
      ? image.childImageSharp.fluid.src
      : image
    : ''

  return (
    <React.Fragment>
      <div
        className="full-width-image margin-top-0 contactPage__heroImage"
        style={{
          backgroundImage: `linear-gradient(rgba(40, 89, 226, .8), rgba(40, 89, 226, .8))${
            backgroundImage ? `, url(${backgroundImage})` : ``
          }`,
        }}
      >
        <div className="container has-text-white has-text-centered">
          <SectionHeader
            className="contactPage__header has-text-centered"
          >
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
      </div>
      <div className="contactForm">
        <ContactForm />
      </div>
      <div className="section">
        <div className="container">
          <CallToAction />
        </div>
      </div>
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
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ContactPageTemplate
        title={post.frontmatter.title}
        address={post.frontmatter.address}
        phone={post.frontmatter.phone}
        email={post.frontmatter.email}
        formTitle={post.frontmatter.formTitle}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        address
        phone
        email
        formTitle
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
`
