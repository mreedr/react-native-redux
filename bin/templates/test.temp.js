export default (name) => {
  const uppercaseName = name.toUpperCase()
  return `
// mock redux store
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import {
  // all action types
  ${uppercaseName}__MY_ACTION,
  // all our actions
  actions,
} from './modules'

// all actions
const {
  myPlainAction,
  myAsyncAction
} = actions

describe('${uppercaseName}', () => {
  it('creates ${uppercaseName}__MY_ACTION with plain action', async () => {
    const expectedActions = [ { type: ${uppercaseName}__MY_ACTION, payload: 'test' } ]
    const store = mockStore({})
    await store.dispatch(myPlainAction('test'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates ${uppercaseName}__MY_ACTION with async action', async () => {
    const expectedActions = [ { type: ${uppercaseName}__MY_ACTION, payload: 'test' } ]
    const store = mockStore({})
    await store.dispatch(myAsyncAction('test'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
`
}
