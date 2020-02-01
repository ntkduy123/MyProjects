import {
  takeEvery, call, all, fork, put
} from 'redux-saga/effects'
import {
  GET_POST_LIST, GET_POST, GET_POST_CATEGORY_LIST, SAVE_OR_UPDATE_POST
} from '../../constants/ActionTypes'
import {
  getPostListSuccess,
  getPostSuccess,
  getPostCategoryListSuccess,
  saveOrUpdatePostSuccess
} from '../actions/Blog'
import { showMessage } from '../actions/Common'

import { callApi } from '../../util/api'

const fetchPostListRequest = payload => callApi(
  '/api/post',
  'GET',
  payload
)

function* fetchPostList({ payload }) {
  const fetchedPostList = yield call(fetchPostListRequest, payload)
  yield put(getPostListSuccess(fetchedPostList))
}

export function* fetchPostListWatcher() {
  yield takeEvery(GET_POST_LIST, fetchPostList)
}

const fetchPostRequest = id => callApi(
  `/api/post/${id}`,
  'GET'
)

function* fetchPost({ payload }) {
  const fetchedPost = payload ? yield call(fetchPostRequest, payload) : {}
  yield put(getPostSuccess(fetchedPost))
}

export function* fetchPostWatcher() {
  yield takeEvery(GET_POST, fetchPost)
}

const fetchPostCategoryListRequest = payload => callApi(
  '/api/post/category',
  'GET',
  payload
)

function* fetchPostCategoryList({ payload }) {
  const fetchedPostCategoryList = yield call(fetchPostCategoryListRequest, payload)
  yield put(getPostCategoryListSuccess(fetchedPostCategoryList))
}

export function* fetchPostCategoryListWatcher() {
  yield takeEvery(GET_POST_CATEGORY_LIST, fetchPostCategoryList)
}

const saveOrUpdatePostRequest = payload => callApi(
  '/api/post',
  'POST',
  payload
)

function* saveOrUpdatePost({ payload }) {
  try {
    const newPost = yield call(saveOrUpdatePostRequest, payload)
    yield put(showMessage('Your post has been saved successfully'))
    yield put(saveOrUpdatePostSuccess(newPost))
  } catch (error) {
    yield put(showMessage(error))
  }
}

export function* saveOrUpdatePostWatcher() {
  yield takeEvery(SAVE_OR_UPDATE_POST, saveOrUpdatePost)
}

export default function* rootSaga() {
  yield all([
    fork(fetchPostWatcher),
    fork(fetchPostListWatcher),
    fork(fetchPostCategoryListWatcher),
    fork(saveOrUpdatePostWatcher)
  ])
}
