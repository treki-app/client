import React, { Component } from 'react';
import AddDeviceForm from '../components/AddDeviceForm';
import HamburgerButton from '../components/HamburgerButton';
import {
  View
} from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import Drawer from './Home'

class AddDevice extends Component {
  render() {
    return (
      <View>
        <HamburgerButton navigation={this.props.navigation}/>
        <AddDeviceForm />
      </View>
    );
  }
}

export default AddDevice;
