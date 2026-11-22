import React from 'react'

import Layout from '../../components/Layout'
import FAQ from '../../components/FAQ'
import CallToAction from '../../components/callToAction/CallToAction'
import turboSpiral from '../../img/turbo-spiral.svg'

export default class FAQIndexPage extends React.Component {
  render() {
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
              <span>SUPPORT &amp; PLATFORM OVERVIEW</span>
            </div>
            <h1 className="tq-page-hero__title">Frequently Asked Questions</h1>
            <p className="tq-page-hero__lead">
              Answers on security architecture, single-tenant deployment,
              PCI DSS v4.0.1 workflows, Standalone SAQs, and Pay-as-you-go
              billing.
            </p>
          </div>
        </section>

        <section className="tq-section tq-section--paper">
          <div className="tq-wrap">
            <div
              className="tq-faq"
              style={{ maxWidth: '900px', margin: '0 auto 56px' }}
            >
              <FAQ />
            </div>
            <CallToAction />
          </div>
        </section>
      </Layout>
    )
  }
}
