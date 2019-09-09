import React, { Component, } from 'react'
import { StackNavigator, } from 'react-navigation'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

import { injectReducer } from '../store/reducers'
import Store from '../store'
import requireIp from '../utils/requireIP'

import ServerInput from './ServerInput'
import Equipment from './Equipment'

/*
each "page" uses react-navigation, so see their docs if you need to make
any navigation changes
*/
const Router = StackNavigator({
  Equipment: {
    screen: Equipment([ requireIp ])
  },
  ServerInput: {
    screen: ServerInput([ ])
  },
}, {
  initialRouteName: 'Equipment',
})

const initialState = Router.router.getStateForAction(
  Router.router.getActionForPathAndParams('Equipment')
)
const navReducer = (state = initialState, action) => {
  const nextState = Router.router.getStateForAction(action, state)
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
injectReducer(Store, { key: 'nav', reducer: navReducer })

export default Router
