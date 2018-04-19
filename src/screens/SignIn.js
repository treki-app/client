import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base'
import * as firebase from 'firebase'
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk'

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyC7fafItD0W7ekbxDWqmYbTEyCz2S3yPUY",
  authDomain: "gotracker-68020.firebaseapp.com",
  databaseURL: "https://gotracker-68020.firebaseio.com",
  projectId: "gotracker-68020",
  storageBucket: "gotracker-68020.appspot.com",
  messagingSenderId: "1080937578336"
};
firebase.initializeApp(config);

class SignIn extends Component {
  constructor(){
    super()
    this.state=({
      email: '',
      password: ''
    })
  }

  loginUser= (email,password)=>{
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      })
    }catch(err){
      console.log(err)
    }
  }

  signupUser= (email,password) => {
    try{
      if(this.state.password.length < 6){
        alert('please enter at least 6 characters')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email,password)
    }catch(err){
      console.log(err)
    }
  }
  fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
      if(result.isCancelled){
        alert('Login was Canceled')
      }else{
        AccessToken.getCurrentAccessToken().then(AccessTokenData => {
          const credential = firebase.auth().FacebookAuthProvider.credential(AccessTokenData.accessToken)
          firebase.auth().signInWithCredential(credential).then(result=>{

          },err=> {
            console.log(err)
          })
        })
      }
    },function(err){
      alert('an error occured: ' + err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label> Email </Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label> password </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({password})}
            />
          </Item>
          <Button style={{marginTop:10}}
            block
            success
            onPress={()=> this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={styles.text}> Login </Text>
          </Button>  

          <Button style={{marginTop:10}}
            block
            primary
            onPress={()=> this.signupUser(this.state.email, this.state.password)}
          >
            <Text style={styles.text}> Signup </Text>
          </Button> 

          <Button style={{marginTop:10}}
            block
            primary
            onPress={()=>this.fbAuth()}
          >
            <Text style={styles.text}> Login With Facebook </Text>
          </Button> 
        </Form>
        <Button
          title="Sign In"
          onPress={()=> this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text:{
    color: 'white'
  }
})

export default SignIn;