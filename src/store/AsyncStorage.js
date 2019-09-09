/*
This file acts as a single place to place a page's actions and reducers. I find this much
cleaner since all the related files will be next to one another
*/
import axios from 'axios'
// import { apiBaseUrl, } from '../../constants/urls'
import { AsyncStorage } from 'react-native'
import { isValidIp } from '../utils'

// Action types (these are global and shoudln't be reused from other pages)
// naming convention <PAGE_NAME>__<ACTION_NAME>
export const ASYNC_STORAGE__SET_ERROR = 'ASYNC_STORAGE__SET_ERROR'
export const ASYNC_STORAGE__CACHE_VALUE = 'ASYNC_STORAGE__CACHE_VALUE'
export const ASYNC_STORAGE__SET_IS_LOADING = 'ASYNC_STORAGE__SET_IS_LOADING'

// Helper Actions (these don't get exported and shouldn't be called by any other file)
function setError(errorMessage) {
  return { type: ASYNC_STORAGE__SET_ERROR, payload: errorMessage }
}
function cacheValue(key, value) {
  return { type: ASYNC_STORAGE__CACHE_VALUE, payload: { key, value } }
}
function setIsLoading(isLoading) {
  return { type: ASYNC_STORAGE__SET_IS_LOADING, payload: isLoading }
}

// Plain Actions

// Thunk Actions
// NOTE: do NOT use inline actions, ALWAYS call a plain action to dispatch

// getting things from AsyncStorage will cache values as the key
function getAndCache(key) {
  return async(dispatch) => {
    dispatch(setIsLoading(true))
    try {
      setTimeout(async() => {
        const storedValue = await AsyncStorage.getItem(key)
        dispatch(cacheValue(key, storedValue))
      }, 3000)
    } catch (e) {
      dispatch(setError(e.message))
    }
  }
}

function setAndCache(key, val) {
  return async dispatch => {
    dispatch(setIsLoading(true))
    try {
      setTimeout(async() => {
        await AsyncStorage.setItem(key, val)
        dispatch(cacheValue(key, val))
      }, 6000)
    } catch (e) {
      dispatch(setError(e.message))
    }
  }
}

// any actions you may need in your component needs to be exported here
export const actions = {
  getAndCache,
  setAndCache
}

// Reducers
export const REDUCERS = {
  [ASYNC_STORAGE__CACHE_VALUE]: (state, action) => {
    const { key, value } = action.payload
    return {
      ...state,
      cache: { [key]: value, },
      isLoading: false,
      hasError: false,
      errorMessage: null,
    }
  },
  [ASYNC_STORAGE__SET_IS_LOADING]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload,
      hasError: false,
      errorMessage: null
    }
  },
  [ASYNC_STORAGE__SET_ERROR]: (state, action) => {
    return {
      ...state,
      hasError: true,
      errorMessage: action.payload
    }
  },
}

// initial state
const initialState = {
  cache: {}, // hold cache in it's own object in case we need to clear it
  hasError: false,
  isLoading: false,
  errorMessage: null
}

// when an action gets dispatched callReducer will invoke the reducer that corresponds
// to the actions "type" (e.x. FETCHING_COIN_DATA_SUCCESS)
export default function callReducer(state = initialState, action) {
  const handler = REDUCERS[action.type]
  return handler ? handler(state, action) : state
}
