import React from 'react'
import { Route, Switch } from 'react-router-dom'

import asyncComponent from 'util/asyncComponent'

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}blog`} component={asyncComponent(() => import('./Blog'))} />
    </Switch>
  </div>
)

export default App
