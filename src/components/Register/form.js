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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> {this.props.type} </Text>
        </TouchableOpacity>
    </View>
    )
  }
}
 
const styles= StyleSheet.create({
  container:{
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  inputBox:{
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button:{
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 13

  },
  buttonText:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
}) 
export default Logo ;