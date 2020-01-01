import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import CustomScrollbars from 'util/CustomScrollbars'
import Auxiliary from 'util/Auxiliary'
import Proptypes from 'prop-types'
import SidebarLogo from './SidebarLogo'

import UserProfile from './UserProfile'
import AppsNavigation from './AppsNavigation'
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from '../../constants/ThemeSetting'

const SubMenu = Menu.SubMenu

class SidebarContent extends Component {
  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return 'gx-no-header-notifications'
    }
    return ''
  }

  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return 'gx-no-header-submenu-popup'
    }
    return ''
  }

  render() {
    const { navStyle, pathname } = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    return (
      <Auxiliary>

        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme="dark"
              mode="inline"
            >

              <SubMenu
                key="dashboard"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={(
                  <span>
                    {' '}
                    <i className="icon icon-feedback" />
                    <span>Blog</span>
                  </span>
                  )}
              >

                <Menu.Item key="blog/post-list">
                  <Link to="/blog/post-list"> Post List</Link>
                </Menu.Item>
                <Menu.Item key="blog/post-table">
                  <Link to="/blog/post-table"> Post Table</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="tiny-url">
                <Link to="/tiny-url">
                  <i className="icon icon-link" />
                  {' '}
                  {'Tiny URL'}
                </Link>
              </Menu.Item>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    )
  }
}

SidebarContent.propTypes = {
  navStyle: Proptypes.string.isRequired,
  pathname: Proptypes.string.isRequired
}

const mapStateToProps = ({ settings }) => {
  const { navStyle, pathname } = settings
  return { navStyle, pathname }
}

export default connect(mapStateToProps)(SidebarContent)
