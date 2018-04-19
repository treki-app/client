import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BluetoothScan from '../components/BluetoothScan';
import AddDeviceForm from '../components/AddDeviceForm';

class AddDevice extends Component {

  static navigationOptions = {
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
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="Hamburger"
        />
        <BluetoothScan/>
        <AddDeviceForm/>
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

export default AddDevice;