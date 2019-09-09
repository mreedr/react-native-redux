import { View, Text, StyleSheet, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

let blue = 'blue'
let red = 'red'
export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: blue,
    justifyContent: 'center',
  },
  textInput: {
    textAlign: 'center',
    width: '100%',
    fontSize: 60,
  },
  error: {
    color: red
  }
})
