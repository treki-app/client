import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ToastAndroid,
  TouchableHighlight,
  Text,
  Image
} from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class AvailableDevice extends Component {

  checkRegisteredDevice = (deviceId) => {
    const { navigation } = this.props
    const checkRegistered = this.props.registeredDevices.indexOf(deviceId)

    if (checkRegistered == -1) {
      navigation.navigate('addDevice', { deviceId: deviceId})
    } else {
      ToastAndroid.show('This device already registered', ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <View style={ style.flatListItem }>
        <View style={ style.flatListButton }>
          <TouchableHighlight 
            style={{borderRadius: 10}}
            onPress={ () => { this.checkRegisteredDevice(this.props.item) }}
            underlayColor="rgba(255,255,255,0.2)">
            <View style={style.button}>
              <Image style={style.image} source={ require('../treki_logo_background_white.png')} />
              <View>
                <Text style={style.titleText}>{"Treki Device"}</Text>
                <Text style={style.textButton}>{"Device ID "}</Text>
                <Text style={style.textButton}>{this.props.item}</Text>
              </View>
            </View>
          </TouchableHighlight>
          {/* <Button
            title={"Device ID: "+ this.props.item}
            color="white"
            onPress={ () => { this.checkRegisteredDevice(this.props.item) }}
          /> */}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  flatListButton: {
    paddingTop: 25,
    // width: 200
  },
  button: {
    backgroundColor: '#0098a7',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  textButton: {
    color: 'white'
  },
  image: {
    width: 60,
    height: 70,
    // marginVertical: 5,
    // marginHorizontal: 5,
    marginRight: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    registeredDevices: state.treki.registeredDevices
  }
}

export default connect(mapStateToProps, null)(AvailableDevice);