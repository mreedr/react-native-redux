import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { View, Text, TextInput, Button } from 'react-native'

// import our reducers and actions to 'connect' them with redux
import reducer, { actions } from './modules'

import { Loading } from '../../components'
import Store from '../../store'
import { composeComponent, isValidIp } from '../../utils'
import { injectReducer, } from '../../store/reducers'

const AsyncStorageActions = require('../../store/AsyncStorage').actions

import styles from './styles'

class ServerInput extends Component {
  static navigationOptions = {
    title: 'Enter IP Address',
  }

  goToEquipmentPage() {
    // we use resetAction to empty the navigation stack prevent 'back' button from appearing
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Equipment' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentDidUpdate() {
    const { hasError, cache } = this.props.AsyncStorage
    if (!hasError && isValidIp(cache['@Storage:serverIp'])) {
      this.goToEquipmentPage()
    }
  }

  onSave() {
    const { inputText } = this.props.ServerInput
    if (!isValidIp(inputText)) return this.props.setErrorMessage('invalid ip address')
    this.props.setAndCache('@Storage:serverIp', inputText)
  }

  renderErrors() {
    const { hasError, errorMessage } = this.props.ServerInput
    if (hasError || this.props.AsyncStorage.hasError) {
      const errorMessages = [ this.props.AsyncStorage.errorMessage, errorMessage ]
      return (
        <View>
          { errorMessages.map((errMsg, i) => (<Text key={i}>{errMsg}</Text>)) }
        </View>
      )
    }
    return null
  }

  render() {
    const { inputText, isLoading } = this.props.ServerInput
    const serverIp = this.props.AsyncStorage.cache['@Storage:serverIp']

    if (this.props.AsyncStorage.isLoading || isLoading) return <Loading />

    return (
      <View style={styles.container}>
        <Text>Server Ip: { serverIp }</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Server IP'
          onChangeText={this.props.setTextInputVal}
        />
        <Button
          onPress={this.onSave.bind(this)}
          title='Save'
          color='#841584'
          accessibilityLabel='Save Server IP Address'
        />
        { this.renderErrors() }
      </View>
    )
  }
}
// mapDispatchToProps is an object with all actions we want to be available through redux
const mapDispatchToProps = { ...actions, ...AsyncStorageActions }
// mapStateToProps retreives any state variables (from any page) that we might need
function mapStateToProps(state) {
  return {
    ServerInput: state.ServerInput,
    AsyncStorage: state.AsyncStorage
  }
}
// injectReducer injects this page's reducers into the global reducer
injectReducer(Store, { key: 'ServerInput', reducer, })
// calling 'connect' glues this component to redux with the given mappings
ServerInput = connect(mapStateToProps, mapDispatchToProps)(ServerInput)
// composeComponent will add any higher order components that we specify in the router
export default composeComponent(ServerInput)
