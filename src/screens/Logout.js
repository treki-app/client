import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SignOut } from '../store/user/user.action';

class Logout extends Component {

  componentWillMount = () => {
    this.props.SignOut(() => this.props.navigation.navigate('Register'));
  }

  render() {
    return (
      <View>
        <Text> Bye </Text>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  SignOut
}, dispatch)

export default connect(null, mapDispatchToProps)(Logout);