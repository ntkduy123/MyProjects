import { HIDE_MESSAGE, SHOW_MESSAGE } from '../../constants/ActionTypes'

export const showMessage = message => ({
  type: SHOW_MESSAGE,
  payload: message
})

export const hideMessage = () => ({
  type: HIDE_MESSAGE
})
