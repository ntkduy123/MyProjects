import {
  GET_ALL_TASK,
  GET_ALL_TASK_SUCCESS,
  GET_ALL_TASK_LABEL,
  GET_ALL_TASK_LABEL_SUCCESS,
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SUCCESS,
  GET_ALL_TASK_STATUS,
  GET_ALL_TASK_STATUS_SUCCESS,
  SAVE_OR_UPDATE_TASK,
  SAVE_OR_UPDATE_TASK_SUCCESS,
  SAVE_OR_UPDATE_TASK_ERROR
} from 'constants/ActionTypes'

export const getAllTask = payload => ({
  type: GET_ALL_TASK,
  payload
})

export const getAllTaskSuccess = taskList => ({
  type: GET_ALL_TASK_SUCCESS,
  payload: taskList
})

export const getAllTaskLabel = payload => ({
  type: GET_ALL_TASK_LABEL,
  payload
})

export const getAllTaskLabelSuccess = taskLabelList => ({
  type: GET_ALL_TASK_LABEL_SUCCESS,
  payload: taskLabelList
})

export const getAllTaskType = payload => ({
  type: GET_ALL_TASK_TYPE,
  payload
})

export const getAllTaskTypeSuccess = taskTypeList => ({
  type: GET_ALL_TASK_TYPE_SUCCESS,
  payload: taskTypeList
})

export const getAllTaskStatus = payload => ({
  type: GET_ALL_TASK_STATUS,
  payload
})

export const getAllTaskStatusSuccess = taskStatusList => ({
  type: GET_ALL_TASK_STATUS_SUCCESS,
  payload: taskStatusList
})

export const saveOrUpdateTask = payload => ({
  type: SAVE_OR_UPDATE_TASK,
  payload
})

export const saveOrUpdateTaskSuccess = payload => ({
  type: SAVE_OR_UPDATE_TASK_SUCCESS,
  payload
})

export const saveOrUpdateTaskError = () => ({
  type: SAVE_OR_UPDATE_TASK_ERROR
})
