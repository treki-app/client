/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import AddDevice from './src/screens/AddDevice';
import { Provider } from 'react-redux';
import store from './src/store/store'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }><RootStack/></Provider>
    );
  }
}

const RootStack = StackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
)
