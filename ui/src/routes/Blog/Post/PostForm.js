import React, { Component } from 'react'
import { Button, Card, Form, Input, Select, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { getPost, getPostCategoryList, saveOrUpdatePost } from 'appRedux/actions/Blog'
import PostFiles from './PostFiles'
import { hideMessage } from 'appRedux/actions/Common'
import CK from 'components/Editors/CK'

const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  componentDidMount = () => {
    const { getPost, getPostCategoryList } = this.props
    const { params } = this.props.match
    if (params.id) {
      getPost(params.id)
    }
    getPostCategoryList()
  }

  componentWillReceiveProps = (nextProps) => {
    const { selectedPost } = nextProps
    if (selectedPost) {
      this.setState({
        content: selectedPost.content
      })
    }

    if (this.props.showMessage) {
      message.success(this.props.message.toString())
      this.props.hideMessage()
      this.props.history.push('/blog/post-table')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.saveOrUpdatePost({
          ...values,
          postCategory: {
            id: values.postCategory
          },
          content: this.state.content
        })
      }
    })
  }

  handleContentChange = (evt) => {
    const newContent = evt.editor.getData()
    this.setState({
      content: newContent
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { selectedPost, postCategoryList, loading } = this.props

    return (
      <Card className="gx-card" title="Post Form">
        <Spin spinning={loading} size="large">
          <Form onSubmit={this.handleSubmit}>
            {
              selectedPost.id ?
                <FormItem
                  label="ID"
                  labelCol={{xs: 24, sm: 5}}
                  wrapperCol={{xs: 24, sm: 12}}
                >
                  {getFieldDecorator('id', {
                    initialValue: selectedPost.id
                  })(<Input disabled/>)}
                </FormItem> : ''
            }
            <FormItem
              label="Title"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              {getFieldDecorator('title', {
                initialValue: selectedPost.title,
                rules: [{required: true, message: 'Please input post title!'}]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="Author"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              {getFieldDecorator('author', {
                initialValue: selectedPost.author,
                rules: [{required: true, message: 'Please input post author!'}]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="Image"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              {getFieldDecorator('image', {
                initialValue: selectedPost.image,
                rules: [{required: true, message: 'Please input post image!'}]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="Category"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
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
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              {getFieldDecorator('description', {
                initialValue: selectedPost.description,
                rules: [{required: true, message: 'Please input post description!'}]
              })(<TextArea autosize={{ minRows: 4, maxRows: 8 }} />)}
            </FormItem>
            <FormItem
              label="Upload"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              <PostFiles />
            </FormItem>
            <FormItem
              label="Description"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              <CK content={this.state.content} onChange={this.handleContentChange} />
            </FormItem>
            <FormItem
              wrapperCol={{xs: 24, sm: {span: 12, offset: 5}}}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              {
                selectedPost.id ? (
                  <Button type="danger" onClick={() => {
                    this.setState({warning: true})
                  }}>
                    Delete
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

const mapStateToProps = ({ blog, common }) => {
  const { loading, selectedPost, postCategoryList } = blog
  const { showMessage, message } = common
  return { loading, selectedPost, postCategoryList, showMessage, message }
}

const WrappedApp = Form.create()(PostForm)

export default connect(mapStateToProps,
  {
    getPost,
    getPostCategoryList,
    saveOrUpdatePost,
    hideMessage
  }
)(WrappedApp)
