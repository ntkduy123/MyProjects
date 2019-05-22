import { HIDE_MESSAGE, SHOW_MESSAGE } from '../../constants/ActionTypes'

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
}

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
}
