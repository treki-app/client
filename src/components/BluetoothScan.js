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
import * as Animatable from 'react-native-animatable';

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
    if(!this.state.scanLoading && this.state.arrAvailable.length === 0)
      return (
        <View style={{alignItems: 'center', marginTop: '30%'}}>
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <View style={style.outer}>
              <TouchableHighlight 
                style={style.scanButton}
                onPress={ () => {this.scanAndConnect() }}
                underlayColor="#017782">
                  <View>
                  <Text style={style.scan}>{"SCAN"}</Text>
                  <Text style={style.scan}>{"DEVICES"}</Text>
                  </View>
              </TouchableHighlight>
            </View>
          </Animatable.View>
      </View>
      )
    else if (this.state.scanLoading && this.state.arrAvailable.length ===0) 
      return (
        <View style={{alignItems: 'center', marginTop: '15%'}}>
        <View style={style.imageContainer}>
        <Image style={style.image} source={ require('../scan.gif')} />
        <Text style={style.text}>Scanning...</Text>
        </View>
        </View>
      )
    else
    return (
      <View style={{alignItems: 'center'}}>
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
    width: 200,
    height: 200,
  },
  imageContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color:"#0098a7",
    fontSize: 35,
    fontWeight: '600',
    fontFamily: 'Roboto'
  },
  scan: {
    color:"white",
    fontSize: 40,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  scanButton: {
    // backgroundColor: '#006971',
    // paddingHorizontal: 30,
    // paddingVertical: 10,
    // borderRadius: 40,
    // // borderWidth: 2,
    // borderBottomWidth: 2,
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    // borderBottomColor:'#003d42',
    // borderLeftColor: '#003d42',
    // borderRightColor: '#003d42'
    // // textAlign: 'center'
    backgroundColor: '#006971',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    // borderWidth: 50,
    // borderColor: "#0098a7"
  },
  outer: {
    backgroundColor: '#0098a7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 330,
    borderRadius: 165,
    // marginTop: '30%',
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