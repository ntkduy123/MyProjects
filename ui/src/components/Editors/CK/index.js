import React from 'react'
import PropTypes from 'prop-types'
import CKEditor from 'react-ckeditor-component'


const CK = ({ onChange, content }) => {
  (
    <CKEditor
      activeClass="p10"
      content={content}
      events={{
        'change': onChange
      }}
    />
  )
}

CK.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape().isRequired
}

export default CK
