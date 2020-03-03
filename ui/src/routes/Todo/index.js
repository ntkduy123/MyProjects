import React from 'react'
import { Route, Switch } from 'react-router-dom'

import asyncComponent from 'util/asyncComponent'
import PropTypes from 'prop-types'

const Blog = ({ match }) => (
  <Switch>
    <Route path={`${match.url}`} component={asyncComponent(() => import('components/Todo'))} />
  </Switch>
)

Blog.propTypes = {
  match: PropTypes.shape().isRequired
}

export default Blog
