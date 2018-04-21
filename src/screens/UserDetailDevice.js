import React, { Component } from 'react';
import {
  View,
  Text,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDetailDevice } from '../store/devices/devices.action';

class UserDetailDevice extends Component {

  componentDidMount () {
    const { deviceId } = this.props.navigation.state.params
    ToastAndroid.show(`${deviceId}`, ToastAndroid.SHORT)
    this.props.getUserDetailDevice(deviceId)
  }

  render() {
    return (
      <View>
        <Text>
          {`Reserved for detail device ${this.props.navigation.state.params.deviceId}`}
        </Text>
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {

//   }
// }

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserDetailDevice
}, dispatch)

export default connect(null, mapDispatchToProps)(UserDetailDevice);

