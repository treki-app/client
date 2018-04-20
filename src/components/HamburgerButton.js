import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

class HamburgerButton extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('DrawerOpen')}
          style={style.listButton}
        >
            <View>
              <MaterialIcons
                name="list"
                size={32}
                style={{color: 'grey'}} 
              >
              </MaterialIcons>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  listButton : {
    width: 40, 
    marginLeft: 5,
    marginTop: 5
  }
})
export default HamburgerButton;