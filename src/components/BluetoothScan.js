import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { BleManager, LogLevel } from 'react-native-ble-plx'
import AvailableDevice from './AvailableDevice'

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
      arrAvailable: []
    }
  }

  renderItem = ({item}) => {
    return (
      <AvailableDevice item={item} />
    )
  }

  keyExtractor = (item, index) => `device-${index}`

  scanAndConnect = () => {
    console.log(`Masuk sini !!!`)
    this.manager.setLogLevel(LogLevel.Verbose)
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
          //     this.manager.stopDeviceScan();
        });
      }
    }, true);

  }

  render() {
    return (
      <View>
        <Button
          onPress={ () => {this.scanAndConnect() }}
          title={`Scan Device`}
        />
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
    backgroundColor: 'teal',
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
  }
})

export default BluetoothScan;