import React, { Component } from 'react'
import {
  Button, Card, Form, Input, Select, Spin, Icon, Upload, message
} from 'antd'
import WYSISWYG from 'components/Editors/WYSISWYG'
import Image from 'components/Editors/WYSISWYG/CustomOptions/Image'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { getToken } from 'util/user'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: EditorState.createEmpty(),
      featuredImage: '',
      uploadLoading: false
    }
  }

  componentDidMount = () => {
    const { getPost, getPostCategoryList, match } = this.props
    const { params } = match
    getPost(params.id)
    getPostCategoryList()
  }

  componentWillReceiveProps = (nextProps) => {
    const { selectedPost } = nextProps
    const {
      showMessage,
      hideMessage,
      history,
      match
    } = this.props

    if (selectedPost.content && match.params.id) {
      const { content } = selectedPost
      const contentObj = JSON.parse(content)
      this.setState({
        featuredImage: selectedPost.image,
        content: EditorState.createWithContent(
          convertFromRaw(contentObj)
        )
      })
    }

    if (showMessage) {
      message.success(message.toString())
      hideMessage()
      history.push('/blog/post-table')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { content, featuredImage } = this.state
    const { form, saveOrUpdatePost } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        saveOrUpdatePost({
          ...values,
          postCategory: {
            id: values.postCategory
          },
          image: featuredImage,
          content: JSON.stringify(convertToRaw(content.getCurrentContent()))
        })
      }
    })
  }

  handleContentChange = (editorState) => {
    this.setState({
      content: editorState,
    })
  }

  uploadFeaturedImage = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        featuredImage: info.file.response.url
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { selectedPost, postCategoryList, loading } = this.props
    const { featuredImage, content, uploadLoading } = this.state

    const uploadButton = (
      <div>
        <Icon type={uploadLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <Card className="gx-card" title="Post Form">
        <Spin spinning={loading} size="large">
          <Form onSubmit={this.handleSubmit}>
            {
              selectedPost.id
                ? (
                  <FormItem
                    label="ID"
                    labelCol={{ xs: 24, sm: 5 }}
                    wrapperCol={{ xs: 24, sm: 12 }}
                  >
                    {getFieldDecorator('id', {
                      initialValue: selectedPost.id
                    })(<Input disabled />)}
                  </FormItem>
                ) : ''
            }
            <FormItem
              label="Title"
              labelCol={{ xs: 24, sm: 5 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              {getFieldDecorator('title', {
                initialValue: selectedPost.title,
                rules: [{ required: true, message: 'Please input post title!' }]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="Author"
              labelCol={{ xs: 24, sm: 5 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              {getFieldDecorator('author', {
                initialValue: selectedPost.author,
                rules: [{ required: true, message: 'Please input post author!' }]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="Featured Image"
              labelCol={{ xs: 24, sm: 5 }}
              wrapperCol={{ xs: 12, sm: 3 }}
            >
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/aws/s3"
                onChange={this.uploadFeaturedImage}
                headers={{
                  'Authorization': getToken()
                }}
              >
                {featuredImage ? <img src={featuredImage} alt="" /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem
              label="Category"
              labelCol={{ xs: 24, sm: 5 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              {getFieldDecorator('postCategory', {
                initialValue: selectedPost.postCategory ? selectedPost.postCategory.id : 1
              })(
                <Select className="gx-mr-3 gx-mb-3">
                  {
                  postCategoryList.map(category => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                  ))
                }
                </Select>
              )}
            </FormItem>
            <FormItem
              label="Description"
              labelCol={{ xs: 24, sm: 5 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              {getFieldDecorator('description', {
                initialValue: selectedPost.description,
                rules: [{ required: true, message: 'Please input post description!' }]
              })(<TextArea autosize={{ minRows: 4, maxRows: 8 }} />)}
            </FormItem>
            <FormItem
              label="Description"
              labelCol={{ xs: 24, sm: 5 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              <WYSISWYG
                customOptions={<Image onEditorStateChange={this.handleContentChange} />}
                onEditorStateChange={this.handleContentChange}
                editorState={content}
              />
            </FormItem>
            <FormItem
              wrapperCol={{ xs: 24, sm: { span: 12, offset: 5 } }}
            >
              <Button type="primary" htmlType="submit">
                {'Save'}
              </Button>
              {
                selectedPost.id ? (
                  <Button
                    type="danger"
                    onClick={() => {
                      this.setState()
                    }}
                  >
                    {'Delete'}
                  </Button>
                ) : ''
              }
            </FormItem>
          </Form>
        </Spin>
      </Card>
    )
  }
}

PostForm.propTypes = {
  getPost: PropTypes.func.isRequired,
  getPostCategoryList: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
  saveOrUpdatePost: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  selectedPost: PropTypes.shape().isRequired,
  postCategoryList: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired
}

export default PostForm
