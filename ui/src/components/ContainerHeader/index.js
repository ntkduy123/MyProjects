import React from 'react'
import PropTypes from 'prop-types'

const ContainerHeader = ({ title, match }) => (
  <div className="gx-page-heading">
    <h2 className="gx-page-title">{title}</h2>
  </div>
)

ContainerHeader.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired
}

export default ContainerHeader
