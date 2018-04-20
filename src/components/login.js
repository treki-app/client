import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native'
import Logo from '../components/logo'
import Form from '../components/form'

class Login extends Component {
  render() { 
    return ( 
      <View style={styles.container}>
        <Logo/>
        <Form/>
        <View style={styles.signupText}>
          <Text>
          </Text>
        </View>
      </View>
     )
  }
}
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455a64'
  },
  signupText:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'  
  }
})

export default Login;