import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useSiteMetadata from './SiteMetadata'
import './all.sass'
import './facelift.css'

const TemplateWrapper = ({ children }) => {
  const { title, description, keywords } = useSiteMetadata()

  return (
    <div className="tq-site">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={`${withPrefix('/')}img/favicon.ico`}
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
        />
        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#0c6752"
        />
        <meta name="theme-color" content="#f6faf8" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
        />
      </Helmet>
      <a className="tq-skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
