import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import CallToAction from '../components/callToAction/CallToAction'
import { HTMLContent } from '../components/Content'

import turboSpiral from '../img/turbo-spiral.svg'
import uiRocWorkspace from '../img/refresh/ui-roc-workspace.png'
import uiCustomRft from '../img/refresh/ui-custom-rft.png'
import uiFindingsCollaboration from '../img/refresh/ui-findings-collaboration.png'
import uiTurboAiSuggestions from '../img/refresh/ui-turboai-suggestions.png'

const STANDALONE_SAQS = [
  'SAQ A',
  'SAQ B-IP',
  'SAQ C-VT',
  'SAQ P2PE',
  'SAQ D — Merchant',
  'SAQ D — Service Provider',
]

export const ProductsPageTemplate = ({
  title,
  productName,
  productDescription,
}) => {
  const cleanTitle = typeof title === 'string' ? title.trim() : ''
  const cleanProductName =
    typeof productName === 'string' ? productName.trim() : ''

  return (
    <React.Fragment>
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
            <span>{cleanTitle || 'TURBOQSA PLATFORM'}</span>
          </div>
          <h1 className="tq-page-hero__title">
            {cleanProductName || 'TurboQSA PCI DSS & Standalone SAQ Platform'}
          </h1>
          <p className="tq-page-hero__lead">
            Purpose-built workspace for PCI DSS v4.0.1 Reports on Compliance,
            Standalone SAQs and AOCs, PCI PIN reporting, and private TurboAI —
            installed in your own AWS or Azure cloud for complete data
            sovereignty.
          </p>
        </div>
      </section>

      <section className="tq-section tq-section--white">
        <div className="tq-wrap">
          <div className="tq-feature-card" style={{ background: '#ffffff' }}>
            <div>
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>CORE ASSESSMENT WORKSPACE</span>
              </div>
              <h2
                className="tq-feature-card__title"
                style={{ fontSize: '28px' }}
              >
                {productName}
              </h2>
              <div className="tq-richtext">
                <HTMLContent content={productDescription} />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '22px',
                }}
              >
                <Link className="tq-btn tq-btn--primary" to="/contact">
                  Request Demo
                </Link>
                <Link className="tq-btn tq-btn--secondary" to="/pricing">
                  Pay-As-You-Go Pricing →
                </Link>
              </div>
            </div>

            <div className="tq-screen-frame">
              <div className="tq-screen-frame__bar" aria-hidden="true">
                <div className="tq-screen-frame__dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="tq-screen-frame__caption">
                  PCI DSS v4.0.1 ROC Assessment Tree
                </span>
              </div>
              <img
                src={uiRocWorkspace}
                alt="TurboQSA PCI DSS v4.0.1 Report on Compliance workspace"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="tq-section tq-section--dark">
        <div className="tq-wrap tq-saq-showcase">
          <div>
            <div className="tq-eyebrow tq-eyebrow--light">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>STANDALONE SAQ &amp; RFT ENGINE</span>
            </div>
            <h2 className="tq-section__title">
              Standalone SAQs, 7 Standard SAQ RFTs &amp; Custom RFTs
            </h2>
            <p className="tq-section__lead" style={{ marginBottom: '18px' }}>
              Launch focused SAQ-only engagements with ROC-only chapters pruned,
              guide clients step by step, and export either a{' '}
              <strong style={{ color: '#ffffff' }}>
                Combined SAQ + AOC (.docx)
              </strong>{' '}
              or a{' '}
              <strong style={{ color: '#ffffff' }}>
                Standalone AOC (.docx)
              </strong>
              . For full ROC projects, apply 7 Standard SAQ RFTs or build Custom
              RFT templates.
            </p>
            <div className="tq-standards-pills">
              {STANDALONE_SAQS.map(saq => (
                <span key={saq}>{saq}</span>
              ))}
            </div>
          </div>

          <div className="tq-screen-frame">
            <div className="tq-screen-frame__bar" aria-hidden="true">
              <div className="tq-screen-frame__dots">
                <span />
                <span />
                <span />
              </div>
              <span className="tq-screen-frame__caption">
                Custom RFT &amp; Applicability Scoping
              </span>
            </div>
            <img
              src={uiCustomRft}
              alt="TurboQSA Custom RFT builder and template manager"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div className="tq-dual-showcase" style={{ marginTop: 0 }}>
            <div className="tq-card">
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>ASSESSOR COLLABORATION</span>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>
                Inline Findings, Delegation &amp; Workpapers
              </h3>
              <p style={{ color: 'var(--tq-muted)', marginBottom: '18px' }}>
                Keep assessor workpapers separate from customer-visible comments
                while tracking every finding through QSA Review, Peer Review,
                and Approval.
              </p>
              <div className="tq-screen-frame">
                <div className="tq-screen-frame__bar" aria-hidden="true">
                  <div className="tq-screen-frame__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="tq-screen-frame__caption">
                    Collaborate &amp; Peer Review Workflow
                  </span>
                </div>
                <img
                  src={uiFindingsCollaboration}
                  alt="TurboQSA control assessment findings and Collaborate drawer"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="tq-card">
              <div className="tq-eyebrow">
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>PRIVATE TURBOAI · YOUR OWN CLOUD</span>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>
                Traceable Evidence &amp; Rationale Suggestions
              </h3>
              <p style={{ color: 'var(--tq-muted)', marginBottom: '18px' }}>
                Runs inside your own AWS or Azure cloud — not ours — surfacing
                ranked evidence excerpts and cited locations directly inside each
                requirement with zero data exfiltration and full QSA sign-off
                control.
              </p>
              <div className="tq-screen-frame">
                <div className="tq-screen-frame__bar" aria-hidden="true">
                  <div className="tq-screen-frame__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="tq-screen-frame__caption">
                    TurboAI Ranked Evidence Suggestions
                  </span>
                </div>
                <img
                  src={uiTurboAiSuggestions}
                  alt="TurboQSA TurboAI evidence suggestion view"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div
            className="tq-card tq-card--sage"
            style={{
              marginTop: '36px',
              marginBottom: '48px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div className="tq-eyebrow" style={{ marginBottom: '6px' }}>
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>MULTI-STANDARD EXTENSION</span>
              </div>
              <h2 style={{ fontSize: '24px', marginBottom: '6px' }}>
                Looking for ISO 27001, SOC 2, CMMC, FedRAMP, HIPAA, or NIST CSF?
              </h2>
              <p style={{ margin: 0, color: 'var(--tq-muted)' }}>
                Explore <strong>Turbo Assessment Pro</strong> — our 13-standard
                platform hosted in your own AWS or Azure cloud with the same
                data-sovereign architecture as TurboQSA.
              </p>
            </div>
            <a
              className="tq-btn tq-btn--primary"
              href="https://www.turboassessment.com/standards"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore 13 Standards at Turbo Assessment ↗
            </a>
          </div>

          <CallToAction />
        </div>
      </section>
    </React.Fragment>
  )
}

ProductsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productDescription: PropTypes.object.isRequired,
  productImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const ProductsPage = ({ data }) => {
  const { contentfulProductsPage } = data

  return (
    <Layout>
      <ProductsPageTemplate
        title={contentfulProductsPage.title}
        productName={contentfulProductsPage.productName}
        productDescription={contentfulProductsPage.productDescription}
        productImage={contentfulProductsPage.productImage}
      />
    </Layout>
  )
}

ProductsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProductsPage

export const productsPageQuery = graphql`
  query ProductsPage {
    contentfulProductsPage {
      title
      productName
      productDescription {
        raw
      }
      productImage {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 1280
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`
