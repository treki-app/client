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
  View,
  Image
} from 'react-native';
import { 
  StackNavigator, 
  DrawerNavigator,
  SwitchNavigator,
  DrawerItems
} from 'react-navigation';
import Register from './src/screens/Register';
import Splash from './src/screens/splashScreen' 
import Home from './src/screens/Home';
import AddDevice from './src/screens/AddDevice';
import ScanDevice from './src/screens/ScanDevice';
import UserDevices from './src/screens/UserDevices';
import UserDetailDevice from './src/screens/UserDetailDevice';
import Logout from './src/screens/Logout';
import { Provider } from 'react-redux';
import store from './src/store';


export default class App extends Component {
  render() {
    return (
      <Provider store={ store }><RootStack/></Provider>
    );
  }
}


const CustomDrawerContentComponent = (prop) => {
  return (
    <View style={{flex: 1}}>
      <View style={{paddingBottom: 20, paddingTop:10, borderBottomColor: 'rgba(255, 255, 255, 0.4)', borderBottomWidth: 1, alignItems: 'center'}}>
        <Image style={{height: 50, width: 130}} source={require('./src/treki_logo_inline_white.png')} />
        <Text style={{fontSize: 15, fontWeight: '300', marginTop: 20, color: '#fff', alignSelf:'flex-start', paddingLeft:20}}> Account: </Text>
        <Text style={{fontSize: 20, fontWeight: '600', marginTop: 3, color: '#fff', alignSelf:'flex-start', paddingLeft:20}}> {store.getState().userReducer.email} </Text>
      </View>
      <DrawerItems {...prop} />
    </View>
  )
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
    // navigationOptions: ({ navigation }) => ({
    //   header: null
    // })
  }
)

const listDeviceStack = StackNavigator(
  {
    listUserDevices: {
      path:'/listdevice',
      screen: UserDevices
    },
    detailDevice: {
      path:'/detaildevice',
      screen: UserDetailDevice
    }
  },
  {
    initialRouteName: `listUserDevices`,
    headerMode: 'screen',
  }
)


const LogoutNav = SwitchNavigator(
  {
    Logout: {
      screen: Logout
    }
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
    },
    UserDevices: {
      screen: listDeviceStack
    },
    Logout: {
      screen: LogoutNav
    }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerBackgroundColor: "#0098a7",
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      // activeBackgroundColor: "#02cee5",
      activeBackgroundColor: "white",
      // activeTintColor: "#00363a",
      activeTintColor: "#006971",
      inactiveTintColor: "white"
    }
  }
)

const UserAccess = SwitchNavigator(
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
    initialRouteName: 'Home',
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
)
