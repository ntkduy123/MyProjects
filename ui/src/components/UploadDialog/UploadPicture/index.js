import React, { Component } from 'react'
import { Upload, Icon } from 'antd'
import { connect } from 'react-redux'
import { getS3FileList, deleteS3File } from 'appRedux/actions/AWS'
import { getToken } from 'util/user'
import PropTypes from 'prop-types'

class UploadPicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    }
  }

  componentDidMount = () => {
    const { getS3FileList } = this.props
    getS3FileList()
  }

  componentWillReceiveProps = (nextProps) => {
    const { s3FileList } = nextProps
    if (nextProps) {
      const fileList = s3FileList.map(file => ({
        uid: file.id,
        name: file.name,
        status: 'done',
        url: file.url,
      }))
      this.setState({
        fileList
      })
    }
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }

  handleRemove = (file) => {
    const { deleteS3File } = this.props
    const { uid } = file
    deleteS3File({
      id: uid
    })
  }

  handleDownload = (file) => {
    const { addImage } = this.props
    file.response ? addImage(file.response) : addImage(file)
  }

  render() {
    const { fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <Upload
        action="/api/aws/s3"
        listType="picture-card"
        fileList={fileList}
        onChange={this.handleChange}
        onRemove={this.handleRemove}
        onPreview={this.handlePreview}
        headers={{
          'Authorization': getToken()
        }}
        showUploadList={{
          showPreviewIcon: false
        }}
        onDownload={this.handleDownload}
      >
        {uploadButton}
      </Upload>
    )
  }
}

const mapStateToProps = ({ aws }) => {
  const { s3FileList } = aws
  return { s3FileList }
}

UploadPicture.propTypes = {
  getS3FileList: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  deleteS3File: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getS3FileList, deleteS3File })(UploadPicture)
