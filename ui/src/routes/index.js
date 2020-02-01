import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isLogin } from 'util/user'

import asyncComponent from 'util/asyncComponent'

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

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}blog`} component={asyncComponent(() => import('./Blog'))} />
      <Route path={`${match.url}tiny-url`} component={asyncComponent(() => import('./TinyURL'))} />
      <RestrictedRoute path={`${match.url}admin`} component={asyncComponent(() => import('./Admin'))} />
    </Switch>
  </div>
)

RestrictedRoute.propTypes = {
  component: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
}

App.propTypes = {
  match: PropTypes.shape().isRequired
}

export default App
