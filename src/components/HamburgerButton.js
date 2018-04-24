import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ToolbarAndroid,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDevices } from '../store/devices/devices.action';

class HamburgerButton extends Component {

  onActionSelected = (position) => {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={style.titlebar}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('DrawerOpen')}
          style={style.listButton}
        >
            <View>
              <MaterialIcons
                name="list"
                size={32}
                style={{color: 'white'}} 
              >
              </MaterialIcons>
            </View>
        </TouchableOpacity>
        <Image style={(this.props.refreshButton)? style.logo : {flex: 1, height: 45,resizeMode: 'contain',marginRight: '20%'} } source={require('../treki_logo_inline_white.png')}/>
        {this.props.refreshButton?<TouchableOpacity 
          onPress={() => {this.props.getUserDevices(this.props.uid)}}
          style={style.refreshButton}
        >
            <View>
              <MaterialIcons
                name="refresh"
                size={32}
                style={{color: 'white'}} 
              >
              </MaterialIcons>
            </View>
        </TouchableOpacity> : null}
      </View>
    );
  }
}

const style = StyleSheet.create({
  listButton : {
    width: 40, 
    marginLeft: 5,
    marginTop: 5,
  },
  titlebar: {
    height: 46,
    backgroundColor: "#0098a7",
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    flex: 1,
    // marginRight: '20%',
    // backgroundColr:'red',
    height: 45,
    resizeMode: 'contain',
  },
  refreshButton: {
    width: 40, 
    marginRight: 5,
    marginTop: 5,
  }
})

const mapStateToProps = (state) => {
  return {
    uid: state.userReducer.uid
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserDevices
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (HamburgerButton);