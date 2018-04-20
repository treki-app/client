import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ToastAndroid
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
          <Button
            title={this.props.item}
            color="#ff6600"
            onPress={ () => { this.checkRegisteredDevice(this.props.item) }}
          />
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
    width: 200
  }
})

const mapStateToProps = (state) => {
  return {
    registeredDevices: state.treki.registeredDevices
  }
}

export default connect(mapStateToProps, null)(AvailableDevice);