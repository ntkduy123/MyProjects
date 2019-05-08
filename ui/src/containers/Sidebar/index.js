import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Drawer, Layout} from 'antd'

import SidebarContent from './SidebarContent'
import {toggleCollapsedSideNav, updateWindowWidth} from 'appRedux/actions/Setting'
import {
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from '../../constants/ThemeSetting'

const {Sider} = Layout

export class Sidebar extends Component {

  onToggleCollapsedNav = () => {
    this.props.toggleCollapsedSideNav(!this.props.navCollapsed)
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth)
    })
  }

  render() {
    const {navCollapsed, width, navStyle} = this.props

    let drawerStyle = ''
    console.log(navStyle)
    return (
      <Sider
        className={`gx-app-sidebar ${drawerStyle} gx-layout-sider-dark`}
        trigger={null}
        collapsed={(width < TAB_SIZE ?
          false :
          navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
        theme={'dark'}
        collapsible>
        {
          width < TAB_SIZE ?
            <Drawer
              wrapClassName={'gx-drawer-sidebar gx-drawer-sidebar-dark'}
              placement="left"
              closable={false}
              onClose={this.onToggleCollapsedNav.bind(this)}
              visible={navCollapsed}>
              <SidebarContent/>
            </Drawer> :
            <SidebarContent/>
        }
      </Sider>)
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, navCollapsed, width} = settings
  return {navStyle, navCollapsed, width}
}
export default connect(mapStateToProps, {toggleCollapsedSideNav, updateWindowWidth})(Sidebar)
