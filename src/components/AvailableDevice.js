import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation';

class AvailableDevice extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={ style.flatListItem }>
        <View style={ style.flatListButton }>
          <Button
            title={this.props.item}
            color="#ff6600"
            onPress={ () => navigation.navigate('addDevice')}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  flatListButton: {
    paddingTop: 25,
    width: 200
  }
})

export default AvailableDevice;