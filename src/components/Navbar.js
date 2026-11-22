import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const NAV_LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="tq-nav">
      <div className="tq-nav__inner">
        <Link
          to="/"
          className="tq-nav__brand"
          title="TurboQSA Home"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="TurboQSA" />
        </Link>

        <button
          type="button"
          className="tq-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="navMenu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <React.Fragment>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </React.Fragment>
            )}
          </svg>
        </button>

        <nav
          id="navMenu"
          className={`tq-nav__desktop ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <div className="tq-nav__links">
            {NAV_LINKS.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="tq-nav__link"
                activeClassName="is-active"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="tq-nav__actions">
            <a
              className="tq-nav__sister"
              href="https://www.turboassessment.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <span>Part of Turbo Assessment</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              className="tq-btn tq-btn--primary tq-btn--sm"
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Request Demo
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
