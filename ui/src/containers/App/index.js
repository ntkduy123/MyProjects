import React, { Component } from 'react'
import { connect } from 'react-redux'
import URLSearchParams from 'url-search-params'
import { Redirect, Route, Switch } from 'react-router-dom'

import { setInitUrl } from 'appRedux/actions/Auth'
import { onNavStyleChange } from 'appRedux/actions/Setting'
import PropTypes from 'prop-types'

import { isLogin } from 'util/user'
import { MainApp } from './MainApp'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

class App extends Component {
  componentDidMount() {
    const { location } = this.props
    const { search } = location
    const params = new URLSearchParams(search)

    if (params.has('nav-style')) {
      const { onNavStyleChange } = this.props
      onNavStyleChange(params.get('nav-style'))
    }
  }

  setLayoutType = () => {
    document.body.classList.remove('full-layout')
    document.body.classList.remove('framed-layout')
    document.body.classList.add('boxed-layout')
  };

  setNavStyle = () => {
    document.body.classList.add('full-scroll')
    document.body.classList.add('horizontal-layout')
  };

  render() {
    const {
      match, location
    } = this.props

    if (location.pathname === '/') {
      return ( <Redirect to="/blog/post-list" />)
    }

    if (location.pathname === '/signin') {
      if (isLogin()) {
        return ( <Redirect to="/blog/post-list" />)
      }
    }

    this.setLayoutType()

    this.setNavStyle()
    return (
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path={`${match.url}`} component={MainApp} />
      </Switch>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser, initURL } = auth
  return {
    authUser, initURL
  }
}

App.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  onNavStyleChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setInitUrl, onNavStyleChange })(App)
