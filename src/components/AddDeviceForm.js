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
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
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
      <View style={styles.wrapper}>
        <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems:'center'}}>
        <TouchableOpacity onPress={this.takePic.bind(this)} activeOpacity={0.7}>
          <View style={styles.avatarContainer}>
          { this.state.avatarSource === null ? 
          <Text style={styles.text}>Select a Photo</Text> 
          :
          <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
        <Text style={styles.title} >
          {`Device ID`}
        </Text>
        <Text style={styles.input2}>{this.state.newDevice.device_id}</Text>
        <Text style={styles.title} >Device Name</Text>
        <TextInput style={styles.input}
          onChangeText={(name) => this.setState({
            ...this.state,
            newDevice: {
              ...this.state.newDevice,
              name: name
            }
          })}
          value={this.state.name}
          placeholder={`Your Stuff Name..`}
        />
   
        <TouchableHighlight 
          style={styles.button}
          onPress={() => { this.addDevice() }}
          underlayColor="rgba(0,0,0,0.2)"
        >
        <Text style={styles.buttonText}>Add Device</Text>
        </TouchableHighlight>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar:{
    borderRadius: 100,
    width: 200,
    height: 200,
    borderColor: '#0098a7',
    borderWidth: 10,
  },
  avatarContainer: {
    borderColor: '#0098a7',
    borderWidth: 10,
    marginTop: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 200,
    height: 200,
    marginBottom: 20
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#006971',
    height: '100%'
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: '600',
    color: '#006971'
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "rgba(0,0,0,0.7)",
    textAlign: 'center'
  },
  input2: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "rgba(0,0,0,0.4)",
    textAlign: 'center'
  },
  title: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '600', 
    marginBottom: 5
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '80%',
    backgroundColor: '#0098a7',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '600', 
  }
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
