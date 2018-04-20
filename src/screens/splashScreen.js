import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Image
} from 'react-native'

class Splash  extends Component {

  componentWillMount(){
    setTimeout(()=> {
      this.props.navigation.navigate('Register')
    },2000)
  }
  render() { 
    return (  
      <View style={styles.container}>
        <Image style={{width: 130 , height: 160, marginBottom: 100}}
             source={require('../splashwithtext.png')}
        />
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
  }
})
 
export default Splash ;