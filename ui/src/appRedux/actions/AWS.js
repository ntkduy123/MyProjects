import {
  GET_S3_FILE_LIST,
  GET_S3_FILE_LIST_SUCCESS,
  DELETE_S3_FILE,
  DELETE_S3_FILE_SUCCESS
} from 'constants/ActionTypes'

export const getS3FileList = payload => ({
  type: GET_S3_FILE_LIST,
  payload
})

export const getS3FileListSuccess = s3FileList => ({
  type: GET_S3_FILE_LIST_SUCCESS,
  payload: s3FileList
})

export const deleteS3File = payload => ({
  type: DELETE_S3_FILE,
  payload
})

export const deleteS3FileSuccess = deletedS3File => ({
  type: DELETE_S3_FILE_SUCCESS,
  payload: deletedS3File
})
