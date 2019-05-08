import React from 'react'
import {
  Button, Checkbox, Icon, Form, Input
} from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import InfoView from "components/InfoView";

const FormItem = Form.Item

class SignIn extends React.Component {
  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push('/')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  };

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src="https://via.placeholder.com/272x395" alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>Sign In</h1>
                <p>By Signing Up, you can avail full features of our services.</p>
                <p>Get an account !!!</p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require('assets/images/logo.png')} />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">

                <FormItem>
                  {getFieldDecorator('email', {
                    initialValue: 'demo@example.com',
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input placeholder="Email" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    initialValue: 'demo#123',
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
                  <span className="gx-signup-form-forgot gx-link">Term & Condition</span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    Sign In
                  </Button>
                  <span>or</span>
                  {' '}
                  <Link to="/signup">Sign Up</Link>
                </FormItem>
                <div className="gx-flex-row gx-justify-content-between">
                  <span>or connect with</span>
                  <ul className="gx-social-link">
                    <li>
                      <Icon
                        type="google"
                        onClick={() => {
                          this.props.showAuthLoader()
                          this.props.userGoogleSignIn()
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </Form>
            </div>
            {/* <InfoView/> */}
          </div>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn)

// const {token} = auth;
const mapStateToProps = ({ auth }) => ({ token: '123' })


export default connect(mapStateToProps, {})(WrappedNormalLoginForm)
