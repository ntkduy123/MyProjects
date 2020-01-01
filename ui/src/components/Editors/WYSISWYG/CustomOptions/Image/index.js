import React, { Component } from 'react'
import { AtomicBlockUtils } from 'draft-js'
import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import img from 'assets/images/toolbar-img.svg'
import UploadDialog from 'components/UploadDialog'

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false
    }
  }

  toggleUploadDialog = () => {
    this.setState(prevState => ({
      showDialog: !prevState.showDialog
    }))
  }

  closeUploadDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  addImage = (image) => {
    const { editorState, onChange } = this.props
    const entityData = { src: image.url }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', entityData)
      .getLastCreatedEntityKey()
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' ',
    )
    onChange(newEditorState)

    this.setState({
      showDialog: false
    })
  }

  render() {
    const { showDialog } = this.state

    return (
      <div>
        {/* eslint-disable-next-line */}
        <div className="rdw-option-wrapper" onClick={this.toggleUploadDialog}><img src={img} alt="" /></div>
        <UploadDialog addImage={this.addImage} visible={showDialog} onClose={this.closeUploadDialog} />
      </div>
    )
  }
}

Image.propTypes = {
  editorState: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired
}

export default Image
