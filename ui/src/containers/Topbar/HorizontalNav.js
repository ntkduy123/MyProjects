import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isLogin } from 'util/user'


const SubMenu = Menu.SubMenu
// const MenuItemGroup = Menu.ItemGroup

class HorizontalNav extends Component {
  getNavStyleSubMenuClass = () => 'gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve'

  render() {
    const { pathname } = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal"
      >
        <SubMenu
          popupClassName={this.getNavStyleSubMenuClass()}
          key="main"
          title="Main"
        >
          <SubMenu
            key="dashboard"
            className="gx-menu-horizontal"
            title={(
              <span>
                <i className="icon icon-feedback" />
                <span>Blog</span>
              </span>
            )}
          >
            <Menu.Item key="blog/post-list">
              <Link to="/blog/post-list">Post List</Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          popupClassName={this.getNavStyleSubMenuClass()}
          key="tools"
          title="Tools"
        >
          <Menu.Item key="tiny-url">
            <Link to="/tiny-url">
              <i className="icon icon-link" />
              {' '}
              {'Tiny URL'}
            </Link>
          </Menu.Item>
        </SubMenu>
        {
          isLogin() ? (
            <SubMenu
              popupClassName={this.getNavStyleSubMenuClass()}
              key="admin"
              title="Admin"
            >
              <Menu.Item key="admin/post-table">
                <Link to="/admin/post-table">
                  <i className="icon icon-feedback" />
                  {' '}
                  {'Blog'}
                </Link>
              </Menu.Item>
            </SubMenu>
          ) : ''
        }
      </Menu>
    )
  }
}

HorizontalNav.propTypes = {
  pathname: PropTypes.string.isRequired
}
const mapStateToProps = ({ settings }) => {
  const {
    themeType, navStyle, pathname, locale
  } = settings
  return {
    themeType, navStyle, pathname, locale
  }
}
export default connect(mapStateToProps)(HorizontalNav)
