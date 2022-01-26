import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/Layout'
import { SectionHeader } from '../../components/core/Headers'

export default function PricingIndexPage() {
  const [numOfUsers, setNumOfUsers] = React.useState(5)

  let calculatedPrice = 0
  let isIndividualPlan = false
  let pricingDescription = ''

  const PRICE_TIER_1 = 500000
  const PRICE_TIER_2 = 400000

  if (numOfUsers > 20) {
    isIndividualPlan = true
    pricingDescription = 'Contact us for an individual pricing'
  } else if (numOfUsers > 10) {
    calculatedPrice += (numOfUsers - 10) * PRICE_TIER_2
    calculatedPrice += 10 * PRICE_TIER_1
    pricingDescription = `Pay $${(PRICE_TIER_1 / 100).toLocaleString(
      'en-US'
    )} per user for the first 10 users, and $${(
      PRICE_TIER_2 / 100
    ).toLocaleString('en-US')} per user up to 20 users`
  } else {
    calculatedPrice += numOfUsers * PRICE_TIER_1
    pricingDescription = `Pay $${(PRICE_TIER_1 / 100).toLocaleString(
      'en-US'
    )} per user up to 10 users, with a tiered discount for more than 10 users`
  }

  return (
    <Layout>
      <div className="section">
        <SectionHeader className="has-text-centered">Pricing</SectionHeader>
      </div>
      <section className="section">
        <div className="container">
          <div className="content">
            <div style={{ display: 'flex', gap: '3rem' }}>
              <div>
                <h4>Pricing calculator</h4>
                <div className="field">
                  <div className="field-label is-normal">
                    <label className="label" htmlFor="numOfUsers">
                      How many users?
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          id="numOfUsers"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="num of users"
                          value={numOfUsers}
                          onChange={e => setNumOfUsers(Number(e.target.value))}
                          className="input pricingCalculator__input"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4>Annual pricing summary</h4>
                {isIndividualPlan ? (
                  <p>
                    <Link
                      className="button is-outlined is-primary"
                      to="/contact"
                    >
                      Contact us
                    </Link>
                  </p>
                ) : (
                  <>
                    <p style={{ margin: 0 }}>
                      <span className="is-size-3 has-text-brand">
                        ${(calculatedPrice / 100).toLocaleString('en-US')}
                      </span>{' '}
                      / year
                    </p>
                    <p>For {numOfUsers} users</p>
                  </>
                )}
                <p>{pricingDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
