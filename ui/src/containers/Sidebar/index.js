import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, Layout } from 'antd'
import PropTypes from 'prop-types'

import { toggleCollapsedSideNav, updateWindowWidth } from 'appRedux/actions/Setting'
import SidebarContent from './SidebarContent'
import {
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from '../../constants/ThemeSetting'

const { Sider } = Layout

export class Sidebar extends Component {
  // componentDidMount() {
  //   window.addEventListener('resize', () => {
  //     console.log(updateWindowWidth)
  //     const { updateWindowWidth } = this.props
  //     updateWindowWidth(window.innerWidth)
  //   })
  // }

  onToggleCollapsedNav = () => {
    const { toggleCollapsedSideNav, navCollapsed } = this.props
    toggleCollapsedSideNav(!navCollapsed)
  };

  render() {
    const { navCollapsed, width, navStyle } = this.props

    const drawerStyle = ''
    return (
      <Sider
        className={`gx-app-sidebar ${drawerStyle} gx-layout-sider-dark`}
        trigger={null}
        collapsed={(width < TAB_SIZE
          ? false
          : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
        theme="dark"
        collapsible
      >
        {
          width < TAB_SIZE
            ? (
              <Drawer
                wrapClassName="gx-drawer-sidebar gx-drawer-sidebar-dark"
                placement="left"
                closable={false}
                onClose={this.onToggleCollapsedNav}
                visible={navCollapsed}
              >
                <SidebarContent />
              </Drawer>
            )
            : <SidebarContent />
        }
      </Sider>
    )
  }
}

const mapStateToProps = ({ settings }) => {
  const { navStyle, navCollapsed, width } = settings
  return { navStyle, navCollapsed, width }
}

Sidebar.propTypes = {
  toggleCollapsedSideNav: PropTypes.func.isRequired,
  navCollapsed: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  navStyle: PropTypes.string.isRequired
}

export default connect(mapStateToProps, { toggleCollapsedSideNav, updateWindowWidth })(Sidebar)
