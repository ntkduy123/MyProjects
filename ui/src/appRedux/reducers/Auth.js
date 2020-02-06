import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR
} from 'constants/ActionTypes'
import { SIGNIN_USER_ERROR, SIGNOUT_USER } from '../../constants/ActionTypes'

const INIT_STATE = {
  loader: false,
  showMessage: false,
  loggedIn: false
}


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }

    case SIGNIN_USER: {
      return {
        ...state,
        loader: true,
        alertMessage: ''
      }
    }

    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        loggedIn: true
      }
    }

    case SIGNIN_USER_ERROR: {
      return {
        ...state,
        loader: false
      }
    }

    case SIGNOUT_USER: {
      return {
        ...state,
        loader: true,
        alertMessage: ''
      }
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        loggedIn: false,
        loader: false
      }
    }

    case SIGNUP_USER: {
      return {
        ...state,
        loader: true
      }
    }

    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false
      }
    }

    case SIGNUP_USER_ERROR: {
      return {
        ...state,
        loader: false
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }

    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false
      }
    }

    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }

    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      }
    }

    default:
      return state
  }
}
