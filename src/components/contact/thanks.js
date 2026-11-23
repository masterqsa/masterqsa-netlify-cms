import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'

export default function ContactThanksPage() {
  return (
    <Layout>
      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div
            className="tq-card"
            style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
          >
            <div className="tq-form-success">
              <div className="tq-form-success__icon" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1
                className="tq-section__title"
                style={{ textAlign: 'center', fontSize: '30px' }}
              >
                Thank You!
              </h1>
              <p style={{ color: 'var(--tq-muted)', marginBottom: '24px' }}>
                Your inquiry has been submitted. A member of our team will follow
                up with demo scheduling, Pay-as-you-go pricing details, or custom
                package options.
              </p>
              <Link className="tq-btn tq-btn--primary" to="/">
                Back to TurboQSA Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
