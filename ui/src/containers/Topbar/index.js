import React, {Component} from 'react'
import {Layout, Popover} from 'antd'

import {toggleCollapsedSideNav} from '../../appRedux/actions/Setting'
import SearchBox from 'components/SearchBox'
import UserInfo from 'components/UserInfo'
import AppNotification from 'components/AppNotification'
import Auxiliary from 'util/Auxiliary'


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE} from '../../constants/ThemeSetting'
import {connect} from 'react-redux'

const {Header} = Layout

class Topbar extends Component {

  state = {
    searchText: '',
  };

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    })
  };


  render() {
    const {width, navCollapsed, navStyle} = this.props
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER
            || ((navStyle === NAV_STYLE_FIXED
            || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   this.props.toggleCollapsedSideNav(!navCollapsed)
                 }}
              />
            </div> : null}
          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
                <SearchBox styleName="gx-popover-search-bar"
                           placeholder="Search in app..."
                           onChange={this.updateSearchChatUser.bind(this)}
                           value={this.state.searchText}/>
              } trigger="click">
                <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>
              </Popover>
            </li>
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                <li className="gx-notify">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                           trigger="click">
                    <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                  </Popover>
                </li>
              </Auxiliary>
            }
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                <li className="gx-user-nav"><UserInfo/></li>
              </Auxiliary>
            }
          </ul>
        </Header>
      </Auxiliary>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, navCollapsed, width} = settings
  return {navStyle, navCollapsed, width}
}

export default connect(mapStateToProps, {toggleCollapsedSideNav})(Topbar)