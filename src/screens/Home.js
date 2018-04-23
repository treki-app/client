import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ToastAndroid, PermissionsAndroid, TouchableHighlight, Image, FlatList} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BleManager } from 'react-native-ble-plx';
import BackgroundTimer from 'react-native-background-timer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScanDevice from './ScanDevice';
import AddDevice from './AddDevice';
import Maps from '../components/Maps';
import HamburgerButton from '../components/HamburgerButton';
import ListUserDeviceHome from '../components/ListUserDeviceHome';
import Modal from "react-native-modal";
import { loadRegisteredDevices, updateDeviceLocation, LoadTreki, GetLocation } from '../store/treki/treki.action';
import { getUserDevices } from '../store/devices/devices.action';

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
      user_id: ''
    }
  }

  renderItem = ({item}) => {
    return (
      <ListUserDeviceHome item={item} navigation={this.props.navigation}/>
    )
  }

  keyExtractor = (item, index) => `userdevices-${index}`

  componentWillMount = async () => {
    await this.props.LoadTreki(this.setCoordinate);
  }

  componentDidMount () {
    this.setState({
      // user_id: this.props.uid
      user_id: '7iQwnq2sYAYu1hv3DjDL11M5Wkp1'
    }, () => {
      this.props.getUserDevices(this.state.user_id)
    })
    // console.warn(this.state.user_id)
    
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
        <TouchableHighlight style={styles.button} onPress={() => {
          this.setState({isVisible: true})
        }}>  
        <Image style={styles.image}source={require('../treki_logo_circle.png')}/>    
        </TouchableHighlight>
        {/* <ModalList isVisible={this.state.isVisible} /> */}

         <Modal style={styles.modalWrapper} isVisible={this.state.isVisible}>
          <View style={styles.modal}>
            <FlatList 
              contentContainerStyle = { styles.flatList }
              data = { this.props.userDevices }
              renderItem = { this.renderItem }
              keyExtractor = { this.keyExtractor }
            />
            <TouchableHighlight onPress={() => this.setState({isVisible: false})}>
              <Text style={{backgroundColor: 'red'}}>Hide me!</Text>
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
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,
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
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.treki.isLoading,
    isError: state.treki.isError,
    devices: state.treki.devices,
    registeredDevices: state.treki.registeredDevices,
    userDevices: state.devicesReducer.userDevices,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadRegisteredDevices,
  updateDeviceLocation,
  LoadTreki,
  GetLocation,
  getUserDevices
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
