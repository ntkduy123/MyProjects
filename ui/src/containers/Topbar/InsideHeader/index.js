import React, { Component } from 'react'
import {
  Button, Dropdown, Icon, Layout, Menu, message, Popover
} from 'antd'
import { connect } from 'react-redux'
import { isLogin } from 'util/user'
import PropTypes from 'prop-types'

import SearchBox from 'components/SearchBox'
import UserInfo from 'components/UserInfo'
import AppNotification from 'components/AppNotification'
import MailNotification from 'components/MailNotification'
import { Link, Redirect } from 'react-router-dom'
import {
  userSignOut
} from 'appRedux/actions/Auth'
import HorizontalNav from '../HorizontalNav'
import { toggleCollapsedSideNav } from '../../../appRedux/actions/Setting'


const { Header } = Layout

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
)

function handleMenuClick(e) {
  message.info('Click on menu item.')
}

class InsideHeader extends Component {
  state = {
    searchText: '',
  }

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    })
  }

  signOut = () => {
    const { userSignOut, history } = this.props
    userSignOut()
    history.push('/')
  }


  render() {
    const { searchText } = this.state

    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
        {
          !isLogin() ? (
            <div className="gx-header-horizontal-top">
              <div className="gx-container">
                <div className="gx-header-horizontal-top-flex">
                  <div className="gx-header-horizontal-top-left">
                    <i className="icon icon-alert gx-mr-3" />
                    <p className="gx-mb-0 gx-text-truncate">
                      {'A new version will be released on December 25th. Stay tuned!'}
                    </p>
                  </div>
                  <ul className="gx-login-list">
                    <Link to="/signin">Login</Link>
                    <Link to="/signup">Signup</Link>
                  </ul>
                </div>
              </div>
            </div>
          ) : ''
        }
        <Header
          className="gx-header-horizontal-main"
        >
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                <img alt="" src={require('assets/images/w-logo.png')} />
              </Link>
              <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                <img alt="" src={require('assets/images/logo.png')} />
              </Link>

              <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                <HorizontalNav />
              </div>
              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-notify gx-notify-search">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={(
                      <div className="gx-d-flex">
                        <Dropdown overlay={menu}>
                          <Button>
                            {'Category'}
                            <Icon type="down" />
                          </Button>
                        </Dropdown>
                        <SearchBox
                          styleName="gx-popover-search-bar"
                          placeholder="Search in app..."
                          onChange={this.updateSearchChatUser}
                          value={searchText}
                        />
                      </div>
                    )}
                    trigger="click"
                  >

                    <span className="gx-pointer gx-d-block"><i className="icon icon-search-new" /></span>

                  </Popover>
                </li>

                <li className="gx-notify">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={<AppNotification />}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block"><i className="icon icon-notification" /></span>
                  </Popover>
                </li>

                <li className="gx-msg">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={<MailNotification />}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-status-pos gx-d-block">
                      <i className="icon icon-chat-new" />
                      <span className="gx-status gx-status-rtl gx-small gx-orange" />
                    </span>
                  </Popover>
                </li>
                {/* <li className="gx-language">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={this.languageMenu()}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <i
                        className={`flag flag-24 flag-${locale.icon}`}
                      />
                    </span>
                  </Popover>
                </li> */}
                {
                  isLogin() ? (
                    <li className="gx-user-nav"><UserInfo signOut={this.signOut} /></li>
                  ) : ''
                }
              </ul>
            </div>
          </div>
        </Header>
      </div>
    )
  }
}

InsideHeader.propTypes = {
  userSignOut: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
}

const mapStateToProps = ({ settings }) => {
  const { locale, navCollapsed } = settings
  return { locale, navCollapsed }
}
export default connect(mapStateToProps, { toggleCollapsedSideNav, userSignOut })(InsideHeader)
