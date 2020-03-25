import {
  takeEvery, call, all, fork, put
} from 'redux-saga/effects'
import {
  GET_ALL_TASK,
  GET_ALL_TASK_LABEL,
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_STATUS,
  SAVE_OR_UPDATE_TASK
} from 'constants/ActionTypes'
import {
  getAllTaskSuccess,
  getAllTaskTypeSuccess,
  getAllTaskStatusSuccess,
  getAllTaskLabelSuccess,
  saveOrUpdateTaskSuccess,
  saveOrUpdateTaskError
} from '../actions/Todo'
import { showMessage } from '../actions/Common'

import { callApi } from '../../util/api'

const fetchAllTaskRequest = payload => callApi(
  '/api/task',
  'GET',
  payload
)

function* fetchAllTask({ payload }) {
  const fetchedTaskList = yield call(fetchAllTaskRequest, payload)
  yield put(getAllTaskSuccess(fetchedTaskList))
}

export function* fetchAllTaskWatcher() {
  yield takeEvery(GET_ALL_TASK, fetchAllTask)
}

const fetchAllTaskLabelRequest = payload => callApi(
  '/api/task/label',
  'GET',
  payload
)

function* fetchAllTaskLabel({ payload }) {
  const fetchedTaskLabelList = yield call(fetchAllTaskLabelRequest, payload)
  yield put(getAllTaskLabelSuccess(fetchedTaskLabelList))
}

export function* fetchAllTaskLabelWatcher() {
  yield takeEvery(GET_ALL_TASK_LABEL, fetchAllTaskLabel)
}

const fetchAllTaskTypeRequest = payload => callApi(
  '/api/task/type',
  'GET',
  payload
)

function* fetchAllTaskType({ payload }) {
  const fetchedTaskTypeList = yield call(fetchAllTaskTypeRequest, payload)
  yield put(getAllTaskTypeSuccess(fetchedTaskTypeList))
}

export function* fetchAllTaskTypeWatcher() {
  yield takeEvery(GET_ALL_TASK_TYPE, fetchAllTaskType)
}

const fetchAllTaskStatusRequest = payload => callApi(
  '/api/task/status',
  'GET',
  payload
)

function* fetchAllTaskStatus({ payload }) {
  const fetchedTaskStatusList = yield call(fetchAllTaskStatusRequest, payload)
  yield put(getAllTaskStatusSuccess(fetchedTaskStatusList))
}

export function* fetchAllTaskStatusWatcher() {
  yield takeEvery(GET_ALL_TASK_STATUS, fetchAllTaskStatus)
}

const saveOrUpdateTaskRequest = payload => callApi(
  '/api/task',
  'POST',
  payload
)

function* saveOrUpdateTask({ payload }) {
  try {
    const newTask = yield call(saveOrUpdateTaskRequest, payload)
    yield put(saveOrUpdateTaskSuccess(newTask))
  } catch (error) {
    yield put(saveOrUpdateTaskError(error))
  }
}

export function* saveOrUpdateTaskWatcher() {
  yield takeEvery(SAVE_OR_UPDATE_TASK, saveOrUpdateTask)
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllTaskWatcher),
    fork(fetchAllTaskLabelWatcher),
    fork(fetchAllTaskTypeWatcher),
    fork(fetchAllTaskStatusWatcher),
    fork(saveOrUpdateTaskWatcher)
  ])
}
