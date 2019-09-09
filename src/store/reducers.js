import { combineReducers, } from 'redux'
import AsyncStorageReducer from './AsyncStorage'
/* import any global reducers here */

/*
injectReducer - used by page routes to inject their reducers into the store.asyncReducers.
store.asyncReducers is then later used by "makeRootReducer" to add each page reducer to any
global reducers you might need
*/
export const injectReducer = (store, { key, reducer, }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

/*
makeRootReducer combines all individual page reducers as well as any global reducers
are returns them to the store. The store uses these combined reducers to create the RootReducer
*/
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    AsyncStorage: AsyncStorageReducer,
    ...asyncReducers,
  })
}

export default makeRootReducer
