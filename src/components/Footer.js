import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-text-dark">
          <div className="container">
            <div className="footer__inner">
              <div className="footer__contact">
                <p className="footer__contactTitle">Contact Us</p>
                <address>
                  <p>
                    Phone: <a href="tel:+123456789">+1234567890</a><br/>
                    Email: <a href="mailto:test@test.com">test@test.com</a>
                  </p>
                  <p>
                    1234 Main St S666 <br/>
                    Los Angeles, CA <br/>
                    90210
                  </p>
                </address>
              </div>
              <div className="footer__links">
                <div>
                <p className="menu-label">
                  Information
                </p>
                <ul className="menu-list">
                  <li>
                    <Link to="/" className="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/products">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/contact/examples">
                      Contacts
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/contact/examples">
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex">
              <small>© 2019. All rights reserved.</small>
              <div className="social">
                {[
                  {
                    src: facebook,
                    title: 'Facebook',
                    href: 'https://facebook.com',
                  },
                  {
                    src: twitter,
                    title: 'Twitter',
                    href: 'https://twitter.com',
                  },
                  {
                    src: instagram,
                    title: 'Instagram',
                    href: 'https://instagram.com',
                  },
                ].map(({ src, title, href }) => {
                  return (
                    <a key={title} title={title} aria-label={title} href={href} target="_blank" rel="noreferrer noopener">
                      <img
                        src={src}
                        alt=""
                        style={{ width: '1em', height: '1em' }}
                      />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
      </footer>
    )
  }
}

export default Footer
