// mock redux store
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// mock endpoints
import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
let axiosMock = new AxiosMock(axios)

import {
  // all action types
  SERVER_INPUT__SET_SERVER_IP,
  SERVER_INPUT__SET_INPUT_TEXT,
  SERVER_INPUT__SET_ERROR,
  // all our actions
  actions,
  // all reducers
  REDUCERS,
} from './modules'

// all actions
const {
  setTextInputVal,
  setErrorMessage,
  setServerIp,
} = actions

const validIp = '192.168.1.1'
const invalidIp = '19216811'

// need to use 'function' instead of arrow function to allow access to 'this'
describe('ServerInput', () => {
  it('should be implementeddd', () => {

  })
})

// it('creates SERVER_INPUT__SET_SERVER_IP when valid ip is given', async () => {
//   const expectedActions = [
//     { type: SERVER_INPUT__SET_SERVER_IP, payload: validIp },
//   ]
//
//   const store = mockStore({})
//   await store.dispatch(saveServerIp(validIp))
//   expect(store.getActions()).toEqual(expectedActions)
// })


// // reset axios mock routes after each test
// afterEach(() => {
//   axiosMock.reset()
//   axiosMock.restore()
// })
//
// //   // fetchMock creates a fake enpoint that will return data to our actions
// //   axiosMock
// //     .onGet('https://api.coinmarketcap.com/v1/ticker/?limit=10')
// //     .reply(200, [{ id: 'bitcoin', }])
