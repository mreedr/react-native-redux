/*
This file acts as a single place to place a page's actions and reducers. I find this much
cleaner since all the related files will be next to one another
*/
import axios from 'axios'
import { apiBaseUrl, } from '../../constants/urls'
import { AsyncStorage } from 'react-native'

import { isValidIp } from '../../utils'

// Action types (these are global and shoudln't be reused from other pages)
export const SERVER_INPUT__SET_INPUT_TEXT = 'SERVER_INPUT__SET_INPUT_TEXT'
export const SERVER_INPUT__SET_ERROR = 'SERVER_INPUT__SET_ERROR'
export const SERVER_INPUT__SET_IS_LOADING = 'SERVER_INPUT__SET_IS_LOADING'

// Plain Actions
function setTextInputVal(text) {
  return { type: SERVER_INPUT__SET_INPUT_TEXT, payload: text }
}

function setErrorMessage(err) {
  return { type: SERVER_INPUT__SET_ERROR, payload: err }
}

function setIsLoading(isLoading) {
  return { type: SERVER_INPUT__SET_IS_LOADING, payload: isLoading }
}

// Thunk Actions
// NOTE: do NOT use inline actions, ALWAYS call a plain action to dispatch

// WARNING: if you do not export your actions, they will not be available in the component
export const actions = {
  setTextInputVal,
  setErrorMessage,
  setIsLoading,
}

// Reducers
export const REDUCERS = {
  [SERVER_INPUT__SET_INPUT_TEXT]: (state, action) => {
    return {
      ...state,
      inputText: action.payload,
      hasError: false,
      errorMessage: null,
    }
  },
  [SERVER_INPUT__SET_IS_LOADING]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload
    }
  },
  [SERVER_INPUT__SET_ERROR]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      hasError: true,
      errorMessage: action.payload,
    }
  },
}

// initial state
const initialState = {
  serverIp: null,
  inputText: '',
  hasError: false,
  errorMessage: null,
  isLoading: false,
}

// when an action gets dispatched callReducer will invoke the reducer that corresponds
// to the actions "type" (e.x. FETCHING_COIN_DATA_SUCCESS)
export default function callReducer(state = initialState, action) {
  const handler = REDUCERS[action.type]
  return handler ? handler(state, action) : state
}
