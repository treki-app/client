import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BluetoothScan from '../components/BluetoothScan';
import HamburgerButton from '../components/HamburgerButton';

class ScanDevice extends Component {

  static navigationOptions = {
    header: null,
    drawerLabel: 'Add Device',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="library-add"
          size={24}
          style={{color: tintColor}} 
        >
        </MaterialIcons>
      );
    }
  }

  render() {
    return (
      <View>
        <HamburgerButton navigation={this.props.navigation}/>
        <BluetoothScan navigation={this.props.navigation}/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

export default ScanDevice;