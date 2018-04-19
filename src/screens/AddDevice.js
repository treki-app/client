import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddDeviceForm from '../components/AddDeviceForm';

class AddDevice extends Component {

  static navigationOptions = {
    tabBarLabel: `Treki App`,
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="library-add"
          size={24}
          style={{color: tintColor}} 
        >
        </MaterialIcons>
      );
    }
  }

  render() {
    return (
      <View>
        <AddDeviceForm/>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="Hamburger"
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

export default AddDevice;