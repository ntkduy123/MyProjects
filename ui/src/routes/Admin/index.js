import React from 'react'
import { Route, Switch } from 'react-router-dom'

import asyncComponent from 'util/asyncComponent'
import PropTypes from 'prop-types'

const Admin = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/post-table`} component={asyncComponent(() => import('containers/Blog/PostTable'))} />
    <Route path={`${match.url}/post-form/:id`} component={asyncComponent(() => import('containers/Blog/PostForm'))} />
    <Route path={`${match.url}/post-form`} component={asyncComponent(() => import('containers/Blog/PostForm'))} />
  </Switch>
)

Admin.propTypes = {
  match: PropTypes.shape().isRequired
}

export default Admin
