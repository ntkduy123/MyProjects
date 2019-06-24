import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Settings from './Settings'
import Blog from './Blog'
import Common from './Common'
import AWS from './AWS'
import Auth from './Auth'
import TinyURL from './TinyURL'

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  blog: Blog,
  common: Common,
  aws: AWS,
  auth: Auth,
  tinyURL: TinyURL
})

export default reducers
