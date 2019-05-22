import { all } from 'redux-saga/effects'
import blogSagas from './Blog'
import awsSagas from './AWS'

export default function* rootSaga(getState) {
  yield all([
    blogSagas(),
    awsSagas()
  ])
}
