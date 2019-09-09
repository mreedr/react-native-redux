import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Store from '../../store'
import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// we import all the exports from the modules folder for our actions and reducer
import reducer, { actions, } from './modules'

class Equipment extends Component {
  static navigationOptions = {
    title: 'Equipment',
  }

  render() {
    return (
      <View>
        <Text>THIS IS THE EQUIPMENT PAGE {this.props.serverIp}</Text>
      </View>
    )
  }
}

const mapDispatchToProps = { ...actions }
function mapStateToProps(state) {
  return {
    Equipment: state.Equipment,
    serverIp: state.AsyncStorage.cache['@Storage:serverIp'],
  }
}
injectReducer(Store, { key: 'Equipment', reducer, })
Equipment = connect(mapStateToProps, mapDispatchToProps)(Equipment)
export default composeComponent(Equipment)
