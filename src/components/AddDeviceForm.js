import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveNewDevice, GetLocation } from '../store/treki/treki.action'

class AddDeviceForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newDevice: {
        name: ``,
        device_id: ``,
        image_url: ``,
        user_id: this.props.uid,
        location: {
          accuracy: null,
          latitude: null,
          longitude: null,
        }
      },
      error: null,
    }
  }

  componentDidMount = () => this.props.GetLocation(location => this.setState({
    ...this.state,
    newDevice: {
      ...this.state.newDevice,
      device_id: this.props.deviceId,
      location
    },
  }));
  
  addDevice () {
    const { navigation } = this.props
    const theNewDevice = this.state.newDevice
    this.props.saveNewDevice(theNewDevice)
      .then(() => {
        ToastAndroid.show('Your Device Has Been Added', ToastAndroid.SHORT)
        navigation.navigate('Home')
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  render() {
    return (
      <View>
        <Text>
          {` Hellow ${this.state.newDevice.device_id}`}
        </Text>
        <Text>
          {` 
          - Accuracy : ${this.state.newDevice.location.accuracy}
          - Latitude : ${this.state.newDevice.location.latitude} ,
          - Longitude : ${this.state.newDevice.location.longitude},
          - Error : ${this.state.error},
          - UserId : ${this.state.newDevice.user_id}
          `}
        </Text>
        <TextInput
          onChangeText={(name) => this.setState({
            ...this.state,
            newDevice: {
              ...this.state.newDevice,
              name: name
            }
          })}
          value={this.state.name}
          placeholder={`Your Stuff Name..`}
          underlineColorAndroid={"green"}
        />
        <TextInput
          onChangeText={(image_url) => this.setState({
            ...this.state,
            newDevice: {
              ...this.state.newDevice,
              image_url: image_url
            }
          })}
          value={this.state.image_url}
          placeholder={`Some Image URL...`}
          underlineColorAndroid={"green"}
        />
        <Button 
          title={"Add Device"}
          onPress={() => { this.addDevice() }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.userReducer.uid
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveNewDevice,
  GetLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceForm);
