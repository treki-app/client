import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserDevices } from '../../store/devices/devices.action';
import ListUserDevices from './ListUserDevices';
import HamburgerButton from '../HamburgerButton';

class UserDevicesHome extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user_id: ``
    }
  }

  componentDidMount () {
    this.setState({
      user_id: this.props.uid
      // user_id: '7iQwnq2sYAYu1hv3DjDL11M5Wkp1'
    }, () => {
      this.props.getUserDevices(this.state.user_id)
    })
    // console.warn(this.state.user_id)
    
  }

  renderItem = ({item}) => {
    return (
      <ListUserDevices item={item} navigation={this.props.navigation}/>
    )
  }

  keyExtractor = (item, index) => `userdevices-${index}`

  render() {
      return (
        <View style={{ backgroundColor: '#006971', height: '100%'}}>
          <HamburgerButton navigation={this.props.navigation}/>
          <View style={style.titleWrapper}>
            <Text style={style.title}>     Your Devices     </Text>
          </View>
          {this.props.isLoading? 
          <View style={style.imageContainer}>
            <Image style={style.image} source={ require('../../treki_logo_background_white.png')} />
            <Text style={style.text}>Loading...</Text>
          </View>
          :
          <FlatList 
            contentContainerStyle = { style.flatList }
            data = { this.props.userDevices }
            renderItem = { this.renderItem }
            keyExtractor = { this.keyExtractor }
          />
          }
        </View>
      );
  }
}

const style = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  flatListItem: {
    padding: 5,
    backgroundColor: 'teal',
    margin: 5,
    width: 340,
    alignItems: 'center',
    height: 100
  },
  flatListButton: {
    paddingTop: 25,
    width: 200
  },
  flatLoading: {
    marginTop: 200
  },
  title: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 30,
    // color: '#006971',
    color: 'white',
    marginBottom: 10,
    borderBottomWidth: 3,
    paddingBottom: 10,
    // borderBottomColor: '#006971'
    borderBottomColor: 'white'
  },
  titleWrapper: {
    alignItems: 'center',
    // backgroundColor: '#006971'
  },
  image: {
    width: 100,
    height: 113,
  },
  imageContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color:"white",
    fontSize: 24,
    fontWeight: '300',
  }
})

const mapStateToProps = (state) => {
  return {
    userDevices: state.devicesReducer.userDevices,
    isLoading: state.devicesReducer.isLoading,
    isError: state.devicesReducer.isError,
    uid: state.userReducer.uid
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserDevices
}, dispatch)

export default connect (mapStateToProps, mapDispatchToProps)(UserDevicesHome);
