import React from 'react'
import { Route, Switch } from 'react-router-dom'

import asyncComponent from 'util/asyncComponent'

const Blog = ({match}) => (
  <Switch>
    <Route path={`${match.url}/post-list`} component={asyncComponent(() => import('./Post/PostList'))}/>
    <Route path={`${match.url}/post-table`} component={asyncComponent(() => import('./Post/PostTable'))}/>
    <Route path={`${match.url}/post-form/:id`} component={asyncComponent(() => import('./Post/PostForm'))}/>
    <Route path={`${match.url}/post-form`} component={asyncComponent(() => import('./Post/PostForm'))}/>
  </Switch>
)

export default Blog
