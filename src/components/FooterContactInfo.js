import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const CONTACT_INFO_QUERY = graphql`
  query ContactInfo {
    contentfulContactInformation {
      email
      phoneNumber
      address
    }
  }
`

const FooterContactInfo = () => {
  const { contentfulContactInformation } = useStaticQuery(CONTACT_INFO_QUERY)

  return (
    <address>
      <p>
        Phone:{' '}
        <a href={`tel:${contentfulContactInformation.phoneNumber}`}>
          {contentfulContactInformation.phoneNumber}
        </a>
        <br />
        Email:{' '}
        <a href={`mailto:${contentfulContactInformation.email}`}>
          {contentfulContactInformation.email}
        </a>
      </p>
      <p>{contentfulContactInformation.address}</p>
    </address>
  )
}

export default FooterContactInfo
