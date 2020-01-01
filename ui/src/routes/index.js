import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import asyncComponent from 'util/asyncComponent'

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}blog`} component={asyncComponent(() => import('./Blog'))} />
      <Route path={`${match.url}tiny-url`} component={asyncComponent(() => import('./TinyURL'))} />
    </Switch>
  </div>
)

App.propTypes = {
  match: PropTypes.shape().isRequired
}

export default App
