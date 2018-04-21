import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
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
    if ( this.props.isLoading ) {
      return (
        <View>
          <Text>
            Lagi Loading...
          </Text>
        </View>
      )
    } else if ( this.props.isError ) {
      return (
        <View>
          <Text>
            Error...
          </Text>
        </View>
      )
    } else {
      return (
        <View>
          <HamburgerButton navigation={this.props.navigation}/>
          <FlatList 
            contentContainerStyle = { style.flatList }
            data = { this.props.userDevices }
            renderItem = { this.renderItem }
            keyExtractor = { this.keyExtractor }
          />
        </View>
      );
    }

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
