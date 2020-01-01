import React from 'react'
import PropTypes from 'prop-types'

const CardBox = ({
  heading, children, styleName, childrenStyle
}) => (
  <div className={`gx-card ${styleName}`}>
    {heading
      && (
      <div className="gx-card-head">
        <h3 className="gx-card-title">{heading}</h3>
      </div>
      )}
    <div className={`gx-card-body ${childrenStyle}`}>
      {children}
    </div>
  </div>
)

export default CardBox

CardBox.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  styleName: PropTypes.string,
  childrenStyle: PropTypes.string
}

CardBox.defaultProps = {
  styleName: '',
  childrenStyle: ''
}
