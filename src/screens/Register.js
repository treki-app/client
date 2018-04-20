import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import Routes from '../components/Register/RouteRegister'

class Register extends Component {
  render() {
    return (
      <View style={style.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
        <Routes/>
        <Button
          title="Klik sini bray buat tes bluetooth"
          onPress={()=> this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Register;