import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS
} from 'constants/ActionTypes'

export const userSignIn = user => ({
  type: SIGNIN_USER,
  payload: user
})

export const userSignOut = () => ({
  type: SIGNOUT_USER
})

export const userSignInSuccess = authUser => ({
  type: SIGNIN_USER_SUCCESS,
  payload: authUser
})

export const userSignOutSuccess = () => ({
  type: SIGNOUT_USER_SUCCESS,
})

export const showAuthMessage = message => ({
  type: SHOW_MESSAGE,
  payload: message
})


export const userGoogleSignIn = payload => ({
  type: SIGNIN_GOOGLE_USER,
  payload
})

export const userGoogleSignInSuccess = authUser => ({
  type: SIGNIN_GOOGLE_USER_SUCCESS,
  payload: authUser
})

export const setInitUrl = url => ({
  type: INIT_URL,
  payload: url
})

export const showAuthLoader = () => ({
  type: ON_SHOW_LOADER,
})

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
})

export const hideAuthLoader = () => ({
  type: ON_HIDE_LOADER,
})

export const resetPassword = payload => ({
  type: RESET_PASSWORD,
  payload
})

export const resetPasswordSuccess = resetedPassword => ({
  type: RESET_PASSWORD_SUCCESS,
  resetedPassword
})
