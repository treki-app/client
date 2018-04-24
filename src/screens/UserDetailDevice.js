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
import { updateState, GetLocation } from '../store/treki/treki.action'
import Maps from '../components/Maps';

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
      id: '',
      detail: {
        device_id: '',
        name: '',
        location: null,
        createdAt: null,
        updatedAt: null,
        state: false
      },
      userLocation: {
        latitude: 0,
        longitude: 0,
      },
      deviceLocation: {
        latitude: 0,
        longitude: 0,
      }
    }
  }

  updateData () {
    const { deviceId } = this.props.navigation.state.params
    this.setState({id: deviceId})
    this.props.getUserDetailDevice(deviceId)
      .then((detail) => {
        this.setState({
          notif: detail.data.data.status
        })
        this.setState({
          detail: detail.data.data
        }, () => {
          this.props.GetLocation(location => this.setState({...this.state, userLocation: location}, () => {
            let device = this.props.devices.filter(device => device.device_id == this.state.detail.device_id)
            this.setState({...this.state, deviceLocation: {
              latitude: device[0].location.latitude,
              longitude: device[0].location.longitude
            }})
          }))
        })
      })
  }
  
  componentDidMount = () => this.updateData();

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
          this.setState({
            notif: value
          })
          this.props.updateState({status: value, id:this.state.id})
            .then(() => {
              this.updateData();
            })
          }} value={ this.state.notif } onTintColor='#00afc4' thumbTintColor='white'/>
        <Text style={style.textTitle}>Location</Text>
        <View style={style.mapWrapper}>
          <Maps
            latitude={this.state.deviceLocation.latitude}
            longitude={this.state.deviceLocation.longitude}
            userLatitude={this.state.userLocation.latitude}
            userLongitude={this.state.userLocation.longitude}
            devices={this.props.devices.filter(device => device.device_id == this.state.detail.device_id)} />
        </View>
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
  },
  mapWrapper: {
    width: '90%',
    height: 300,
    marginBottom : 10,
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserDetailDevice,
  updateState,
  GetLocation,
}, dispatch)

const mapStateToProps = (state) => ({
  userDevices: state.devicesReducer.userDevices,
  devices: state.treki.devices,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailDevice);

