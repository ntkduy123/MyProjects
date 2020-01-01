import {
  GET_POST_LIST,
  GET_POST_LIST_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_CATEGORY_LIST,
  GET_POST_CATEGORY_LIST_SUCCESS,
  SAVE_OR_UPDATE_POST,
  SAVE_OR_UPDATE_POST_SUCCESS
} from 'constants/ActionTypes'

export const getPostList = payload => ({
  type: GET_POST_LIST,
  payload
})


export const getPostListSuccess = postList => ({
  type: GET_POST_LIST_SUCCESS,
  payload: postList
})

export const getPost = payload => ({
  type: GET_POST,
  payload
})

export const getPostSuccess = selectedPost => ({
  type: GET_POST_SUCCESS,
  payload: selectedPost
})

export const getPostCategoryList = payload => ({
  type: GET_POST_CATEGORY_LIST,
  payload
})

export const getPostCategoryListSuccess = postCategoryList => ({
  type: GET_POST_CATEGORY_LIST_SUCCESS,
  payload: postCategoryList
})

export const saveOrUpdatePost = payload => ({
  type: SAVE_OR_UPDATE_POST,
  payload
})

export const saveOrUpdatePostSuccess = selectedPost => ({
  type: SAVE_OR_UPDATE_POST_SUCCESS,
  payload: selectedPost
})
