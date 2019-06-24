import React, { Component } from 'react'
import { Button, Card, Form, Input, Spin, Modal } from 'antd'
import { connect } from 'react-redux'
import { getTinyURL } from 'appRedux/actions/TinyURL'

const FormItem = Form.Item

class TinyURL extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shortenURL: undefined
    }
  }

  componentWillUnmount = () => {
    this.setState({
      shortenURL: undefined
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { shortenURL } = nextProps
    if (shortenURL) {
      this.setState({
        shortenURL: nextProps.shortenURL.message
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getTinyURL(values)
      }
    })
  }

  render() {
    const { shortenURL } = this.state
    const { loading } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Card className="gx-card" title="Shorten your URL">
        <Spin spinning={loading} size="large">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="Original URL"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              {getFieldDecorator('originalURL', {
                rules: [{required: true, message: 'Please input your original url!'}]
              })(<Input />)}
            </FormItem>
            <FormItem
              label="Shorten URL"
              labelCol={{xs: 24, sm: 5}}
              wrapperCol={{xs: 24, sm: 16}}
            >
              {getFieldDecorator('shortenURL', {
                initialValue: shortenURL || ''
              })(<Input readOnly />)}
            </FormItem>
            <FormItem
              wrapperCol={{xs: 24, sm: {span: 12, offset: 5}}}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </Card>
    )
  }
}

const mapStateToProps = ({ tinyURL }) => {
  const { loading, shortenURL } = tinyURL
  return { loading, shortenURL }
}

const WrappedApp = Form.create()(TinyURL)

export default connect(mapStateToProps, { getTinyURL })(WrappedApp)

