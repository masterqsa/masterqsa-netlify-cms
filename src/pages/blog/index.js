import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import CallToAction from '../../components/callToAction/CallToAction'
import turboSpiral from '../../img/turbo-spiral.svg'

export default class BlogIndexPage extends React.Component {
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
              <span>INSIGHTS &amp; PRODUCT NOTES</span>
            </div>
            <h1 className="tq-page-hero__title">Latest Stories</h1>
            <p className="tq-page-hero__lead">
              Updates on PCI DSS v4.0.1 reporting, Standalone SAQ workflows, and
              assessment productivity from the TurboQSA team.
            </p>
          </div>
        </section>

        <section className="tq-section tq-section--paper">
          <div className="tq-wrap">
            <div style={{ marginBottom: '56px' }}>
              <BlogRoll pageView />
            </div>
            <CallToAction />
          </div>
        </section>
      </Layout>
    )
  }
}
