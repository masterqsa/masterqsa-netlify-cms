import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import FooterContactInfo from './FooterContactInfo'

const CONTENT_QUERY = graphql`
  query FooterQuery {
    contentfulFooter {
      contactSectionTitle
      navSectionTitle
      socialMediaLinks {
        label
        profileUrl
        socialMedia
      }
      navSectionLinks {
        linkLabel
        linkPath
      }
      copyright
    }
  }
`

const socialMediaIconSrc = {
  facebook,
  instagram,
  twitter,
  vimeo,
}

const Footer = () => {
  const {
    contentfulFooter,
  } = useStaticQuery(CONTENT_QUERY)

  return (
    <footer className="footer has-text-dark">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__contact">
            <p className="footer__contactTitle">{contentfulFooter.contactSectionTitle}</p>
            <FooterContactInfo />
          </div>
          <div className="footer__links">
            <div>
              <p className="menu-label">{contentfulFooter.navSectionTitle}</p>
              <ul className="menu-list">
                {contentfulFooter.navSectionLinks.map(({ linkLabel, linkPath }) => {
                  return (
                    <li key={linkLabel}>
                      <Link to={linkPath} className="">
                        {linkLabel}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex">
          <small>{contentfulFooter.copyright}</small>
          <div className="social">
            {contentfulFooter.socialMediaLinks.map(({ socialMedia, label, profileUrl }) => {
              return socialMediaIconSrc[socialMedia] ? (
                <a
                  key={socialMedia}
                  title={label}
                  aria-label={label}
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src={socialMediaIconSrc[socialMedia]}
                    alt=""
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              ) : null
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
