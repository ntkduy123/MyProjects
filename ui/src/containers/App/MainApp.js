import React, { Component } from 'react'
import { Layout } from 'antd'


import { footerText } from 'util/config'
import App from 'routes/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InsideHeader from 'containers/Topbar/InsideHeader'

const { Content, Footer } = Layout

export class MainApp extends Component {
  getContainerClass = () => 'gx-container-wrap';

  getNavStyles = () => {
    const { history } = this.props
    return <InsideHeader history={history} />
  }

  getSidebar = () => null

  render() {
    const { match } = this.props

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar()}
        <Layout>
          {this.getNavStyles()}
          <Content className={`gx-layout-content ${this.getContainerClass()} `}>
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
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
}

export default connect(mapStateToProps)(MainApp)
