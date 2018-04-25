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
    }, () => {
      this.props.getUserDevices(this.state.user_id)
    })
  }

  renderItem = ({item}) => {
    return (
      <ListUserDevices item={item} navigation={this.props.navigation} />
    )
  }

  keyExtractor = (item, index) => `userdevices-${index}`

  render() {
      return (
        <View style={{ backgroundColor: '#006971', height: '100%'}}>
          <HamburgerButton navigation={this.props.navigation} refreshButton={true}/>
          <View style={style.titleWrapper}>
            <Text style={style.title}>     My Devices     </Text>
          </View>
          {this.props.isLoading? 
          <View style={style.imageContainer}>
            <Image style={style.image} source={ require('../../treki_logo_circle.png')} />
            {/* <Text style={style.text}>Loading...</Text> */}
            <View>
              <Image style={style.loading} source={ require('../../Loading.gif')} />
            </View>
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
    fontSize: 40,
    color: 'white',
    marginBottom: 10,
    // borderBottomWidth: 3,
    paddingTop: 10,
    paddingBottom: 15,
    // borderBottomColor: 'white',
    backgroundColor: '#005159',
    borderRadius: 30,
    paddingHorizontal: 20
  },
  titleWrapper: {
    alignItems: 'center',
    // backgroundColor: '#006971'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20
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
  },
  loading: {
    width: 150,
    height: 45,
    marginLeft: 40
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
