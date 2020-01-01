import { GET_TINY_URL, GET_TINY_URL_SUCCESS } from '../../constants/ActionTypes'

export const getTinyURL = originalURL => ({
  type: GET_TINY_URL,
  payload: originalURL
})

export const getTinyURLSuccess = tinyURL => ({
  type: GET_TINY_URL_SUCCESS,
  payload: tinyURL
})
