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

const RestrictedRoute = ({ component: Element, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLogin()
      ? <Element {...props} />
      : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      ))}
  />
)

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
    document.body.classList.remove('boxed-layout')
    document.body.classList.remove('framed-layout')
    document.body.classList.add('full-layout')
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
      if (!isLogin()) {
        return ( <Redirect to="/signin" /> )
      } else {
        return ( <Redirect to="/blog/post-list" /> )
      }
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
        <RestrictedRoute path={`${match.url}`} component={MainApp} />
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

RestrictedRoute.propTypes = {
  component: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
}

App.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  onNavStyleChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setInitUrl, onNavStyleChange })(App)
