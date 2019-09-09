export default (name) => {
  return `
import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Store from '../../store'
import { composeComponent } from '../../utils'
import { injectReducer, } from '../../store/reducers'
// we import all the exports from the modules folder for our actions and reducer
import reducer, { actions, } from './modules'

class ${name} extends Component {
  static navigationOptions = {
    title: '${name}',
  }

  render() {
    return (
      <View>
        <Text>THIS IS THE ${name} PAGE</Text>
      </View>
    )
  }
}

const mapDispatchToProps = { ...actions }
function mapStateToProps(state) {
  return {
    ${name}: state.${name},
  }
}
injectReducer(Store, { key: '${name}', reducer, })
${name} = connect(mapStateToProps, mapDispatchToProps)(${name})
export default composeComponent(${name})
`
}
