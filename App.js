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
import { 
  StackNavigator, 
  DrawerNavigator,
  SwitchNavigator
} from 'react-navigation';
import Register from './src/screens/Register';
import Splash from './src/screens/splashScreen' 
import Home from './src/screens/Home';
import AddDevice from './src/screens/AddDevice';
import ScanDevice from './src/screens/ScanDevice';
import { Provider } from 'react-redux';
import store from './src/store';


export default class App extends Component {
  render() {
    return (
      <Provider store={ store }><RootStack/></Provider>
    );
  }
}


const addDeviceStack = StackNavigator(
  {
    addDevice: {
      path: '/adddevice',
      screen: AddDevice      
    },
    ScanDevice: {
      path: '/scandevice',
      screen: ScanDevice
    },
  },
  {
    initialRouteName: `ScanDevice`,
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
)

const Drawer = DrawerNavigator(
  {
    Home: {
      path: '/',
      screen: Home
    },
    AddDevice: {
      screen: addDeviceStack
    }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
)

const UserAccess = StackNavigator(
  {
    Splash: {
      screen: Splash
    },
    Register: {
      screen: Register
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
)

const RootStack = SwitchNavigator(
  {
    UserAccess: {
      screen: UserAccess
    },
    Home: {
      screen: Drawer
    }
  },
  {
    initialRouteName: 'UserAccess',
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
)
