import {
  GET_S3_FILE_LIST,
  GET_S3_FILE_LIST_SUCCESS,
  DELETE_S3_FILE,
  DELETE_S3_FILE_SUCCESS
} from 'constants/ActionTypes'

const INIT_STATE = {
  s3FileList: [],
  deletedS3File: {},
  loading: false
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_S3_FILE_LIST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_S3_FILE_LIST_SUCCESS: {
      return {
        ...state,
        s3FileList: action.payload,
        loading: false
      }
    }

    case DELETE_S3_FILE:
      return {
        ...state,
        loading: true
      }

    case DELETE_S3_FILE_SUCCESS:
      const newS3FileList = state.s3FileList.filter(file => file.id !== action.payload.id)
      return {
        ...state,
        loading: false,
        s3FileList: newS3FileList
      }

    default:
      return state
  }
}
