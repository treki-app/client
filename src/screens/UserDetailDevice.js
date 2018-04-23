import React, { Component } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetailDevice } from '../store/devices/devices.action';
import { updateState } from '../store/treki/treki.action'

class UserDetailDevice extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#0098a7"
    },
    headerTitle: <View style={{flexGrow: 1}}><Image style={{ alignSelf: 'center', height: 45, width: 120}} source={require('../treki_logo_inline_white.png')}/></View>,
    headerRight: <Text></Text>,
    headerTintColor: 'white'
  }

  constructor () {
    super()
    this.state = {
      notif: false,
      detail: {
        device_id: '',
        name: '',
        location: null,
        createdAt: null,
        updatedAt: null,
        state: false
      }
    }
  }

  updateData () {
    const { deviceId } = this.props.navigation.state.params
    this.props.getUserDetailDevice(deviceId)
      .then((detail) => {
        console.warn(detail.data.data)
        this.setState({
          detail: detail.data.data
        })
      })
  }
  
  componentDidMount () {
    // console.warn("deviceID", deviceId)
    // let detail = this.props.userDevices.filter(val => val.id === deviceId);
    // console.warn('detail', detail)
    this.updateData();
  }

  render() {
    return (
      <View style={{ backgroundColor: '#006971', height: '100%'}}>
      <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../treki_logo_circle.png')} style={style.image} />
        <Text style={style.textTitle}>Device ID</Text>
        <View style={style.wrapperDetail}>
          <Text style={style.textDetail}>{this.state.detail.device_id}</Text>
        </View>
        <Text style={style.textTitle}>Name</Text>
        <View style={style.wrapperDetail}>
          <Text style={style.textDetail}>{this.state.detail.name}</Text>
        </View>
        <Text style={style.textTitle}>Notification</Text>
        <Switch onValueChange={(value) => {
          this.props.updateState(value)
            .then(() => {
              console.warn("UPDATE")
              this.updateData();
            })
          }} value={ this.state.detail.state } onTintColor='#00afc4' thumbTintColor='white'/>
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
  getUserDetailDevice,
  updateState
}, dispatch)

const mapStateToProps = (state) => ({
  userDevices: state.devicesReducer.userDevices,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailDevice);

