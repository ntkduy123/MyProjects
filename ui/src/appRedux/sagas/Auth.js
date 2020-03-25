/* eslint-disable no-undef */
import {
  all, call, fork, put, takeEvery
} from 'redux-saga/effects'
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER
} from 'constants/ActionTypes'
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignInError,
  userSignUpError,
  userSignUpSuccess
} from '../actions/Auth'
import { callApi } from '../../util/api'

const signInUserWithEmailPasswordRequest = payload => callApi(
  '/api/users/login',
  'POST',
  payload
)

const signUpRequest = payload => callApi(
  '/api/users/register',
  'POST',
  payload
)

function* signInUserWithEmailPassword({ payload }) {
  try {
    const response = yield call(signInUserWithEmailPasswordRequest, payload)
    if (response.message) {
      localStorage.setItem('Authorization', response.message)
      yield put(userSignInSuccess(signInUser.token))
    }
  } catch (error) {
    yield put(userSignInError(error.message))
  }
}

function* signOut() {
  try {
    localStorage.removeItem('Authorization')
    yield put(userSignOutSuccess(signOutUser))
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

function* signUp() {
  try {
    const response = yield call(signUpRequest, payload)
    yield put(userSignUpSuccess(signOutUser))
  } catch (error) {
    yield put(userSignUpError(error))
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword)
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut)
}

export function* signUpUser() {
  yield takeEvery(SIGNUP_USER, signUp)
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(signOutUser),
    fork(signUpUser)
  ])
}
