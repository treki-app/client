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

class AddDeviceForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ``,
      image_url: ``,
      latitude: null,
      longitude: null,
      error: null,
      position: null
    }
  }

  getLocation = async () => {
    try {
      // ToastAndroid.show(`Masuk sini !!`, ToastAndroid.SHORT)
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Treki Location Permission',
          'message': `Just wanna know your location`
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show(`Masuk sini !!`, ToastAndroid.SHORT)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
            this.setState({
              ...this.state,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
              position
            });
          },
          (error) => this.setState({ error: error.message })
        );
      } else {
        ToastAndroid.show("Camera permission denied", ToastAndroid.SHORT)
      }

    } catch(err) {
      ToastAndroid.show(`ERROR : ${err}`, ToastAndroid.SHORT)
    }
  }

  componentDidMount () {
    this.getLocation()
  }

  render() {
    return (
      <View>
        <Text>
          {` Hellow ${this.props.deviceId}`}
        </Text>
        <Text>
          {` - Latitude : ${this.state.latitude} , - Longitude : ${this.state.longitude}, - Position : ${this.state.position}, Error : ${this.state.error}`}
        </Text>
        <TextInput
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder={`Your Stuff Name..`}
          underlineColorAndroid={"green"}
        />
        <TextInput
          onChangeText={(image_url) => this.setState({image_url})}
          value={this.state.image_url}
          placeholder={`Some Image URL...`}
          underlineColorAndroid={"green"}
        />
      </View>
    );
  }
}



export default AddDeviceForm;
