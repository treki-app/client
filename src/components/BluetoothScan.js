import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import { BleManager, LogLevel } from 'react-native-ble-plx'
import AvailableDevice from './AvailableDevice'
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { loadRegisteredDevices } from '../store/treki/treki.action'

class BluetoothScan extends Component {
  constructor () {
    super();
    this.manager = new BleManager()
    this.state = {
      arrOfMacAddress : [
        'F8:A4:2F:5A:36:BB',
        'FF:49:BB:4C:5F:DA',
        'EE:9A:D3:FD:4B:B7',
        'DE:EF:66:D1:9B:B1'
      ],
      arrAvailable: [],
      scanLoading: false
    }
  }

  componentDidMount () {
    this.props.loadRegisteredDevices()
  }

  renderItem = ({item}) => {
    return (
      <AvailableDevice item={item} navigation={this.props.navigation}/>
    )
  }

  keyExtractor = (item, index) => `device-${index}`

  scanAndConnect = () => {
    this.setState({
      scanLoading: true
    })
    console.log(`Masuk sini !!!`)
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.manager.startDeviceScan(null, null , (error, device) => {
          if (error) {
            console.log(error)
            return
          }

          if (device) {
            const checkMacAddress = this.state.arrOfMacAddress.indexOf(device.id)
            const checkAvailable  = this.state.arrAvailable.indexOf(device.id)
            if ( checkMacAddress !== -1 && checkAvailable === -1) {
              this.setState({
                ...this.state,
                arrAvailable:[ ...this.state.arrAvailable, device.id]
              })
            }
          }        
          subscription.remove();
          // this.manager.stopDeviceScan();
        });
      }
    }, true);

  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight style={style.scanButton}
            onPress={ () => {this.scanAndConnect() }}
          >
          <Text style={style.scan}>{"SCAN DEVICES"}</Text>
          </TouchableHighlight>
        </View>
        {(this.state.scanLoading && this.state.arrAvailable.length ===0)? 
        <View style={style.imageContainer}>
        <Image style={style.image} source={ require('../treki_logo_only.png')} />
        <Text style={style.text}>Scanning...</Text>
        </View>
        : null}

        <FlatList 
          contentContainerStyle = { style.flatList }
          data = { this.state.arrAvailable }
          renderItem = { this.renderItem }
          keyExtractor = { this.keyExtractor }
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  flatListItem: {
    padding: 5,
    backgroundColor: '#0098a7',
    margin: 5,
    width: 340,
    alignItems: 'center',
    height: 100
  },
  flatListButton: {
    paddingTop: 25,
    width: 200
  },
  flatLoading: {
    marginTop: 200
  },
  image: {
    width: 80,
    height: 103,
  },
  imageContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color:"#0098a7",
    fontSize: 24,
    fontWeight: '300',
  },
  scan: {
    color:"white",
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center'
  },
  scanButton: {
    backgroundColor: '#006971',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 40,
    // borderWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomColor:'#003d42',
    borderLeftColor: '#003d42',
    borderRightColor: '#003d42'
    // textAlign: 'center'
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadRegisteredDevices
},dispatch)

const mapStateToProps = (state) => {
  return {
    registeredDevices: state.treki.registeredDevices,
    devices: state.treki.devices
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothScan);