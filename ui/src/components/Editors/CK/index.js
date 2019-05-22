import React from 'react'
import CKEditor from 'react-ckeditor-component'

class CK extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  render() {
    const { onChange, content } = this.props
    return (
      <CKEditor
        activeClass="p10"
        content={content}
        events={{
          'change': onChange
        }}
      />
    )
  }
}

export default CK
