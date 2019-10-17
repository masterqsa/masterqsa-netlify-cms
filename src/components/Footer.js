import React from 'react'
import { Link, useStaticQuery } from 'gatsby'

import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import FooterContactInfo from './FooterContactInfo'

const CONTENT_QUERY = graphql`
  query FooterQuery {
    markdownRemark(frontmatter: { contentKey: { eq: "footer" } }) {
      frontmatter {
        contactTitle
        informationTitle
        copyright

        links {
          label
          path
        }

        socialMedia {
          socialNetwork
          title
          href
        }
      }
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
    markdownRemark: { frontmatter },
  } = useStaticQuery(CONTENT_QUERY)
  console.log(frontmatter)

  return (
    <footer className="footer has-text-dark">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__contact">
            <p className="footer__contactTitle">{frontmatter.contactTitle}</p>
            <FooterContactInfo />
          </div>
          <div className="footer__links">
            <div>
              <p className="menu-label">{frontmatter.informationTitle}</p>
              <ul className="menu-list">
                {frontmatter.links.map(({ label, path }) => {
                  return (
                    <li key={label}>
                      <Link to={path} className="">
                        {label}
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
          <small>{frontmatter.copyright}</small>
          <div className="social">
            {frontmatter.socialMedia.map(({ socialNetwork, title, href }) => {
              return socialMediaIconSrc[socialNetwork] ? (
                <a
                  key={title}
                  title={title}
                  aria-label={title}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src={socialMediaIconSrc[socialNetwork]}
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
