import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'
import { StackNavigator } from 'react-navigation';

class SignIn extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>
          Reserved for Sign In
        </Text>
        <Button
          title="Sign In"
          onPress={()=> this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

export default SignIn;