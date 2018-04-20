import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput
} from 'react-native';

class AddDeviceForm extends Component {
  constructor () {
    super()
    this.state = {
      name: ``,
      image_url: ``,
    }
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder={`Your Stuff Name..`}
        />
        <TextInput
          onChangeText={(image_url) => this.setState({image_url})}
          value={this.state.image_url}
          placeholder={`Some Image URL...`}
        />
      </View>
    );
  }
}



export default AddDeviceForm;
