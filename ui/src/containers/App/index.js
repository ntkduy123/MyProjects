import React, {Component} from 'react'
import {connect} from 'react-redux'
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from 'react-router-dom'

import SignIn from '../SignIn'
import MainApp from './MainApp'
import {onNavStyleChange} from 'appRedux/actions/Setting'

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
    const {match, location, layoutType, navStyle} = this.props

    if (location.pathname === '/') {
      return ( <Redirect to={'/sample'}/> )
    }

    this.setLayoutType(layoutType)

    this.setNavStyle(navStyle)
    return (
      <Switch>
        <Route exact path='/signin' component={SignIn}/>
        <Route path={`${match.url}`} component={MainApp}/>
      </Switch>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, layoutType} = settings
  return {navStyle, layoutType}
}
export default connect(mapStateToProps, { onNavStyleChange})(App)
