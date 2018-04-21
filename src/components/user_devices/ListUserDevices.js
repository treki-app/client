import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ToastAndroid,
  Text,
  TouchableHighlight
} from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation';

class ListUserDevices extends Component {

  viewDetailDevices = (deviceId) => {
    const { navigation } = this.props
    navigation.navigate('detailDevice', {deviceId: deviceId})
  }

  render() {
    const { item } = this.props
    return (
      <View>
        <TouchableHighlight
         style={styles.button}
         onPress={() => { this.viewDetailDevices(item.id) }}
        >
          <View>
            <Text>
              {item.name}
            </Text>
            <Text>
              {item.status ? `Status : ON` : `Status : OFF`}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 300
  },
})

export default ListUserDevices;