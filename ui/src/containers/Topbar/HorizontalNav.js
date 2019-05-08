import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu

class HorizontalNav extends Component {
  getNavStyleSubMenuClass = 'gx-menu-horizontal';

  render() {
    const { pathname, navStyle } = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    return (

      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal"
      >

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="main"
          title="Main"
        >
          <Menu.Item key="sample">
            <Link to="/sample">
              <i className="icon icon-widgets" />
              Sample Page
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>

    )
  }
}

HorizontalNav.propTypes = {}
const mapStateToProps = ({ settings }) => {
  const {
    navStyle, pathname
  } = settings
  return {
    navStyle, pathname
  }
}
export default connect(mapStateToProps)(HorizontalNav)
