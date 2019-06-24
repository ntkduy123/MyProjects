import { GET_TINY_URL, GET_TINY_URL_SUCCESS } from 'constants/ActionTypes'

const INIT_STATE = {
  loading: false,
  shortenURL: undefined
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_TINY_URL: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_TINY_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        shortenURL: action.payload
      }

    default:
      return state
  }
}
