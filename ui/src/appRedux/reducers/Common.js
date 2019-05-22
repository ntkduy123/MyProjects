import { HIDE_MESSAGE, SHOW_MESSAGE } from 'constants/ActionTypes'

const INIT_STATE = {
  error: '',
  showMessage: false,
  message: ''
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, showMessage: true}
    }

    case HIDE_MESSAGE: {
      return {...state, showMessage: false, error: '', message: ''}
    }

    default:
      return state
  }
}
