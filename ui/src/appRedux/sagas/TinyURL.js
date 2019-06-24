import { takeEvery, call, all, fork, put } from 'redux-saga/effects'
import { GET_TINY_URL } from '../../constants/ActionTypes'
import { getTinyURLSuccess } from '../actions/TinyURL'

import { callApi } from '../../util/api'

const fetchTinyURLrequest = (payload) => callApi(
  '/api/tinyURL',
  'POST',
  payload
)

function* fetchTinyURL({ payload }) {
  try {
    const fetchedTinyURL = yield call(fetchTinyURLrequest, payload)
    yield put(getTinyURLSuccess(fetchedTinyURL))
  } catch (error) {
    console.log(error)
  }
}

export function* fetchTinyURLWatcher() {
  yield takeEvery(GET_TINY_URL, fetchTinyURL)
}

export default function* rootSaga() {
  yield all([
    fork(fetchTinyURLWatcher)
  ])
}
