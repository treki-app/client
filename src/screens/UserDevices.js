import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserDevicesHome from '../components/user_devices/UserDevicesHome';

class UserDevices extends Component {

  static navigationOptions = {
    drawerLabel: 'My Devices',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="devices"
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
        <UserDevicesHome navigation={this.props.navigation}/>
      </View>
    );
  }
}

export default UserDevices;
