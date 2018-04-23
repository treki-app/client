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

class Signup extends Component {
  
  goBack(){
    Actions.pop()

  }
  render() { 
    return ( 
      <View style={styles.container}>
        <Logo/>
        <Text style={styles.Text}> Let's get Started by signning up for Track your devices </Text>
        <Form type="Signup"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> Already have an account ?</Text>
          <Text onPress={this.goBack} style={styles.signupButton}> Sign in</Text>
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
    textAlign : 'center',
    color: 'rgba(255,255,255, 0.7)',
    marginTop: 20
  }
})

export default Signup;