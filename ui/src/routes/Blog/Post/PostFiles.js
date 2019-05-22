import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Icon, message } from 'antd'
import UploadListStyle from 'components/Upload/UploadListStyle'
import { getS3FileList, deleteS3File } from 'appRedux/actions/AWS'
import { hideMessage } from 'appRedux/actions/Common'

class PostFiles extends React.Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  componentDidMount = () => {
    this.props.getS3FileList()
  }

  handleRemove = (id) => {
    const { deleteS3File } = this.props
    deleteS3File(id)
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.showMessage) {
      message.success(this.props.message.toString())
      this.props.hideMessage()
    }
  }

  render() {
    const { getS3FileList, s3FileList } = this.props
    const fileList = s3FileList.map(s3File => {
      return {
        uid: s3File.id,
        name: s3File.name,
        url: s3File.url,
        thumbUrl: s3File.url,
        status: 'done'
      }
    })

    return (
      <div>
        <Button onClick={this.showModal}><Icon type="upload"/> Click to upload</Button>
        <Modal
          title="My uploaded files"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UploadListStyle
            handleAdd={getS3FileList}
            handleRemove={this.handleRemove}
            fileList={fileList} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ aws, common }) => {
  const { s3FileList, loading } = aws
  const { showMessage, message } = common
  return { s3FileList, loading, showMessage, message }
}

export default connect(mapStateToProps, { getS3FileList, deleteS3File, hideMessage })(PostFiles)

