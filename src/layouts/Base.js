import React, { Component, } from 'react'
import { View, StyleSheet, Text, } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // start content at top
    backgroundColor: 'green'
  },
})

export default function(ChildComponent) {
  class Base extends Component {
    static navigationOptions = {
      title: '<fix>',
    }
    render() {
      return (
        <View style={styles.container}>
          <ChildComponent />
        </View>
      )
    }
  }
  return Base
}
