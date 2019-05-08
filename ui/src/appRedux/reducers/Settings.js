import { TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from 'constants/ActionTypes'
import {
  NAV_STYLE,
  NAV_STYLE_FIXED
} from '../../constants/ThemeSetting'

const initialSettings = {
  navCollapsed: true,
  navStyle: NAV_STYLE_FIXED,
  pathname: '',
  width: window.innerWidth,
  isDirectionRTL: false
}

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        pathname: action.payload.pathname,
        navCollapsed: false
      }
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.navCollapsed
      }
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      }

    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      }
    default:
      return state
  }
}

export default settings
