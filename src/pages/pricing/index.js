import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/Layout'
import CallToAction from '../../components/callToAction/CallToAction'
import turboSpiral from '../../img/turbo-spiral.svg'

const INCLUDED_ITEMS = [
  {
    title: 'Single-Tenant Cloud Isolation',
    description:
      'Dedicated AWS VPC hosting, KMS-encrypted storage, and optional private in-VPC TurboAI inference.',
  },
  {
    title: 'Unlimited Client Collaborators',
    description:
      'Invite merchant and service provider contacts, assign Responsibility Areas, and track evidence free of charge.',
  },
  {
    title: 'PCI DSS v4.0.1 ROC & Standalone SAQs',
    description:
      'Deliver full ROCs with AOCs, Standalone SAQs (A, B-IP, C-VT, P2PE, D), PCI PIN reports, and Custom RFTs.',
  },
  {
    title: 'Built-In QA & Peer Review',
    description:
      'Structured assessor workflows, immutable audit logs, and one-click Word deliverables out of the box.',
  },
]

function CheckItem({ children }) {
  return (
    <li>
      <span
        className="tq-check-badge tq-check-badge--green"
        aria-hidden="true"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function PricingIndexPage() {
  return (
    <Layout>
      <section className="tq-page-hero tq-page-hero--compact">
        <img
          src={turboSpiral}
          alt=""
          aria-hidden="true"
          className="tq-page-hero__watermark"
        />
        <div className="tq-wrap tq-page-hero__inner">
          <div className="tq-eyebrow tq-eyebrow--light">
            <span className="tq-eyebrow__dot" aria-hidden="true" />
            <span>FLEXIBLE BILLING</span>
          </div>
          <h1 className="tq-page-hero__title">
            Pay-As-You-Go Pricing Built for Real Assessment Volume
          </h1>
          <p className="tq-page-hero__lead">
            Align platform costs directly with your active PCI DSS v4.0.1 ROC,
            Standalone SAQ, and PCI PIN assessments — without rigid annual seat
            commitments. Client users are always included free of charge.
          </p>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div className="tq-pricing-grid">
            <article className="tq-price-card tq-price-card--featured">
              <span className="tq-price-card__badge">Flexible Option</span>
              <h2>Pay-As-You-Go</h2>
              <p className="tq-price-card__summary">
                Ideal for growing QSA practices, seasonal assessment peaks, and
                teams delivering any mix of full ROCs and Standalone PCI DSS
                v4.0.1 SAQs.
              </p>
              <ul className="tq-checklist tq-checklist--ink">
                <CheckItem>
                  Pay only for active assessment engagements rather than idle
                  annual user licenses
                </CheckItem>
                <CheckItem>
                  Supports full PCI DSS v4.0.1 ROCs, Standalone SAQs (A, B-IP,
                  C-VT, P2PE, D), and PCI PIN
                </CheckItem>
                <CheckItem>
                  Unlimited free client collaborators with scoped portal access
                  and interview scheduling
                </CheckItem>
                <CheckItem>
                  One-click Combined SAQ+AOC, Standalone AOC, and ROC Word
                  exports included
                </CheckItem>
              </ul>
              <div className="tq-price-card__cta">
                <Link className="tq-btn tq-btn--primary" to="/contact">
                  Contact Sales for Pay-As-You-Go Details
                </Link>
              </div>
            </article>

            <article className="tq-price-card">
              <span className="tq-price-card__badge">Package Deals</span>
              <h2>Volume &amp; Multi-Standard Packages</h2>
              <p className="tq-price-card__summary">
                Designed for high-volume QSA companies, multi-entity merchants,
                and advisory firms pairing PCI with additional frameworks in
                Turbo Assessment.
              </p>
              <ul className="tq-checklist tq-checklist--ink">
                <CheckItem>
                  Custom bundled ROC + Standalone SAQ volume packages tailored to
                  your annual pipeline
                </CheckItem>
                <CheckItem>
                  Optional private in-VPC TurboAI inference and dedicated
                  onboarding assistance
                </CheckItem>
                <CheckItem>
                  Seamless expansion to 13 compliance standards via{' '}
                  <a
                    href="https://www.turboassessment.com/standards"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--tq-green)',
                      fontWeight: 700,
                      textDecoration: 'underline',
                    }}
                  >
                    Turbo Assessment ↗
                  </a>
                </CheckItem>
                <CheckItem>
                  Priority Custom RFT onboarding, Client Scope setup, and
                  System API access
                </CheckItem>
              </ul>
              <div className="tq-price-card__cta">
                <Link className="tq-btn tq-btn--secondary" to="/contact">
                  Discuss Package Deals with Sales
                </Link>
              </div>
            </article>
          </div>

          <div
            className="tq-card tq-card--sage"
            style={{
              marginBottom: '48px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div style={{ maxWidth: '720px' }}>
              <div className="tq-eyebrow" style={{ marginBottom: '8px' }}>
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>TAILORED QUOTES</span>
              </div>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--tq-ink)',
                }}
              >
                Reach out to our sales team for pricing details and package deals
              </h2>
              <p style={{ margin: 0, color: 'var(--tq-muted)' }}>
                Tell us your expected ROC, Standalone SAQ, and multi-standard
                engagement mix, and our team will prepare a straightforward
                Pay-as-you-go rate card or custom package quote.
              </p>
            </div>
            <Link className="tq-btn tq-btn--primary" to="/contact">
              Contact Sales Team →
            </Link>
          </div>

          <div className="tq-section__header">
            <div className="tq-eyebrow">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>INCLUDED WITH EVERY DEPLOYMENT</span>
            </div>
            <h2 className="tq-section__title" style={{ fontSize: '30px' }}>
              Zero Hidden Fees for Core Security &amp; Collaboration
            </h2>
          </div>

          <div className="tq-included-grid" style={{ marginBottom: '56px' }}>
            {INCLUDED_ITEMS.map(item => (
              <div key={item.title} className="tq-included-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <CallToAction />
        </div>
      </section>
    </Layout>
  )
}
