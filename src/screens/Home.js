import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BluetoothScan from '../components/BluetoothScan'

class Home extends Component {
  render() {
    return (
      <View>
        <BluetoothScan/>
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

export default Home;