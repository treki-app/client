import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from '../components/login'

class SignIn extends Component {
  render() {
    return (
      <View style={style.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
        <Login/>
        <Button
          title="Sign In"
          onPress={()=> this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455a64'
  }
})

export default SignIn;