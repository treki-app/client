import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, PermissionsAndroid, TouchableHighlight, Image, FlatList, ScrollView} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BleManager } from 'react-native-ble-plx';
import BackgroundTimer from 'react-native-background-timer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScanDevice from './ScanDevice';
import AddDevice from './AddDevice';
import Maps from '../components/Maps';
import HamburgerButton from '../components/HamburgerButton';
import ListUserDevice from '../components/user_devices/ListUserDevices';
import Modal from "react-native-modal";
import { loadRegisteredDevices, updateDeviceLocation, LoadTreki, GetLocation } from '../store/treki/treki.action';
import { getUserDevices } from '../store/devices/devices.action';
import { updateTokenDevice } from '../store/user/user.action';
import { NotificationsAndroid } from 'react-native-notifications';

const userDeviceToken = ``

NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
  console.warn('Push-notifications registered!', deviceToken)
  userDeviceToken = deviceToken
});

NotificationsAndroid.setNotificationReceivedListener((notification) => {
	console.warn("Notification received on device", notification.getData());
});
NotificationsAndroid.setNotificationOpenedListener((notification) => {
	console.warn("Notification opened by device user", notification.getData());
});

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
      },
      isVisible: false,
      user_id: '',
      collectable: null,
      detailLocation: null,
      detailDevices: null
    }
  }

  renderItem = ({item}) => {
    console
    return (
      <ListUserDevice item={item} navigation={this.props.navigation} off={true}/>
    )
  }

  keyExtractor = (item, index) => `userdevices-${index}`

  componentWillMount = async () => {
    await this.props.LoadTreki(this.setCoordinate);
  }
  
  componentDidMount () {
    this.props.updateTokenDevice(this.props.uid, userDeviceToken)
    // console.warn(`==> userId: ${this.props.uid}, ==> userDeviceToken ${userDeviceToken}`)
    console.warn('collet'+JSON.stringify(this.props.collectableDevices))
    console.warn("dev"+JSON.stringify(this.props.collectableDevices.map(devices => {
      let filtered =  devices.devices.filter(device => device.user_id == this.props.uid)
      return {location: devices.location, devices: filtered}
    }).filter(device => device.devices.length > 0)))
   
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


  componentWillUnmount () {
    this.setState({
      isVisible: false
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <HamburgerButton navigation={ this.props.navigation} />
        <Maps
          latitude={this.state.midPoint.latitude}
          longitude={this.state.midPoint.longitude}
          userLatitude={this.state.midPoint.latitude}
          userLongitude={this.state.midPoint.longitude}
          home={true}
          devices={this.props.collectableDevices.map(devices => {
            let filtered =  devices.devices.filter(device => device.user_id == this.props.uid)
            return {location: devices.location, devices: filtered}
            }).filter(device => device.devices.length > 0)} 
              modalActive={(location) => {
              this.setState({
                isVisible: true,
                detailLocation: location
              }, () => {
                let temp = this.props.collectableDevices.filter(val => (val.location.latitude === this.state.detailLocation.latitude) && (val.location.longitude === this.state.detailLocation.longitude))
                console.warn('temp', temp)
                this.setState({
                  detailDevices: temp[0].devices
                }, () => {
                  console.warn('detail', JSON.stringify(this.state.detailDevices))
                })
              })
          }}/>  
          {/* devices={this.props.devices.filter(device => device.user_id == this.props.uid)} /> */}
        {/* <ModalList isVisible={this.state.isVisible} /> */}

         <Modal style={styles.modalWrapper} isVisible={this.state.isVisible}>
          <View style={styles.modal}>
            <FlatList 
              contentContainerStyle = { styles.flatList }
              data = { this.state.detailDevices }
              renderItem = { this.renderItem }
              keyExtractor = { this.keyExtractor }
            />
            <TouchableHighlight style={{justifyContent: 'center', alignItems: 'center', width:80, height:80, borderRadius:40}} onPress={() => this.setState({isVisible: false})}>
              <Image source={require('../exit.png')} style={styles.exit}/>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  button: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    width: 63,
    height: 63,
    borderRadius: 31.5,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems:'center',
    // justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: '#0098a7',
    borderRadius: 30
  },
  modal: {
    // backgroundColor: 'white',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 10,
    width: "100%",
    height: 400
  },
  modalWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  flatList: {
    alignItems: 'center'
  },
  exit: {
    width: 50,
    height: 50
  }
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.treki.isLoading,
    isError: state.treki.isError,
    devices: state.treki.devices,
    registeredDevices: state.treki.registeredDevices,
    userDevices: state.devicesReducer.userDevices,
    uid: state.userReducer.uid,
    collectableDevices: state.treki.collectableDevices
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadRegisteredDevices,
  updateDeviceLocation,
  LoadTreki,
  GetLocation,
  getUserDevices,
  updateTokenDevice
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
