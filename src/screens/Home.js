import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, PermissionsAndroid } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BleManager } from 'react-native-ble-plx';
import BackgroundTimer from 'react-native-background-timer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScanDevice from './ScanDevice';
import AddDevice from './AddDevice';
import Maps from '../components/Maps';
import HamburgerButton from '../components/HamburgerButton';
import { loadRegisteredDevices, updateDeviceLocation, LoadTreki, GetLocation } from '../store/treki/treki.action';

class Home extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="track-changes"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
  
  constructor () {
    super()
    this.manager = new BleManager()
    this.state = {
      error: null,
      midPoint: {
        latitude: 0,
        longitude: 0,
        accuracy: 0
      }
    }
  }

  componentWillMount = async () => {
    await this.props.LoadTreki(this.setCoordinate);
  }

  setCoordinate = () => {
    this.props.loadRegisteredDevices();
    BackgroundTimer.setInterval(this.scanAndConnect, 10000);
    this.props.GetLocation(position => this.setState({ midPoint: position }));
  }

  getDeviceLocation = (id) => {
    this.props.GetLocation(location => this.props.updateDeviceLocation({ id, location }))
  }

  scanAndConnect = () => {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.manager.startDeviceScan(null, null , (error, device) => {
          if (error) {
            // console.warn(error, 'error')
            return
          }
          
          if (device) {
            if ( this.props.registeredDevices.indexOf(device.id) !== -1) {
              this.getDeviceLocation(device.id)
              this.manager.stopDeviceScan();
            }
          }        
          subscription.remove();
        });
      }
    }, true);
  }

  render() {
    return (
      <View style={styles.container}>
        <HamburgerButton navigation={ this.props.navigation} />
        <Maps latitude={this.state.midPoint.latitude} longitude={this.state.midPoint.longitude} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.treki.isLoading,
    isError: state.treki.isError,
    devices: state.treki.devices,
    registeredDevices: state.treki.registeredDevices,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadRegisteredDevices,
  updateDeviceLocation,
  LoadTreki,
  GetLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
