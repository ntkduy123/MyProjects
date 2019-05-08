import React, {Component} from 'react'
import {Layout} from 'antd'

import Sidebar from '../Sidebar/index'

import Topbar from '../Topbar/index'
import {footerText} from 'util/config'
import App from 'routes/index'
import {connect} from 'react-redux'

const {Content, Footer} = Layout

export class MainApp extends Component {

  getContainerClass = () => {
    return ''
  };
  getNavStyles = () => {
    return <Topbar/>
  };

  getSidebar = () => {
    return <Sidebar/>
  };

  render() {
    const {match} = this.props

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar()}
        <Layout>
          {this.getNavStyles()}
          <Content className={`gx-layout-content ${ this.getContainerClass()} `}>
            <App match={match}/>
            <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {width, navStyle} = settings
  return {width, navStyle}
}
export default connect(mapStateToProps)(MainApp)

