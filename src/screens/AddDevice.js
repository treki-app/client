import React, { Component } from 'react';
import AddDeviceForm from '../components/AddDeviceForm';
import HamburgerButton from '../components/HamburgerButton';
import {
  View,
  Image,
  Text
} from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import Drawer from './Home'

class AddDevice extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#0098a7"
    },
    headerTitle: <View style={{flexGrow: 1}}><Image style={{ alignSelf: 'center', height: 45, width: 120}} source={require('../treki_logo_inline_white.png')}/></View>,
    headerRight: <Text></Text>,
    headerTintColor: 'white'
  }

  render() {
    return (
      <View>
        {/* <HamburgerButton navigation={this.props.navigation}/> */}
        <AddDeviceForm deviceId={this.props.navigation.state.params.deviceId}/>
      </View>
    );
  }
}

export default AddDevice;
