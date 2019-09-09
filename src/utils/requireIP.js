import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { isValidIp } from './index'
import Loading from '../components/Loading'

import { actions } from '../store/AsyncStorage'

export default function requiresIp(Component) {
  class RequireIP extends React.Component {
    componentDidMount() {
      this.props.getAndCache('@Storage:serverIp')
    }

    componentDidUpdate() {
      const { isLoading, cache } = this.props.AsyncStorage
      const serverIp = cache['@Storage:serverIp']
      if (!isValidIp(serverIp) && !isLoading) {
        // we use resetAction to clear the navigation stack prevent 'back' button from appearing
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ServerInput' })]
        })
        this.props.navigation.dispatch(resetAction)
      }
    }

    render() {
      const { isLoading, cache } = this.props.AsyncStorage
      if (isLoading) return <Loading />
      return cache['@Storage:serverIp'] ? <Component {...this.props} /> : null
    }
  }

  const mapStateToProps = (state) => {
    return {
      AsyncStorage: state.AsyncStorage,
    }
  }

  return connect(mapStateToProps, { ...actions })(RequireIP)
}
