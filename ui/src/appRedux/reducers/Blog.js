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

const INIT_STATE = {
  postList: [],
  postCategoryList: [],
  selectedPost: {},
  loading: false
}


export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_POST_LIST:
      return {
        ...state,
        loading: true
      }

    case GET_POST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        postList: action.payload
      }

    case GET_POST:
      return {
        ...state,
        loading: true
      }

    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPost: action.payload
      }

    case GET_POST_CATEGORY_LIST:
      return {
        ...state,
        loading: true
      }

    case GET_POST_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        postCategoryList: action.payload
      }

    case SAVE_OR_UPDATE_POST:
      return {
        ...state,
        loading: true
      }

    case SAVE_OR_UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPost: action.payload
      }

    default:
      return state
  }
}