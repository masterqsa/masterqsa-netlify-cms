import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { HTMLContent } from '../Content'

const CONTENT_QUERY = graphql`
  query CallToActionQuery {
    contentfulCallToAction {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        gatsbyImageData(
          width: 280
          quality: 100
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      ctaButtonLabel
      ctaButtonLink
    }
  }
`

export const CallToAction = () => {
  const { contentfulCallToAction } = useStaticQuery(CONTENT_QUERY)
  const descriptionHtml =
    contentfulCallToAction &&
    contentfulCallToAction.description &&
    contentfulCallToAction.description.childMarkdownRemark &&
    contentfulCallToAction.description.childMarkdownRemark.html

  return (
    <div className="tq-cta-banner">
      <div>
        <div className="tq-eyebrow tq-eyebrow--light">
          <span className="tq-eyebrow__dot" aria-hidden="true" />
          <span>FLEXIBLE PAY-AS-YOU-GO &amp; PACKAGE DEALS</span>
        </div>
        <h2 className="tq-cta-banner__title">
          {contentfulCallToAction.title}
        </h2>
        {descriptionHtml && (
          <div className="tq-cta-banner__copy">
            <HTMLContent content={descriptionHtml} />
          </div>
        )}
        <p className="tq-cta-banner__copy" style={{ marginBottom: '22px' }}>
          Reach out to our sales team for Pay-as-you-go pricing details, volume
          tiers, and bundled package deals across ROCs and Standalone SAQs.
        </p>
        <div className="tq-cta-banner__actions">
          <Link
            className="tq-btn tq-btn--light"
            to={contentfulCallToAction.ctaButtonLink || '/contact'}
          >
            {contentfulCallToAction.ctaButtonLabel || 'Get Started'}
          </Link>
          <Link className="tq-btn tq-btn--outline-light" to="/pricing">
            Pay-As-You-Go Pricing →
          </Link>
        </div>
      </div>

      <div className="tq-delivery-card">
        <div className="tq-delivery-card__header">
          <strong>TurboQSA Delivery Scope</strong>
          <span>PCI + Suite</span>
        </div>
        <ul className="tq-delivery-card__list">
          <li>
            <span>PCI DSS v4.0.1 ROC &amp; AOC</span>
            <em>One-Click Word</em>
          </li>
          <li>
            <span>Standalone SAQs (A, B-IP, C-VT, P2PE, D)</span>
            <em>SAQ + AOC</em>
          </li>
          <li>
            <span>Pay-As-You-Go Assessment Billing</span>
            <em>Flexible Scale</em>
          </li>
          <li>
            <span>Single-Tenant AWS VPC &amp; TurboAI</span>
            <em>Isolated</em>
          </li>
          <li>
            <span>13 Standards on Turbo Assessment</span>
            <em>
              <a
                href="https://www.turboassessment.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Explore ↗
              </a>
            </em>
          </li>
        </ul>
      </div>
    </div>
  )
}

CallToAction.propTypes = {}

export default CallToAction
