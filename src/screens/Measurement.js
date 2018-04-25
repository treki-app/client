import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { StackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

export default class componentName extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#0098a7"
    },
    headerTitle: <View style={{flexGrow: 1}}><Image style={{ alignSelf: 'center', height: 45, width: 120}} source={require('../treki_logo_inline_white.png')}/></View>,
    headerRight: <Text></Text>,
    headerTintColor: 'white'
  }
  
  constructor (props) {
    super (props)
    const { deviceId } = this.props.navigation.state.params
    this.manager = new BleManager()
    this.state = {
      distance: ``,
      device_id: deviceId,
      message: `Looking for your device`,
      checkFound: false
    }
  }

  componentDidMount () {
    this.scanAndConnect()
    setTimeout(() => {
      this.checkDeviceFound()
    }, 8000)
  }

  checkDeviceFound () {
    // console.warn(`Checking Device...`)
    if (this.state.distance) {
      this.setState({
        checkFound: true
      })
    } else {
      this.setState({
        checkFound: false,
        message: `Your device is way too far`
      })
      this.manager.stopDeviceScan()
    }
  }

  calculateDistance(rssi) {
    var txPower = -59 
    
    if (rssi == 0) {
      this.setState({
        distance: -1.0
      }); 
    }
  
    var ratio = rssi*1.0/txPower;

    if (ratio < 1.0) {
      let newDistance = Math.pow(ratio,10);
      this.setState({
        distance: newDistance.toFixed(2)
      })
    }
    else {
      let newDistance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;    
      this.setState({
        distance: newDistance.toFixed(2)
      })
    }
  }

  scanAndConnect = () => {
    console.warn('Scan And Connect Triggered')
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.manager.startDeviceScan(null, null , (error, device) => {

          if (error) {
            return
          }
          
          if (device) {            
            // console.warn(JSON.stringify(device.id))
            if ( device.id === this.state.device_id ) {
              console.warn('Terdeteksi')
              this.calculateDistance(device.rssi)
            }
          }

          subscription.remove();
        });
        // this.manager.readRSSIForDevice({deviceIdentifier: this.state.device_id})
        //   .then(device => {
        //     // console.warn(device)
        //   })
      }
    }, true);
  }

  componentWillUnmount () {
    this.manager.stopDeviceScan()
  }

  render() {
    const { deviceName } = this.props.navigation.state.params
    return (
      <View style={style.outer} >
        <Animatable.View style={style.outer2} animation="pulse" easing="ease-out-sine" iterationCount="infinite" delay={60}>
          <Animatable.View style={style.outer3} animation="pulse" easing="ease-out-sine" iterationCount="infinite" delay={30}>
            <Animatable.View style={style.outer4} animation="pulse" easing="ease-out-sine" iterationCount="infinite">
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
        <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', flex:1}}>
          <Text style={style.title}> { deviceName }  </Text>
          { this.state.checkFound
            ? <Animatable.Text style={style.distance} animation="pulse" easing="ease-out" > { `${this.state.distance} m` }</Animatable.Text>
            : <Text style={style.distance2}> { this.state.message }</Text> 
          }
        </View>
      </View>
              
    )
  }
}

const style = StyleSheet.create({
  outer: {
    backgroundColor: '#004e54',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  outer2: {
    backgroundColor: '#006971',
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
    height: 600,
    borderRadius: 300
  },
  outer3: {
    backgroundColor: '#0098a7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    height: 450,
    borderRadius: 225
  },
  outer4: {
    backgroundColor: '#00afc4',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 150
  },
  title: {
    color: 'white',
    fontSize: 40,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    paddingBottom: 7,
  },
  distance: {
    color: 'white',
    fontSize: 70,
    fontWeight: '600',
    paddingTop: 7,
  },
  distance2: {
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 30,
    fontWeight: '400',
    paddingTop: 7,
    width: 250,
    textAlign: 'center'
  }
})