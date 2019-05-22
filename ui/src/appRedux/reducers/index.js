import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Settings from './Settings'
import Blog from './Blog'
import Common from './Common'
import AWS from './AWS'

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  blog: Blog,
  common: Common,
  aws: AWS
})

export default reducers
