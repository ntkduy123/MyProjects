import {
  GET_S3_FILE_LIST,
  GET_S3_FILE_LIST_SUCCESS,
  DELETE_S3_FILE,
  DELETE_S3_FILE_SUCCESS
} from 'constants/ActionTypes'

export const getS3FileList = (payload) => {
  return {
    type: GET_S3_FILE_LIST,
    payload
  }
}

export const getS3FileListSuccess = (s3FileList) => {
  return {
    type: GET_S3_FILE_LIST_SUCCESS,
    payload: s3FileList
  }
}

export const deleteS3File = (payload) => {
  return {
    type: DELETE_S3_FILE,
    payload
  }
}

export const deleteS3FileSuccess = (deletedS3File) => {
  return {
    type: DELETE_S3_FILE_SUCCESS,
    payload: deletedS3File
  }
}
