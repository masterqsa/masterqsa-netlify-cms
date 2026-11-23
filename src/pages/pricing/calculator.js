import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/Layout'
import CallToAction from '../../components/callToAction/CallToAction'
import turboSpiral from '../../img/turbo-spiral.svg'

const PRICE_PER_OTHER_USER = 200000
const PRICE_TIER_1 = 580000
const MAX_NUM_QSA_USERS_TIER_1 = 10
const PRICE_TIER_2 = 480000
const MAX_NUM_QSA_USERS_TIER_2 = 20

function formatPrice(priceInCents) {
  return '$' + (priceInCents / 100).toLocaleString('en-US')
}

function clampUserCount(rawValue) {
  const parsed = parseInt(rawValue, 10)
  if (Number.isNaN(parsed)) {
    return 0
  }
  return Math.max(0, Math.min(100, parsed))
}

export default function PricingCalculatorPage() {
  const [numOfQSAUsers, setNumOfQSAUsers] = React.useState(3)
  const [numOfUsers, setNumOfUsers] = React.useState(2)

  let calculatedPrice = 0
  let isIndividualPlan = false
  let pricingDescription = ''
  let activeTierIndex = 0

  const planTiles = [
    {
      pricePerQSAUser: formatPrice(PRICE_TIER_1),
      rangeDescription: `First ${MAX_NUM_QSA_USERS_TIER_1} QSA users`,
    },
    {
      pricePerQSAUser: formatPrice(PRICE_TIER_2),
      rangeDescription: `Next ${MAX_NUM_QSA_USERS_TIER_1 + 1}-${MAX_NUM_QSA_USERS_TIER_2} QSA users`,
    },
    {
      pricePerQSAUser: null,
      rangeDescription: `Next ${MAX_NUM_QSA_USERS_TIER_2 + 1}+ QSA users`,
    },
  ]

  if (numOfQSAUsers > MAX_NUM_QSA_USERS_TIER_2) {
    isIndividualPlan = true
    activeTierIndex = 2
    pricingDescription =
      `Contact us for an individual pricing per QSA user.\n` +
      `Flat rate of ${formatPrice(PRICE_PER_OTHER_USER)} for each non-QSA user.`
  } else if (numOfQSAUsers > MAX_NUM_QSA_USERS_TIER_1) {
    activeTierIndex = 1
    calculatedPrice += (numOfQSAUsers - MAX_NUM_QSA_USERS_TIER_1) * PRICE_TIER_2
    calculatedPrice += MAX_NUM_QSA_USERS_TIER_1 * PRICE_TIER_1
    pricingDescription =
      `Pay ${formatPrice(PRICE_TIER_1)} per user for the first ${MAX_NUM_QSA_USERS_TIER_1} QSA users, and ` +
      `${formatPrice(PRICE_TIER_2)} per user up to ${MAX_NUM_QSA_USERS_TIER_2} QSA users.\n` +
      `Flat rate of ${formatPrice(PRICE_PER_OTHER_USER)} for each non-QSA user.`
  } else {
    activeTierIndex = 0
    calculatedPrice += numOfQSAUsers * PRICE_TIER_1
    pricingDescription =
      `Pay ${formatPrice(PRICE_TIER_1)} per user up to ${MAX_NUM_QSA_USERS_TIER_1} QSA users, ` +
      `with a tiered discount for more than ${MAX_NUM_QSA_USERS_TIER_1} QSA users.\n` +
      `Flat rate of ${formatPrice(PRICE_PER_OTHER_USER)} for each non-QSA user.`
  }

  calculatedPrice += numOfUsers * PRICE_PER_OTHER_USER

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
          <div style={{ marginBottom: '14px' }}>
            <Link className="tq-text-link tq-text-link--light" to="/pricing">
              ← Back to Pricing
            </Link>
          </div>
          <div className="tq-eyebrow tq-eyebrow--light">
            <span className="tq-eyebrow__dot" aria-hidden="true" />
            <span>ANNUAL SEAT PRICING CALCULATOR</span>
          </div>
          <h1 className="tq-page-hero__title">
            Estimate Your Annual Seat Licensing
          </h1>
          <p className="tq-page-hero__lead">
            Calculate annual subscription pricing using progressive QSA volume
            tiers and a flat rate for Associate QSA and internal team seats.
            Client users are always free of charge.
          </p>
        </div>
      </section>

      <section className="tq-section tq-section--paper">
        <div className="tq-wrap">
          <div className="tq-calc-shell">
            <div className="tq-calc-panel">
              <h2 className="tq-calc-panel__title">Pricing calculator</h2>
              <div className="tq-calc-field">
                <label htmlFor="numOfQSAUsers">How many QSA users?</label>
                <input
                  id="numOfQSAUsers"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="num of users"
                  value={numOfQSAUsers}
                  onChange={e => setNumOfQSAUsers(clampUserCount(e.target.value))}
                  className="tq-calc-input"
                />
              </div>

              <div className="tq-calc-field">
                <label htmlFor="numOfUsers">How many non-QSA users? *</label>
                <input
                  id="numOfUsers"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="num of users"
                  value={numOfUsers}
                  onChange={e => setNumOfUsers(clampUserCount(e.target.value))}
                  className="tq-calc-input"
                />
                <p className="tq-calc-help">
                  * Including Associate QSA. Client Users are free of charge.
                </p>
              </div>
            </div>

            <div className="tq-calc-summary">
              <div className="tq-eyebrow" style={{ marginBottom: '10px' }}>
                <span className="tq-eyebrow__dot" aria-hidden="true" />
                <span>ESTIMATED ANNUAL LICENSE</span>
              </div>
              <h2 className="tq-calc-summary__title">Annual pricing summary</h2>

              {isIndividualPlan ? (
                <React.Fragment>
                  <p className="tq-calc-total">
                    <span className="tq-calc-total__amount">
                      Custom Enterprise Pricing
                    </span>
                  </p>
                  <p className="tq-calc-breakdown">
                    For {numOfQSAUsers} QSA users and {numOfUsers} non-QSA users.
                  </p>
                  <p className="tq-calc-description">{pricingDescription}</p>
                  <div className="tq-calc-summary__cta">
                    <Link className="tq-btn tq-btn--primary" to="/contact">
                      Contact Us for Individual Pricing
                    </Link>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="tq-calc-total">
                    <span className="tq-calc-total__amount">
                      {formatPrice(calculatedPrice)}
                    </span>{' '}
                    <span className="tq-calc-total__period">/ year</span>
                  </p>
                  <p className="tq-calc-breakdown">
                    For {numOfQSAUsers} QSA users and {numOfUsers} non-QSA users.
                  </p>
                  <p className="tq-calc-description">{pricingDescription}</p>
                  <div className="tq-calc-summary__cta">
                    <Link className="tq-btn tq-btn--primary" to="/contact">
                      Request Custom Quote
                    </Link>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="tq-section__header" style={{ marginBottom: '26px' }}>
            <div className="tq-eyebrow">
              <span className="tq-eyebrow__dot" aria-hidden="true" />
              <span>VOLUME BREAKDOWN</span>
            </div>
            <h2 className="tq-section__title" style={{ fontSize: '30px' }}>
              Progressive Price Tiers
            </h2>
          </div>

          <div className="tq-calc-tiers">
            {planTiles.map(({ pricePerQSAUser, rangeDescription }, idx) => (
              <article
                key={rangeDescription}
                className={
                  activeTierIndex === idx
                    ? 'tq-calc-tier tq-calc-tier--active'
                    : 'tq-calc-tier'
                }
              >
                <div className="tq-calc-tier__top">
                  {pricePerQSAUser !== null ? (
                    <div className="tq-calc-tier__price">
                      <strong>{pricePerQSAUser}</strong>
                      <span>per QSA user</span>
                    </div>
                  ) : (
                    <div className="tq-calc-tier__price">
                      <Link className="tq-btn tq-btn--secondary" to="/contact">
                        Contact us
                      </Link>
                    </div>
                  )}
                  <p className="tq-calc-tier__range">{rangeDescription}</p>
                </div>
                <hr className="tq-calc-tier__divider" />
                <div className="tq-calc-tier__other">
                  <strong>{formatPrice(PRICE_PER_OTHER_USER)}</strong>
                  <span>per non-QSA user *</span>
                </div>
              </article>
            ))}
          </div>

          <p className="tq-calc-footnote">
            * Including Associate QSA. Client Users are free of charge.
          </p>

          <CallToAction />
        </div>
      </section>
    </Layout>
  )
}
