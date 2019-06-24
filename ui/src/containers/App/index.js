import React, {Component} from 'react'
import {connect} from 'react-redux'
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from 'react-router-dom'

import SignIn from '../SignIn'
import MainApp from './MainApp'
import {setInitUrl} from 'appRedux/actions/Auth'
import {onNavStyleChange} from 'appRedux/actions/Setting'

import { isLogin } from 'util/user'

const RestrictedRoute = ({component: Component, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      isLogin()
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />

class App extends Component {

  setLayoutType = () => {
    document.body.classList.remove('boxed-layout')
    document.body.classList.remove('framed-layout')
    document.body.classList.add('full-layout')
  };

  setNavStyle = () => {
    document.body.classList.add('full-scroll')
    document.body.classList.add('horizontal-layout')
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)

    if (params.has('nav-style')) {
      this.props.onNavStyleChange(params.get('nav-style'))
    }
  }

  render() {
    const { match, location, layoutType, navStyle } = this.props

    if (location.pathname === '/') {
      if (!isLogin()) {
        return ( <Redirect to={'/signin'}/> )
      } else {
        return ( <Redirect to={'/blog/post-list'}/> )
      }
    }

    if (location.pathname === '/signin') {
      console.log(isLogin())
      if (isLogin()) {
        return ( <Redirect to={'/blog/post-list'}/>)
      }
    }

    this.setLayoutType(layoutType)

    this.setNavStyle(navStyle)
    return (
      <Switch>
        <Route exact path='/signin' component={SignIn}/>
        <RestrictedRoute path={`${match.url}`} component={MainApp}/>
      </Switch>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {navStyle, layoutType} = settings
  const {authUser, initURL} = auth
  return {navStyle, layoutType, authUser, initURL}
}

export default connect(mapStateToProps, { setInitUrl, onNavStyleChange })(App)