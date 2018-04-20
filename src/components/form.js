import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  StatusBar,
  Image,
  TouchableOpacity,
  Text
} from 'react-native'

class Logo extends Component {
  render() { 
    return (  
    <View style={styles.container}>
      <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Email"
        placeholderTextColor="#ffffff"
        />
      <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Password"
        placeholderTextColor="#ffffff"
        secureTextEntry={true}
        />
        <TouchableOpacity>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
    </View>
    )
  }
}
 
const styles= StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  inputBox:{
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal:16,
    marginVertical: 10
  },
  buttonText:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  }
}) 
export default Logo ;