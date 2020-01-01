import React from 'react'
import PropTypes from 'prop-types'

const SearchBox = ({
  styleName, placeholder, onChange, value
}) => (
  <div className={`gx-search-bar ${styleName}`}>
    <div className="gx-form-group">
      <input
        className="ant-input"
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <span className="gx-search-icon gx-pointer"><i className="icon icon-search" /></span>
    </div>
  </div>
)

export default SearchBox

SearchBox.propTypes = {
  styleName: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

SearchBox.defaultProps = {
  styleName: '',
  value: '',
}
