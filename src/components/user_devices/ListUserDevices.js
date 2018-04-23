import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ToastAndroid,
  Text,
  TouchableHighlight,
  Image
} from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import moment from 'moment'

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
         underlayColor="rgba(255,255,255,0.2)">
        <View style={styles.wrapper}>
          <View>
            <Image source={require('../../treki_logo_circle.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.innerTextSmall}>
              Device Name:
            </Text>
            <Text style={styles.innerText}>
              {item.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.innerTextSmallBold}>
              Active: 
            </Text>
            <Text style={styles.innerTextSmall}>
              {" "+moment(item.updatedAt).fromNow()}
            </Text>
            </View>
          </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // alignItems: 'center',
    backgroundColor: '#0098a7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    width: 300,
    color: 'white',
    borderRadius: 50,
  },
  innerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500'
  },
  innerTextSmall: {
    color: 'white',
    fontSize: 15,
    fontWeight: '200'
  },
  innerTextSmallBold: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  },
  image: {
    height: 70,
    // borderRadius: 50,
    width: 70,
    marginRight: 20
  },
  wrapper: {
    flexDirection: 'row'
  }

})

export default ListUserDevices;