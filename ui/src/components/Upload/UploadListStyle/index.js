import React, { Component } from 'react'
import { Button, Icon, Upload, Spin } from 'antd'

class UploadListStyle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    const { fileList, handleRemove, handleAdd } = this.props
    const { loading } = this.state

    const props = {
      action: '/api/aws/s3',
      listType: 'picture',
      fileList,
      onSuccess: () => {
        handleAdd()
        this.setState({
          loading: false
        })
      },
      onRemove: (file) => {
        handleRemove({
          id: file.uid
        })
        this.setState({
          loading: false
        })
      },
      onChange: ({ file }) => {
        console.log(file)
        if (file.status === 'uploading') {
          this.setState({
            loading: true
          })
        }
      }
    }

    return (
      <Spin spinning={loading} size="large">
        <Upload {...props}>
          <Button>
            <Icon type="upload"/> upload
          </Button>
        </Upload>
      </Spin>
    )
  }
}

export default UploadListStyle
