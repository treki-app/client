import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ToastAndroid,
  PermissionsAndroid
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScanDevice from './ScanDevice';
import AddDevice from './AddDevice';
import Maps from '../components/Maps';
import HamburgerButton from '../components/HamburgerButton';
import { BleManager } from 'react-native-ble-plx';
import { 
  loadRegisteredDevices,
  updateDeviceLocation
} from '../store/treki/treki.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

class Home extends Component {
  constructor () {
    super()
    this.manager = new BleManager()
    this.state = {
      location: {
        accuracy: null,
        latitude: null,
        longitude: null,
      },
      error: null
    }
  }

  componentDidMount () {
    this.props.loadRegisteredDevices()
    BackgroundTimer.setInterval(this.scanAndConnect, 10000)
  }


  getLocation = async (id) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Treki Location Permission',
          'message': `Just wanna know your location`
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
            let objLocation = {
              accuracy: position.coords.accuracy,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }

            let objUpdate = {
              id: id,
              location: objLocation
            }

            console.warn(`=====> New Location ${JSON.stringify(objUpdate.location)}`)
            this.props.updateDeviceLocation(objUpdate)
          },
          (error) => this.setState({ error: error.message })
        );
      } else {
        ToastAndroid.show("Location permission denied", ToastAndroid.SHORT)
      }

    } catch(err) {
      ToastAndroid.show(`ERROR : ${err}`, ToastAndroid.SHORT)
    }
  }

  scanAndConnect = () => {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.manager.startDeviceScan(null, null , (error, device) => {
          if (error) {
            console.log(error)
            return
          }

          if (device) {
            const checkRegisteredDevices = this.props.registeredDevices.indexOf(device.id)
            if ( checkRegisteredDevices !== -1) {
              this.getLocation(device.id)
              this.manager.stopDeviceScan();
            }
          }        
          subscription.remove();
        });
      }
    }, true);
  }

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

  render() {
    return (
      <View style={styles.container}>
        <HamburgerButton navigation={ this.props.navigation} />
        <Maps/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
})

const mapStateToProps = (state) => {
  return {
    registeredDevices: state.treki.registeredDevices
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadRegisteredDevices,
  updateDeviceLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
