/*
App.js is the main file the application is ran from. It is responsible for setting
up any top level wrappers are needed by the entire app (e.x. <Provider> is used to
provide the Redux store)
*/

import React, { Component, } from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import { Provider, connect } from 'react-redux'

import {
  addNavigationHelpers,
} from 'react-navigation'
import {
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'

import Store from './src/store'
import Pages from './src/pages'

const addListener = createReduxBoundAddListener('root')

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

class App extends React.Component {
  render() {
    return (
      <Pages navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    )
  }
}

const AppWithNav = connect(mapStateToProps)(App)

class Root extends Component {
  render() {
    return (
      <Provider store={Store}>
        <AppWithNav />
      </Provider>
    )
  }
}



export default Root
