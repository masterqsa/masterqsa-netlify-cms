import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <section className="tq-section tq-section--paper">
      <div className="tq-wrap">
        <div
          className="tq-card"
          style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
        >
          <div className="tq-eyebrow">
            <span className="tq-eyebrow__dot" aria-hidden="true" />
            <span>404 · PAGE NOT FOUND</span>
          </div>
          <h1
            className="tq-section__title"
            style={{ textAlign: 'center', marginBottom: '12px' }}
          >
            Page Not Found
          </h1>
          <p style={{ color: 'var(--tq-muted)', marginBottom: '24px' }}>
            The page you requested could not be found. Return to the TurboQSA
            homepage or contact our team for assistance.
          </p>
          <Link className="tq-btn tq-btn--primary" to="/">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
