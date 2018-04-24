import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  ProgressBarAndroid
} from 'react-native'
import Logo from './logo'
import Form from './form'
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';

class Login extends Component {
  
  signup(){
    Actions.signup()
  }

  render() {
    if(this.props.store.isLoadingSignIn || this.props.store.isLoadingSignUp) {
      return(
        <View style={styles.containerr}>
          <Logo/>
          <Text style={styles.TextLoading}>
            Taking to the app ...
          </Text>
          <ProgressBarAndroid/>
        </View>
      )
    }else {
      return ( 
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            style={{width: '100%'}}
          >
          <Logo/>
          <Text style={styles.Text}> Sign in below to track your devices </Text>
          <Form type="Login" navigation={this.props.navigation}/>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}> Don't have an Account yet ?</Text>
            <Text onPress={this.signup} style={styles.signupButton}> Signup</Text>
          </View>
        </ScrollView>
        </View>
       )
    } 
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006971',
  },
  containerr:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#006971',
    paddingTop: 20    
    // justifyContent: 'center',
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
    color: 'rgba(255,255,255, 0.7)',
    marginTop: 20,
    marginBottom: 15
  },
  TextLoading:{
    fontSize: 20,
    color: 'rgba(255,255,255, 0.7)',
    marginTop: 20,
    marginBottom: 25
  }
})

const mapStateToProps = (state) => {
  return {
    store : state.userReducer
  }
}

export default connect(mapStateToProps, null)(Login);