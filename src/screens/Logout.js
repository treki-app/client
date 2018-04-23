import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SignOut } from '../store/user/user.action';

class Logout extends Component {
  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="exit-to-app"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }

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