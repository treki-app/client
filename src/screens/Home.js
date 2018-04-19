import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddDevice from './AddDevice';
import Maps from '../components/Maps';

class Home extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="track-changes"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="Hamburger"
        />
        <Maps/>
      </View>
    );
  }
}

const Drawer = DrawerNavigator(
  {
    Home: {
      path: '/',
      screen: Home,
      name: 'Home'
    },
    AddDevice: {
      path: '/adddevice',
      screen: AddDevice,
      name: 'Add Device'
    }
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
)

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },

})

export default Drawer;
