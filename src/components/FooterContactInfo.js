import React from 'react'
import { useStaticQuery } from 'gatsby'

const CONTACT_INFO_QUERY = graphql`
  query ContactInfo {
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      html
      frontmatter {
        address
        phone
        email
      }
    }
  }
`

const FooterContactInfo = () => {
  const { markdownRemark: { frontmatter }} = useStaticQuery(CONTACT_INFO_QUERY)

  return (
    <address>
      <p>
        Phone: <a href={`tel:${frontmatter.phone}`}>{frontmatter.phone}</a>
        <br />
        Email:{' '}<a href={`tel:${frontmatter.email}`}>{frontmatter.email}</a>
      </p>
      <p>
        {frontmatter.address}
      </p>
    </address>
  )
}

export default FooterContactInfo
