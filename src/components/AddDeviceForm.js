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
import { saveNewDevice } from '../store/treki/treki.action'

class AddDeviceForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newDevice: {
        name: ``,
        device_id: ``,
        image_url: ``,
        user_id: `-LARdlvlVYAZd_HlbxSS`,
        location: {
          accuracy: null,
          latitude: null,
          longitude: null,
        }
      },
      error: null,
      position: null,
    }
  }

  getLocation = async () => {
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
            this.setState({
              ...this.state,
              newDevice: {
                ...this.state.newDevice,
                device_id: this.props.deviceId,
                location: {
                  accuracy: position.coords.accuracy,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }
              },
              error: null,
              position
            });
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

  componentDidMount () {
    this.getLocation()
  }

  addDevice () {
    const theNewDevice = this.state.newDevice
    this.props.saveNewDevice(theNewDevice)
      .then(() => {
        ToastAndroid.show('Your Device Has Been Added', ToastAndroid.SHORT)
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
          - Position : ${this.state.position},
          - Error : ${this.state.error}, 
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveNewDevice
}, dispatch)

export default connect(null, mapDispatchToProps)(AddDeviceForm);
