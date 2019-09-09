export default (name) => {
  const uppercaseName = name.toUpperCase()
  return `
/*
This file acts as a single place to place a page's actions and reducers. I find this much
cleaner since all the related files will be next to one another
*/

// Action types (these are global and shoudln't be reused from other pages)
export const ${uppercaseName}__MY_ACTION = '$uppercaseName}__MY_ACTION'

// Plain Actions
function myPlainAction(arg) {
  return { type: ${uppercaseName}__MY_ACTION, payload: arg }
}

// Thunk Actions (async actions)
// NOTE: do NOT use inline actions, ALWAYS call a plain action to dispatch
function myAsyncAction(data) {
  return async(dispatch) => {
    // this is a timeout wrapped in a promise to mock an async operation
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(myPlainAction(data))
        resolve()
      }, 1000)
    })
  }
}

// any actions you may need in your component needs to be exported here
export const actions = {
  myPlainAction,
  myAsyncAction
}

// Reducers
export const REDUCERS = {
  [${uppercaseName}__MY_ACTION]: (state, action) => {
    return {
      ...state,
    }
  },
}

// initial state
const initialState = {
}

// when an action gets dispatched callReducer will invoke the reducer that corresponds
// to the actions "type" (e.x. FETCHING_COIN_DATA_SUCCESS)
export default function callReducer(state = initialState, action) {
  const handler = REDUCERS[action.type]
  return handler ? handler(state, action) : state
}

`
}
