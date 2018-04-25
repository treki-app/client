import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  ScrollView
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import Routes from '../components/Register/RouteRegister';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { OnStateChange } from '../store/user/user.action'

class Register extends Component {

  componentWillMount = () => this.props.OnStateChange();

  render() {
    if (this.props.isLoggedIn) this.props.navigation.navigate('Home');
    return (
      <View style={style.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
        <Routes navigation={ this.props.navigation }/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.uid ? true : false
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  OnStateChange
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register);