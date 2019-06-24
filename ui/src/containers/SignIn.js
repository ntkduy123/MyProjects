import React from 'react'
import {
  Button, Form, Input, message, Spin
} from 'antd'
import { connect } from 'react-redux'

import {
  hideMessage,
  showAuthLoader,
  userGoogleSignIn,
  userSignIn
} from 'appRedux/actions/Auth'

import { isLogin } from 'util/user'

const FormItem = Form.Item

class SignIn extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.showAuthLoader()
        this.props.userSignIn(values)
      }
    })
  }

  componentDidUpdate() {
    console.log(this.props.loggedIn)
    if (this.props.loggedIn) {
      console.log(this.props.loggedIn)
      this.props.history.push('/')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loader } = this.props

    return (
      <div className="gx-app-login-wrap">
        <Spin spinning={loader} size="large">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content">
              <div className="gx-app-logo-content">
                <div className="gx-app-logo-content-bg" />
                <div className="gx-app-logo-wid">
                  <h1>Sign In</h1>
                  <p>Welcome to My Projects</p>
                </div>
              </div>
              <div className="gx-app-login-content">
                <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">

                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{
                        required: true, type: 'email', message: 'The input is not valid E-mail!',
                      }],
                    })(
                      <Input placeholder="Email" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input type="password" placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" className="gx-mb-0" htmlType="submit">
                      Sign In
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn)

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, loggedIn} = auth
  return {loader, alertMessage, showMessage, loggedIn}
}

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userGoogleSignIn
})(WrappedNormalLoginForm)