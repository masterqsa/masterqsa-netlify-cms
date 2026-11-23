import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import logo from '../img/logo.svg'
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
  const { contentfulFooter } = useStaticQuery(CONTENT_QUERY)
  const navLinks =
    (contentfulFooter && contentfulFooter.navSectionLinks) || []
  const socialLinks =
    (contentfulFooter && contentfulFooter.socialMediaLinks) || []

  return (
    <footer className="tq-footer">
      <div className="tq-wrap">
        <div className="tq-footer__grid">
          <div>
            <div className="tq-footer__logo">
              <img src={logo} alt="TurboQSA" />
            </div>
            <p className="tq-footer__heading">
              {contentfulFooter.contactSectionTitle}
            </p>
            <FooterContactInfo />
            <p style={{ marginTop: '12px', fontSize: '12.5px', opacity: 0.85 }}>
              PCI SSC Associate Participating Organization
            </p>
          </div>

          <div>
            <p className="tq-footer__heading">
              {contentfulFooter.navSectionTitle}
            </p>
            <ul className="tq-footer__list">
              {navLinks.map(({ linkLabel, linkPath }) => (
                <li key={linkLabel}>
                  <Link to={linkPath}>{linkLabel}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="tq-footer__heading">Turbo Assessment Suite</p>
            <ul className="tq-footer__list">
              <li>
                <a
                  href="https://www.turboassessment.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Turbo Assessment Pro (13 Standards) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.turboassessment.com/standards"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Multi-Standard Catalog ↗
                </a>
              </li>
              <li>
                <Link to="/pricing">Pay-As-You-Go Billing &amp; Packages</Link>
              </li>
              <li>
                <Link to="/products">Standalone SAQs &amp; ROC v4.0.1</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="tq-footer__bottom">
          <small>{contentfulFooter.copyright}</small>
          <div className="tq-footer__social">
            {socialLinks.map(({ socialMedia, label, profileUrl }) =>
              socialMediaIconSrc[socialMedia] ? (
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
                    style={{ width: '16px', height: '16px', display: 'block' }}
                  />
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
