import {
  takeEvery, call, all, fork, put
} from 'redux-saga/effects'
import { GET_S3_FILE_LIST, DELETE_S3_FILE } from '../../constants/ActionTypes'
import { getS3FileListSuccess, deleteS3FileSuccess } from '../actions/AWS'

import { callApi } from '../../util/api'

const fetchS3FileListRequest = payload => callApi(
  '/api/aws/s3',
  'GET',
  payload
)

function* fetchS3FileList({ payload }) {
  const fetchedS3FileList = yield call(fetchS3FileListRequest, payload)
  yield put(getS3FileListSuccess(fetchedS3FileList))
}

export function* fetchS3FileListWatcher() {
  yield takeEvery(GET_S3_FILE_LIST, fetchS3FileList)
}

const deleteS3FileListRequest = payload => callApi(
  `/api/aws/s3/${payload.id}`,
  'DELETE',
  payload
)

function* deleteS3FileList({ payload }) {
  const deletedS3FileList = yield call(deleteS3FileListRequest, payload)
  yield put(deleteS3FileSuccess(deletedS3FileList))
}

export function* deleteS3FileListWatcher() {
  yield takeEvery(DELETE_S3_FILE, deleteS3FileList)
}

export default function* rootSaga() {
  yield all([
    fork(fetchS3FileListWatcher),
    fork(deleteS3FileListWatcher)
  ])
}
