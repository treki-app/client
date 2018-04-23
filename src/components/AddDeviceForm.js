import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  PermissionsAndroid,
  ToastAndroid,
  PixelRatio,
  Image,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveNewDevice, GetLocation } from '../store/treki/treki.action'
import ImagePicker from 'react-native-image-picker'
import {storage} from '../../src/store/firebase';

class AddDeviceForm extends Component {
  constructor (props) {
    super(props)
    this.takePic.bind(this)
    this.state = {
      newDevice: {
        name: ``,
        device_id: ``,
        image_url: ``,
        image: ``,
        user_id: this.props.uid,
        location: {
          accuracy: null,
          latitude: null,
          longitude: null,
        }
      },
      error: null,
      avatarSource: null,
    }
  }

  componentDidMount = () => {
    this.props.GetLocation(location => this.setState({
    ...this.state,
    newDevice: {
      ...this.state.newDevice,
      device_id: this.props.deviceId,
      location
    },
    }));
  }
  
  addDevice () {
    const { navigation } = this.props
    const theNewDevice = this.state.newDevice

    let formData = new FormData()
    formData.append('name', theNewDevice.name)
    formData.append('device_id', theNewDevice.device_id)
    formData.append('image', theNewDevice.image)
    formData.append('user_id', theNewDevice.user_id)
    formData.append('location', JSON.stringify(theNewDevice.location))

    this.props.saveNewDevice(formData)
      .then(() => {
        ToastAndroid.show('Your Device Has Been Added', ToastAndroid.SHORT)
        navigation.navigate('Home')
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  takePic(){
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      // console.warn('Response = ', response);
      if (response.didCancel) {
        // console.warn('User cancelled photo picker');
      }
      else if (response.error) {
        // console.warn('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.warn('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });

        let uriImage = response.uri.replace('file://', '')

        let imageDevice = {
          uri: response.uri,
          name: response.fileName,
          type: response.type
        }
        
        this.setState({
          newDevice: {
            ...this.state.newDevice,
            image: imageDevice
          }
        })
        
      }
    });
  }

  render() {
    return (
      <View>
        <Text>
          {` Hellow ${this.state.newDevice.device_id}`}
        </Text>
        <Text>
          {` 
          - Accuracy : ${this.state.newDevice.location.accuracy}
          - Latitude : ${this.state.newDevice.location.latitude} ,
          - Longitude : ${this.state.newDevice.location.longitude},
          - Error : ${this.state.error},
          - UserId : ${this.state.newDevice.user_id}
          `}
        </Text>
        <TextInput
          onChangeText={(name) => this.setState({
            ...this.state,
            newDevice: {
              ...this.state.newDevice,
              name: name
            }
          })}
          value={this.state.name}
          placeholder={`Your Stuff Name..`}
          underlineColorAndroid={"green"}
        />
        <TextInput
          onChangeText={(image_url) => this.setState({
            ...this.state,
            newDevice: {
              ...this.state.newDevice,
              image_url: image_url
            }
          })}
          value={this.state.image_url}
          placeholder={`Some Image URL...`}
          underlineColorAndroid={"green"}
        />
        <TouchableOpacity onPress={this.takePic.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
        <Button 
          title={"Add Device"}
          onPress={() => { this.addDevice() }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar:{
    borderRadius: 75,
    width: 150,
    height: 150
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
}) 

const mapStateToProps = (state) => {
  return {
    uid: state.userReducer.uid
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveNewDevice,
  GetLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceForm);
