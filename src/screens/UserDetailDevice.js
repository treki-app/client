import React, { Component } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetailDevice } from '../store/devices/devices.action';

class UserDetailDevice extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#0098a7"
    },
    headerTitle: <View style={{flexGrow: 1}}><Image style={{ alignSelf: 'center', height: 45, width: 120}} source={require('../treki_logo_inline_white.png')}/></View>,
    headerRight: <Text></Text>,
    headerTintColor: 'white'
  }

  componentDidMount () {
    const { deviceId } = this.props.navigation.state.params
    ToastAndroid.show(`${deviceId}`, ToastAndroid.SHORT)
    this.props.getUserDetailDevice(deviceId)
  }

  render() {
    return (
      <View style={{ backgroundColor: '#006971', height: '100%'}}>
      <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../treki_logo_circle.png')} style={style.image} />
        <Text style={style.textTitle}>Device ID</Text>
        <View style={style.wrapperDetail}>
          <Text style={style.textDetail}>FE:JE:JK:34:32</Text>
        </View>
        <Text style={style.textTitle}>Name</Text>
        <View style={style.wrapperDetail}>
          <Text style={style.textDetail}>Handphone</Text>
        </View>
        <Text style={style.textTitle}>Location</Text>
      </View>
      </ScrollView> 
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {

//   }
// }

const style = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 7,
    borderColor: '#0098a7'
  },
  textTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginTop: 10
  },
  wrapperDetail: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 30,
    alignItems: 'center'
  },
  textDetail: {
    padding: 10,
    fontSize: 15
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserDetailDevice
}, dispatch)

export default connect(null, mapDispatchToProps)(UserDetailDevice);

