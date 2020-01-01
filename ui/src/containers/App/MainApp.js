import React, { Component } from 'react'
import { Layout } from 'antd'


import { footerText } from 'util/config'
import App from 'routes/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Topbar from '../Topbar/index'
import { Sidebar } from '../Sidebar/index'
import { TAB_SIZE } from '../../constants/ThemeSetting'

const { Content, Footer } = Layout

export class MainApp extends Component {
  getContainerClass = () => '';

  getNavStyles = () => {
    const { width } = this.props
    if (width < TAB_SIZE) {
      return <Topbar />
    }
    return null
  };

  getSidebar = () => <Sidebar />;

  render() {
    const { match } = this.props

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar()}
        <Layout>
          {this.getNavStyles()}
          <Content style={{ overflowX: 'hidden' }} className={`gx-layout-content ${this.getContainerClass()} `}>
            <App match={match} />
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


const mapStateToProps = ({ settings }) => {
  const { width, navStyle } = settings
  return { width, navStyle }
}

MainApp.propTypes = {
  width: PropTypes.number.isRequired,
  match: PropTypes.shape().isRequired
}

export default connect(mapStateToProps)(MainApp)
