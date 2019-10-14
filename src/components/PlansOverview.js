import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Text from './core/Text'
import usePlanOptions from '../hooks/usePlanOptions'

export default function PlansOverview({ variant = 'DEFAULT' }) {
  const plans = usePlanOptions()

  return (
    <div
      className="offers"
      style={{
        maxWidth: `calc(${360 * plans.length}px + ${plans.length - 1} * 6rem)`,
      }}
    >
      {plans.map(plan => {
        return (
          <div className="offer" key={plan.name}>
            <div className={`offer__mainInfoContainer`}>
              {variant === 'DEFAULT' && (
                <div
                  className="offer__mainInfoBackground"
                  style={{ backgroundColor: plan.color }}
                />
              )}
              <p
                className={`offer__mainInfo has-text-centered is-size-4 has-text-weight-semibold ${
                  variant === 'HOME' ? 'has-text-black' : 'has-text-white'
                }`}
              >
                {plan.name}
                <span className="is-block is-size-1">
                  ${(plan.amount / 100).toLocaleString('en-US')}
                </span>
                <span
                  className={`is-block is-size-6 ${
                    variant === 'HOME'
                      ? 'has-text-grey'
                      : 'has-text-grey-lighter'
                  }`}
                >
                  {plan.terms}
                </span>
              </p>
            </div>
            <Text>
              <ul>
                {plan.features.map(feature => {
                  return (
                    <li key={feature}>
                      <span className="icon has-text-accent">
                        <i className="fas fa-check" />
                      </span>
                      {feature}
                    </li>
                  )
                })}
              </ul>
            </Text>
            <div className="has-text-centered">
              <Link className="button is-outlined is-primary" to="/blog">
                Get Started
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

PlansOverview.propTypes = {
  variant: PropTypes.oneOf(['HOME', 'DEFAULT']),
}
