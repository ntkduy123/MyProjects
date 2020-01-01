import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { onNavStyleChange, toggleCollapsedSideNav } from 'appRedux/actions/Setting'
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from '../../constants/ThemeSetting'

const SidebarLogo = ({
  width, navCollapsed, navStyle, toggleCollapsedSideNav, onNavStyleChange
}) => {
  // if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
  //   navStyle = NAV_STYLE_DRAWER
  // }
  return (
    <div className="gx-layout-sider-header">
      <div className="gx-linebar">
        {/* eslint-disable-next-line */}
        <i
          className={`gx-icon-btn icon icon-${navStyle === NAV_STYLE_MINI_SIDEBAR ? 'menu-unfold' : 'menu-fold'}`}
          onClick={() => {
            if (navStyle === NAV_STYLE_DRAWER) {
              toggleCollapsedSideNav(!navCollapsed)
            } else if (navStyle === NAV_STYLE_FIXED) {
              onNavStyleChange(NAV_STYLE_MINI_SIDEBAR)
            } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
              toggleCollapsedSideNav(!navCollapsed)
            } else {
              onNavStyleChange(NAV_STYLE_FIXED)
            }
          }}
        />
      </div>

      <Link to="/" className="gx-site-logo">
        {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE
          ? <img alt="" src={require('assets/images/w-logo.png')} />
          : <img alt="" src={require('assets/images/logo.png')} />}
      </Link>

    </div>
  )
}

const mapStateToProps = ({ settings }) => {
  const { navStyle, width, navCollapsed } = settings
  return { navStyle, width, navCollapsed }
}

SidebarLogo.propTypes = {
  width: PropTypes.number.isRequired,
  navCollapsed: PropTypes.bool.isRequired,
  navStyle: PropTypes.string.isRequired,
  toggleCollapsedSideNav: PropTypes.func.isRequired,
  onNavStyleChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  onNavStyleChange,
  toggleCollapsedSideNav
})(SidebarLogo)
