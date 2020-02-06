import React from 'react'
import {
  Button, Checkbox, Form, Icon, Input, Spin
} from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  hideMessage,
  showAuthLoader,
  userSignUp,
} from 'appRedux/actions/Auth'

const FormItem = Form.Item

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form, showAuthLoader, userSignUp } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        userSignUp(values)
      }
    })
  }

  render() {
    const { form, loader } = this.props
    const { getFieldDecorator } = form
    return (
      <div className="gx-app-login-wrap">
        <Spin spinning={loader} size="large">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content">
              <div className="gx-app-logo-content">
                <div className="gx-app-logo-content-bg" />
                <div className="gx-app-logo-wid">
                  <h1>Sign Up</h1>
                  <p>By Signing Up, you can avail full features of our services.</p>
                  <p>Get an account !!!</p>
                </div>
                <div className="gx-app-logo">
                  <img alt="example" src={require('assets/images/logo.png')} />
                </div>
              </div>

              <div className="gx-app-login-content">
                <Form onSubmit={this.handleSubmit} className="gx-signup-form gx-form-row0">
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input placeholder="Username" />
                    )}
                  </FormItem>

                  <FormItem>
                    {getFieldDecorator('email', {
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
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>by signing up, I accept</Checkbox>
                    )}
                    <span className="gx-link gx-signup-form-forgot">
                      {'Term & Condition'}
                    </span>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" className="gx-mb-0" htmlType="submit">
                      {' Sign Up'}
                    </Button>
                    <span>or</span>
                    {' '}
                    <Link to="/signin">
                      {'Sign In'}
                    </Link>
                  </FormItem>
                  <div className="gx-flex-row gx-justify-content-between">
                    <span>or connect with</span>
                    <ul className="gx-social-link">
                      <li>
                        <Icon
                          type="google"
                        />
                      </li>
                      <li>
                        <Icon
                          type="facebook"
                        />
                      </li>
                      <li>
                        <Icon
                          type="github"
                        />
                      </li>
                      <li>
                        <Icon
                          type="twitter"
                        />
                      </li>
                    </ul>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Spin>
      </div>

    )
  }
}

SignUp.propTypes = {
  form: PropTypes.shape().isRequired,
  showAuthLoader: PropTypes.func.isRequired,
  userSignUp: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired
}

const WrappedSignUpForm = Form.create()(SignUp)

const mapStateToProps = ({ auth }) => {
  const {
    loader, alertMessage, showMessage, authUser
  } = auth
  return {
    loader, alertMessage, showMessage, authUser
  }
}

export default connect(mapStateToProps, {
  hideMessage,
  showAuthLoader,
  userSignUp,
})(WrappedSignUpForm)
