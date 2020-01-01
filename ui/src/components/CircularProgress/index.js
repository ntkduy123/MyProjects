import React from 'react'
import PropTypes from 'prop-types'
import loader from '../../assets/images/loader.svg'

const CircularProgress = ({ className }) => (
  <div className={`loader ${className}`}>
    <img src={loader} alt="loader" />
  </div>
)

CircularProgress.propTypes = {
  className: PropTypes.string.isRequired
}

export default CircularProgress
