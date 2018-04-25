import React, { Component } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetailDevice } from '../store/devices/devices.action';
import { updateState, GetLocation, deleteDevice } from '../store/treki/treki.action'
import Maps from '../components/Maps';
import * as Animatable from 'react-native-animatable';

class UserDetailDevice extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#0098a7"
    },
    headerTitle: <View style={{flexGrow: 1}}><Image style={{ alignSelf: 'center', height: 45, width: 120}} source={require('../treki_logo_inline_white.png')}/></View>,
    headerRight: <TouchableOpacity 
          onPress={() => navigation.state.params.deleteHandler()}
          style={ {width: 40, marginRight: 5, marginTop: 5,}} >
            <View>
              <MaterialIcons
                name="delete"
                size={32}
                style={{color: 'white'}} 
              >
              </MaterialIcons>
            </View>
        </TouchableOpacity>,
    headerTintColor: 'white'
  })

  componentWillMount(){
    const {setParams} = this.props.navigation;
    setParams({deleteHandler: this.deleteHandler});
  }

  deleteHandler = () => {
    this.props.deleteDevice(this.state.id);
    this.props.navigation.navigate('listUserDevices');
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
        state: false,
        image_url: null
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
            console.warn(device)
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
        <Text style={style.textTitle2}>Device ID</Text>
        <View style={style.wrapperDetail}>
          <Text style={style.textDetail2}>{this.state.detail.device_id}</Text>
        </View>
        <Image source={(this.state.detail.image_url)?{uri:this.state.detail.image_url}:require('../treki_logo_circle.png')} style={style.image} />
        <View style={style.wrapperDetail2}>
          <Text style={style.textDetail}>{this.state.detail.name}</Text>
        </View>
        <Animatable.View style={style.buttonWrapper} animation="pulse" easing="ease-out-sine" iterationCount={2} delay={500}>
        <TouchableHighlight
          style = { style.button }
          onPress = { () => {
            this.props.navigation.navigate('measurementDevice' , {
              deviceId: this.state.detail.device_id,
              deviceName: this.state.detail.name
            })
          }}
        >
            <Text style={style.finder}>
              Near Finder
            </Text>
        </TouchableHighlight>
        </Animatable.View>
        <Text style={style.textTitle}>Notification</Text>
        <Switch style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginTop: 10}}
        onValueChange={(value) => {
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
            home={false}
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
    width: 250,
    height: 250,
    borderRadius: 125,
    marginTop: 5,
    // marginBottom: 5,
    borderWidth: 7,
    borderColor: '#0098a7',
    zIndex: 2
  },
  textTitle2: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: '#004e54'
  },
  textTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#004e54'
  },
  wrapperDetail: {
    // backgroundColor: 'white',
    // borderTopColor: 'white',
    // borderTopWidth: 1,
    marginTop: 0,
    width: '80%',
    alignItems: 'center'
  },
  wrapperDetail2: {
    backgroundColor: '#0098a7',
    width: '60%',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: -10
  },
  textDetail: {
    padding: 10,
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: 'white'
  },
  textDetail2: {
    paddingBottom: 10,
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: 'white'
  },
  mapWrapper: {
    width: '90%',
    height: 300,
    marginBottom : 30,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
    borderRadius: 30,
    paddingBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  finder: {
    color: '#004e54',
    fontWeight: '500',
    fontSize: 30,
    fontFamily: 'Roboto'
  },
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserDetailDevice,
  updateState,
  GetLocation,
  deleteDevice
}, dispatch)

const mapStateToProps = (state) => ({
  userDevices: state.devicesReducer.userDevices,
  devices: state.treki.devices,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailDevice);

