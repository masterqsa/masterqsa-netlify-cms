import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import CallToAction from '../components/callToAction/CallToAction'
import { HTMLContent } from '../components/Content'
import FAQ from '../components/FAQ'
import PCISSCLogoNoGlobe from '../components/PCISSCLogoNoGlobe'
import PciWorkspacePreview from '../components/PciWorkspacePreview'

import turboSpiral from '../img/turbo-spiral.svg'
import uiRocWorkspace from '../img/refresh/ui-roc-workspace.png'
import uiAutomatedQualityCheck from '../img/refresh/ui-automated-quality-check.png'
import uiPaymentChannels from '../img/refresh/ui-payment-channels.png'
import uiCustomerRoles from '../img/refresh/ui-customer-roles.png'
import uiInterviewScheduler from '../img/refresh/ui-interview-scheduler.png'
import uiTurboAiSuggestions from '../img/refresh/ui-turboai-suggestions.png'
import uiCustomRft from '../img/refresh/ui-custom-rft.png'

const FEATURE_VISUAL_OVERRIDES = {
  aqc: {
    src: uiAutomatedQualityCheck,
    caption: 'Automated Quality Check · PCI DSS v4.0.1 ROC QA',
    alt: 'TurboQSA Automated Quality Check ROC QA screen highlighting incomplete items and peer review requirements on PCI DSS v4.0.1',
  },
  rocCompletion: {
    src: uiRocWorkspace,
    caption: 'PCI DSS v4.0.1 ROC & AOC Workspace',
    alt: 'TurboQSA PCI DSS v4.0.1 Report on Compliance workspace with Part II Sampling, Evidence, and Requirements tree',
  },
  paymentChannels: {
    src: uiPaymentChannels,
    caption: 'Per-Channel Responses & RFT Overrides',
    alt: 'TurboQSA payment channel selection and Retail POS Terminals RFT Override controls',
  },
  customerRoles: {
    src: uiCustomerRoles,
    caption: 'Customer Roles, ECR & Responsibility Areas',
    alt: 'TurboQSA stakeholders and roles showing Executive Client Representative, QSA, Associate QSA, Client, and Responsibility indicators',
  },
  interviews: {
    src: uiInterviewScheduler,
    caption: 'Scheduled Audit Interviews & Calendar',
    alt: 'TurboQSA Interviews screen showing scheduled PCI DSS v4.0.1 stakeholder interviews, ICalendar import, and calendar view',
  },
}

const STANDALONE_SAQ_CARDS = [
  {
    code: 'SAQ A',
    description:
      'Outsourced cardholder data functions for e-commerce and MOTO merchants.',
  },
  {
    code: 'SAQ B-IP',
    description:
      'Standalone PTS-approved IP-connected point-of-interaction terminals.',
  },
  {
    code: 'SAQ C-VT',
    description:
      'Web-based virtual payment terminals isolated from cardholder networks.',
  },
  {
    code: 'SAQ P2PE',
    description:
      'Hardware payment terminals managed inside a validated P2PE solution.',
  },
  {
    code: 'SAQ D — Merchant',
    description:
      'Complete merchant self-assessment workflow across all applicable controls.',
  },
  {
    code: 'SAQ D — Service Provider',
    description:
      'Full service provider SAQ attestation and multi-entity evidence tracking.',
  },
]

const TURBO_ASSESSMENT_STANDARDS = [
  'PCI DSS v4.0.1',
  'PCI PIN',
  'ISO/IEC 27001',
  'ISO/IEC 42001',
  'SOC 2',
  'NIST CSF 2.0',
  'CIS Controls v8.1',
  'FedRAMP Rev. 5 & 20x',
  'CMMC Level 2',
  'HIPAA',
  'NYDFS Part 500',
  'GDPR',
  'EU AI Act',
]

function resolveModernFeatureVisual(feature) {
  const heading = (feature && feature.heading ? feature.heading : '').toLowerCase()

  if (heading.includes('quality check') || heading.includes('aqc')) {
    return FEATURE_VISUAL_OVERRIDES.aqc
  }
  if (heading.includes('one-click') || heading.includes('roc completion')) {
    return FEATURE_VISUAL_OVERRIDES.rocCompletion
  }
  if (heading.includes('payment channel')) {
    return FEATURE_VISUAL_OVERRIDES.paymentChannels
  }
  if (heading.includes('customer role') || heading.includes('responsibility')) {
    return FEATURE_VISUAL_OVERRIDES.customerRoles
  }
  if (heading.includes('interview')) {
    return FEATURE_VISUAL_OVERRIDES.interviews
  }

  return null
}

function CheckIcon() {
  return (
    <span className="tq-check-badge" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  )
}

export const IndexPageTemplate = ({
  mainpitch,
  introHeading,
  introSubheading,
  introDescription,
  whyHeading,
  whyDescription,
  featuresTitle,
  features = [],
  isPreview = false,
}) => {
  const cleanMainpitch =
    typeof mainpitch === 'string' ? mainpitch.trim() : ''
  const cleanIntroHeading =
    typeof introHeading === 'string' ? introHeading.trim() : ''
  const cleanIntroSubheading =
    typeof introSubheading === 'string' ? introSubheading.trim() : ''
  const cleanWhyHeading =
    typeof whyHeading === 'string' ? whyHeading.trim() : ''
  const cleanFeaturesTitle =
    typeof featuresTitle === 'string' ? featuresTitle.trim() : ''

  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="tq-hero">
        <div className="tq-wrap tq-hero__grid">
          <div>
            <div className="tq-eyebrow tq-eyebrow--pill">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>PCI DSS v4.0.1 · STANDALONE SAQS · PCI PIN</span>
            </div>
            <h1 className="tq-hero__title">
              {cleanMainpitch ||
                'The Modern Workspace for PCI DSS Assessments & Reporting'}
            </h1>
            <p className="tq-hero__lead">
              Deliver audit-ready PCI DSS v4.0.1 ROCs, Standalone SAQs and AOCs,
              and PCI PIN reports faster — installed in your own AWS or Azure
              cloud with private TurboAI, full data sovereignty, and flexible
              Pay-as-you-go billing.
            </p>
            <div className="tq-hero__actions">
              <Link className="tq-btn tq-btn--primary" to="/contact">
                Request Demo
              </Link>
              <Link className="tq-btn tq-btn--secondary" to="/pricing">
                Pay-As-You-Go Pricing →
              </Link>
            </div>
            <div className="tq-hero__sublink">
              <a
                className="tq-text-link"
                href="https://www.turboassessment.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Part of the 13-standard Turbo Assessment platform ↗
              </a>
            </div>
            <div className="tq-pci-trust">
              <PCISSCLogoNoGlobe />
              <div>
                <div className="tq-pci-trust__label">
                  PCI Security Standards Council
                </div>
                <div className="tq-pci-trust__sub">
                  Associate Participating Organization
                </div>
              </div>
            </div>
          </div>

          <PciWorkspacePreview />
        </div>
      </section>

      {/* Mission & Why TurboQSA Section */}
      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <div className="tq-mission-grid">
            <div>
              {cleanIntroHeading && (
                <div className="tq-eyebrow">
                  <span className="tq-eyebrow__dot" aria-hidden="true" />
                  <span>{cleanIntroHeading}</span>
                </div>
              )}
              <h2 className="tq-section__title">
                {cleanIntroSubheading ||
                  'One-stop PCI DSS assessment workspace for QSAs, ISAs, and assessed entities.'}
              </h2>
              {introDescription && (
                <div className="tq-richtext">
                  <HTMLContent content={introDescription} />
                </div>
              )}
              <div style={{ marginTop: '24px' }}>
                <Link className="tq-text-link" to="/products">
                  Explore full platform capabilities →
                </Link>
              </div>
            </div>

            <div className="tq-card tq-card--sage">
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>PRACTICE VELOCITY &amp; CONSISTENCY</span>
              </div>
              <h3
                className="tq-section__title"
                style={{ fontSize: '26px', marginBottom: '12px' }}
              >
                {cleanWhyHeading || 'Why TurboQSA?'}
              </h3>
              {whyDescription ? (
                <div className="tq-richtext">
                  <HTMLContent content={whyDescription} />
                </div>
              ) : (
                <p style={{ color: 'var(--tq-muted)', marginBottom: '16px' }}>
                  TurboQSA streamlines evidence collection, scoping, interviews,
                  peer review, and Word report assembly so your QSA team spends
                  less time formatting documents and more time delivering
                  high-assurance PCI assessments.
                </p>
              )}
              <ul
                className="tq-checklist tq-checklist--ink"
                style={{ marginBottom: '16px' }}
              >
                <li>
                  <span className="tq-check-badge tq-check-badge--green" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>
                    Hosted in your own AWS or Azure cloud (not ours) for full data
                    sovereignty &amp; zero data exfiltration
                  </span>
                </li>
                <li>
                  <span className="tq-check-badge tq-check-badge--green" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>
                    Pay-as-you-go billing aligned to real assessment volume — with
                    unlimited free client seats
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Contrast Showcase — Standalone PCI DSS v4.0.1 SAQ & AOC */}
      <section className="tq-section tq-section--dark" id="standalone-saq">
        <div className="tq-wrap tq-saq-showcase">
          <div>
            <div className="tq-eyebrow tq-eyebrow--light">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>STANDALONE PCI DSS v4.0.1 SAQ &amp; AOC</span>
            </div>
            <h2 className="tq-section__title">
              Run Dedicated Standalone SAQs Without Full ROC Bloat
            </h2>
            <p className="tq-section__lead">
              Whether your engagement is a streamlined merchant self-assessment or
              a QSA-assisted SAQ attestation, TurboQSA launches an SAQ-only
              workspace that prunes ROC-only chapters while preserving full
              evidence traceability and QA review.
            </p>

            <ul className="tq-checklist">
              <li>
                <CheckIcon />
                <span>
                  <strong>SAQ-only workspace:</strong> automatically scopes the
                  tree to applicable requirements with guided completion steps.
                </span>
              </li>
              <li>
                <CheckIcon />
                <span>
                  <strong>One-click Word deliverables:</strong> generate a{' '}
                  <strong>Combined SAQ + AOC (.docx)</strong> or a{' '}
                  <strong>Standalone AOC (.docx)</strong> at any milestone.
                </span>
              </li>
              <li>
                <CheckIcon />
                <span>
                  <strong>7 Standard SAQ RFTs &amp; Custom RFTs:</strong> apply
                  reusable eligibility templates on full ROC projects or clone
                  custom baselines in seconds.
                </span>
              </li>
            </ul>

            <Link className="tq-btn tq-btn--light" to="/contact">
              Schedule a Standalone SAQ Walkthrough
            </Link>
          </div>

          <div>
            <div className="tq-saq-cards">
              {STANDALONE_SAQ_CARDS.map(card => (
                <div key={card.code} className="tq-saq-card">
                  <span className="tq-saq-card__code">{card.code}</span>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            <div className="tq-rft-note">
              <strong>Also built for full ROC &amp; PCI PIN programs:</strong>{' '}
              pair Standalone SAQs with full PCI DSS v4.0.1 ROCs, Standard SAQ
              RFTs, and custom firm-wide RFTs in the same unified portal.
            </div>
          </div>
        </div>
      </section>

      {/* Modern Feature Showcase with Clean v4.0.1 Screenshots */}
      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <div className="tq-section__header tq-section__header--center">
            <div className="tq-eyebrow">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>INSIDE TURBOQSA</span>
            </div>
            <h2 className="tq-section__title">
              {cleanFeaturesTitle || 'Modern PCI DSS v4.0.1 Assessment Workspace'}
            </h2>
            <p className="tq-section__lead">
              Every control, finding, interview, RFT filter, and Word export
              lives inside a structured portal engineered for QSA firms and ISA
              teams.
            </p>
          </div>

          <div className="tq-features-stack">
            {features.map((feature, idx) => {
              const modernVisual = resolveModernFeatureVisual(feature)
              const isReverse = idx % 2 === 1

              return (
                <article
                  key={feature.heading || idx}
                  className={`tq-feature-card ${
                    isReverse ? 'tq-feature-card--reverse' : ''
                  }`}
                >
                  <div className="tq-feature-card__copy">
                    <span className="tq-feature-card__num">
                      Capability {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="tq-feature-card__title">
                      {feature.heading}
                    </h3>
                    <div className="tq-richtext">
                      <HTMLContent content={feature.description} />
                    </div>
                  </div>

                  <div className="tq-feature-card__media">
                    <div className="tq-screen-frame">
                      <div className="tq-screen-frame__bar" aria-hidden="true">
                        <div className="tq-screen-frame__dots">
                          <span />
                          <span />
                          <span />
                        </div>
                        <span className="tq-screen-frame__caption">
                          {modernVisual
                            ? modernVisual.caption
                            : feature.heading}
                        </span>
                      </div>
                      {modernVisual ? (
                        <img
                          src={modernVisual.src}
                          alt={modernVisual.alt}
                          loading="lazy"
                        />
                      ) : (
                        feature.image &&
                        feature.image.gatsbyImageData && (
                          <div className="tq-screen-frame__cms">
                            <GatsbyImage
                              image={feature.image.gatsbyImageData}
                              alt={feature.heading || 'TurboQSA workspace view'}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Highlighted New Capabilities */}
          <div className="tq-dual-showcase">
            <div className="tq-card">
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>PRIVATE TURBOAI · YOUR OWN CLOUD</span>
              </div>
              <h3
                className="tq-feature-card__title"
                style={{ fontSize: '22px' }}
              >
                AI Evidence Matching With QSA Approval
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  color: 'var(--tq-muted)',
                  marginBottom: '18px',
                }}
              >
                Installed inside your own AWS or Azure cloud infrastructure —
                not ours — TurboAI indexes client evidence, scores requirement
                relevance, highlights exact document locations, and drafts
                justifications for QSA review with full data sovereignty and no
                data exfiltration by design.
              </p>
              <div className="tq-screen-frame">
                <div className="tq-screen-frame__bar" aria-hidden="true">
                  <div className="tq-screen-frame__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="tq-screen-frame__caption">
                    TurboAI Suggestions · Requirement 3.4.1.A
                  </span>
                </div>
                <img
                  src={uiTurboAiSuggestions}
                  alt="TurboQSA TurboAI suggestions panel displaying relevance score, document location, best match, and justification"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="tq-card">
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>SCOPING &amp; APPLICABILITY TEMPLATES</span>
              </div>
              <h3
                className="tq-feature-card__title"
                style={{ fontSize: '22px' }}
              >
                Standard SAQ RFTs &amp; Custom RFT Builder
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  color: 'var(--tq-muted)',
                  marginBottom: '18px',
                }}
              >
                Pre-configure requirement applicability with 7 standard SAQ RFTs
                or clone Custom RFT templates for repeatable merchant, service
                provider, and specialized assessment engagements.
              </p>
              <div className="tq-screen-frame">
                <div className="tq-screen-frame__bar" aria-hidden="true">
                  <div className="tq-screen-frame__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="tq-screen-frame__caption">
                    Templates &amp; Custom RFT Manager
                  </span>
                </div>
                <img
                  src={uiCustomRft}
                  alt="TurboQSA Custom RFT manager showing PCI DSS filter, existing RFT selector, and Clone action"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="tq-pillars-grid">
            <div className="tq-pillar-card">
              <h3>Client Scope Knowledge Base</h3>
              <p>
                Maintain shared inventories of systems, payment channels,
                networks, and third parties once and hydrate across recurring
                assessments.
              </p>
            </div>
            <div className="tq-pillar-card">
              <h3>Built-In Peer Review &amp; QA</h3>
              <p>
                Enforce structured QSA, Lead Assessor, and Peer Reviewer stages
                with full audit logs before final Word ROC or AOC sign-off.
              </p>
            </div>
            <div className="tq-pillar-card">
              <h3>Integration API &amp; MCP Server</h3>
              <p>
                Automate evidence ingestion and workflow status updates via
                project-scoped API keys or the TurboQSA MCP server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pay-As-You-Go Billing Preview Band */}
      <section className="tq-section tq-section--sage">
        <div className="tq-wrap">
          <div className="tq-split-banner">
            <div>
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>PAY-AS-YOU-GO BILLING MODEL</span>
              </div>
              <h2 className="tq-section__title" style={{ marginBottom: '12px' }}>
                Pay For Active Assessments — Not Idle Annual Seats
              </h2>
              <p style={{ color: 'var(--tq-muted)', marginBottom: '20px' }}>
                TurboQSA supports flexible Pay-as-you-go billing alongside
                custom volume and multi-standard package deals, with unlimited
                client user access included. Reach out to our sales team for
                pricing details and package deals tailored to your practice.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link className="tq-btn tq-btn--primary" to="/pricing">
                  Explore Pay-As-You-Go Pricing
                </Link>
                <Link className="tq-btn tq-btn--secondary" to="/contact">
                  Ask Sales About Package Deals
                </Link>
              </div>
            </div>

            <div className="tq-card" style={{ background: 'var(--tq-paper)' }}>
              <ul className="tq-checklist tq-checklist--ink" style={{ margin: 0 }}>
                <li>
                  <span className="tq-check-badge tq-check-badge--green" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>No rigid annual QSA seat commitments required</span>
                </li>
                <li>
                  <span className="tq-check-badge tq-check-badge--green" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Scale smoothly across ROC and Standalone SAQ volume</span>
                </li>
                <li>
                  <span className="tq-check-badge tq-check-badge--green" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Custom package deals for multi-assessor teams</span>
                </li>
                <li>
                  <span className="tq-check-badge tq-check-badge--green" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Unlimited client collaborators included at no charge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sister-Brand Cross Reference: Turbo Assessment */}
      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <div className="tq-sister-panel">
            <div>
              <div className="tq-eyebrow tq-eyebrow--light">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>EXPANDING BEYOND PCI DSS?</span>
              </div>
              <h2
                className="tq-section__title"
                style={{ color: '#ffffff', marginBottom: '12px' }}
              >
                TurboQSA &amp; Turbo Assessment Share One Unified Platform
              </h2>
              <p style={{ color: 'var(--tq-evergreen-muted)', marginBottom: '22px' }}>
                TurboQSA is our dedicated PCI DSS, Standalone SAQ, and PCI PIN
                workspace. When your clients need multi-framework coverage, extend
                into{' '}
                <strong style={{ color: '#ffffff' }}>Turbo Assessment Pro</strong>{' '}
                — covering 13 compliance standards with shared Client Scope and
                evidence reuse.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  className="tq-btn tq-btn--light"
                  href="https://www.turboassessment.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit www.turboassessment.com ↗
                </a>
                <a
                  className="tq-btn tq-btn--outline-light"
                  href="https://www.turboassessment.com/standards"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse All 13 Standards ↗
                </a>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                }}
              >
                <img
                  src={turboSpiral}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: '28px',
                    height: '28px',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--tq-emerald-bright)',
                  }}
                >
                  Supported Compliance Portfolio
                </span>
              </div>
              <div className="tq-standards-pills">
                {TURBO_ASSESSMENT_STANDARDS.map(std => (
                  <span key={std}>{std}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div className="tq-section__header">
            <div className="tq-eyebrow">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>INSIGHTS &amp; UPDATES</span>
            </div>
            <h2 className="tq-section__title">Latest Stories</h2>
          </div>
          <BlogRoll count={3} />
          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <Link
              className="tq-btn tq-btn--secondary"
              to="/blog"
              aria-label="View all blog entries"
            >
              Read All Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <div className="tq-section__header">
            <div className="tq-eyebrow">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>ANSWERS</span>
            </div>
            <h2 className="tq-section__title">Frequently Asked Questions</h2>
          </div>
          <div className="tq-faq" style={{ marginBottom: '64px' }}>
            <FAQ />
          </div>
          {!isPreview && <CallToAction />}
        </div>
      </section>
    </React.Fragment>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mainpitch: PropTypes.string,
  introHeading: PropTypes.string,
  introSubheading: PropTypes.string,
  introDescription: PropTypes.object,
  whyHeading: PropTypes.string,
  whyDescription: PropTypes.object,
  whyImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  featuresTitle: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.object,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
  isPreview: PropTypes.bool,
}

const IndexPage = ({ data }) => {
  const { contentfulLandingPage } = data

  return (
    <Layout>
      <IndexPageTemplate
        image={contentfulLandingPage.heroImage}
        mainpitch={contentfulLandingPage.mainPitch}
        introHeading={contentfulLandingPage.introHeading}
        introSubheading={contentfulLandingPage.introSubheading}
        introDescription={contentfulLandingPage.introDescription}
        whyHeading={contentfulLandingPage.whyHeading}
        whyDescription={contentfulLandingPage.whyDescription}
        whyImage={contentfulLandingPage.whyImage}
        featuresTitle={contentfulLandingPage.featuresTitle}
        features={contentfulLandingPage.features}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    contentfulLandingPage: PropTypes.object,
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query LandingPage {
    contentfulLandingPage {
      mainPitch
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      introHeading
      introSubheading
      introDescription {
        raw
      }
      whyHeading
      whyDescription {
        raw
      }
      whyImage {
        gatsbyImageData(
          height: 800
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
      features {
        heading
        description {
          raw
        }
        image {
          gatsbyImageData(
            width: 840
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }
`
