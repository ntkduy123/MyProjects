import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'

import CustomScrollbars from 'util/CustomScrollbars'
import SidebarLogo from './SidebarLogo'

import Auxiliary from 'util/Auxiliary'
import UserProfile from './UserProfile'
import AppsNavigation from './AppsNavigation'
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from '../../constants/ThemeSetting'

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return 'gx-no-header-notifications'
    }
    return ''
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return 'gx-no-header-submenu-popup'
    }
    return ''
  };

  render() {
    const {navStyle, pathname} = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={'lite'}
              mode="inline">

              <Menu.Item key="sample">
                <Link to="/sample"><i className="icon icon-widgets"/>
                  <span>Sample Page</span></Link>
              </Menu.Item>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    )
  }
}

SidebarContent.propTypes = {}
const mapStateToProps = ({settings}) => {
  const {navStyle, pathname} = settings
  return {navStyle, pathname}
}
export default connect(mapStateToProps)(SidebarContent)

