import React from 'react'
import PropTypes from 'prop-types'
import { PlansOverviewTemplate } from '../../components/PlansOverview'

const PlansOverviewPreview = ({ entry }) => (
  <PlansOverviewTemplate plans={entry.getIn(['data', 'plans']).toJS()} />
)

PlansOverviewPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default PlansOverviewPreview
