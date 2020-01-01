import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import UploadPicture from './UploadPicture'

const UploadDialog = ({
  visible, onClose, onCancel, addImage
}) => (
  <div>
    <Modal
      title="Upload Dialog"
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
    >
      <UploadPicture addImage={addImage} />
    </Modal>
  </div>
)

UploadDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired
}

export default UploadDialog
