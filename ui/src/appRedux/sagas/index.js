import { all } from 'redux-saga/effects'
import blogSagas from './Blog'
import awsSagas from './AWS'
import authSagas from './Auth'
import tinyURLSagas from './TinyURL'
import todoSagas from './Todo'

export default function* rootSaga(getState) {
  yield all([
    blogSagas(),
    awsSagas(),
    authSagas(),
    tinyURLSagas(),
    todoSagas()
  ])
}
