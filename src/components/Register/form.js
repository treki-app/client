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
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import {login,signUp} from '../../store/user/user.action'

class Form extends Component {
  gotoFirebase(email,password){
    const { navigation } = this.props
    if(this.props.type === 'Login'){
      this.props.login(email,password)
        .then(() => {
          // console.warn(JSON.stringify(this.props.store.email), JSON.stringify(this.props.store.uid))
          if (this.props.store.email && this.props.store.uid) {
            navigation.navigate('Home')
          }
        })
    }else{
      this.props.signUp(email,password)
    }
  } 

  render() { 
    return (  
    <View style={styles.container}>
      <TextInput style={styles.inputBoxtop}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Email"
        placeholderTextColor="#ffffff"
        onChangeText={email => this.props.store.email = email }
        />
      <TextInput style={styles.inputBox} 
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Password"
        placeholderTextColor="#ffffff"
        secureTextEntry={true}
        onChangeText={password => this.props.store.password = password }
        />
        <TouchableOpacity style={styles.button}>
          <Text onPress={()=> {this.gotoFirebase(this.props.store.email, this.props.store.password)}}  
                style={styles.buttonText}> {this.props.type} </Text>
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
  inputBoxtop:{
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginBottom: 5
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  signUp
},dispatch)

const mapStateToProps = (state) => {
  return {
    store : state.userReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);