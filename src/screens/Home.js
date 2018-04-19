import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Maps from '../components/Maps';
import BluetoothScan from '../components/BluetoothScan';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BluetoothScan/>
        <Maps/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
})

export default Home;