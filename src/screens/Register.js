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
import SignUp from '../components/signup'

class SignIn extends Component {
  render() {
    return (
      <View style={style.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
        <SignUp/>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455a64'
  }
})

export default SignIn;