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

const INIT_STATE = {
  taskList: [],
  taskLabelList: [],
  taskTypeList: [],
  taskStatusList: [],
  loading: false
}


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TASK:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: action.payload
      }

    case GET_ALL_TASK_LABEL:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_TASK_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        taskLabelList: action.payload
      }

    case GET_ALL_TASK_TYPE:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_TASK_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        taskTypeList: action.payload
      }

    case GET_ALL_TASK_STATUS:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_TASK_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskStatusList: action.payload
      }

    case SAVE_OR_UPDATE_TASK:
      return {
        ...state,
        loading: true
      }

    case SAVE_OR_UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case SAVE_OR_UPDATE_TASK_ERROR:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
