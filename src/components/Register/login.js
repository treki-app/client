import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native'
import Logo from './logo'
import Form from './form'
import {Actions} from 'react-native-router-flux'

class Login extends Component {
  
  signup(){
    Actions.signup()
  }

  render() { 
    return ( 
      <View style={styles.container}>
        <Logo/>
        <Text style={styles.Text}> Sign in below to track your devices </Text>
        <Form type="Login" navigation={this.props.navigation}/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> Don't have an Account yet ?</Text>
          <Text onPress={this.signup} style={styles.signupButton}> Signup</Text>
        </View>
      </View>
     )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006971'
  },
  signupTextCont:{
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16 ,
    flexDirection: 'row' 
  },
  signupText:{
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  Text:{
    fontSize: 16,
    color: 'rgba(255,255,255, 0.7)'
  }
})

export default Login;