import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Image
} from 'react-native'

class Logo extends Component {
  render() { 
    return (  
    <View style={styles.container}>
      <Image style={{width: 120 , height: 160, martinTop: 20}}
             source={require('../../splashwithtext.png')}
      />
    </View>
    )
  }
}
 
const styles= StyleSheet.create({
  container:{
    alignItems: 'center'
  },
  logoText:{
    marginTop: 20,
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255,255,255, 0.7)'
  }
}) 
export default Logo ;