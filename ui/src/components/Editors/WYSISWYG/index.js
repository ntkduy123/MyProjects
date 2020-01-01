import React from 'react'
import { Card } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import PropTypes from 'prop-types'

const WYSISWYG = ({ customOptions, onEditorStateChange, editorState }) => (
  <Card className="gx-card">
    <Editor
      editorStyle={{
        width: '100%',
        minHeight: 500,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'lightgray'
      }}
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      onEditorStateChange={onEditorStateChange}
      toolbarCustomButtons={[customOptions]}
      toolbar={{
        options: ['inline']
      }}
    />
  </Card>
)

WYSISWYG.propTypes = {
  customOptions: PropTypes.shape().isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  editorState: PropTypes.shape().isRequired
}

export default WYSISWYG
