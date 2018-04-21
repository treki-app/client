import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import Marker from './Marker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LoadTreki } from '../store/treki/treki.action';

const MapStateToProps = (state) => {
  return {
    isLoading: state.treki.isLoading,
    isError: state.treki.isError,
    devices: state.treki.devices,
  }
}

const MapDispatchToProps = (dispatch) => bindActionCreators({ LoadTreki }, dispatch)

class Maps extends Component {
  state = {
    midPoint: {
      latitude: 0,
      longitude: 0
    }
  }

  componentWillMount = async () => {
    await this.props.LoadTreki(this.setCoordinate);
  }

  setCoordinate = () => {
    let sumCoordinate = { latitude: 0, longitude: 0 };
    this.props.devices.forEach(element => {
      sumCoordinate.latitude += element.location.latitude;
      sumCoordinate.longitude += element.location.longitude;
    });
    let newMidPoint = {
      latitude : sumCoordinate.latitude / this.props.devices.length,
      longitude : sumCoordinate.longitude / this.props.devices.length
    }
    this.setState({ midPoint: newMidPoint })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitudeDelta: 0.003375,
            longitudeDelta: 0.003375,
            latitude: this.state.midPoint.latitude,
            longitude: this.state.midPoint.longitude
          }}
        >
          {
            this.props.devices.map(marker => (
            <Marker
              key={marker.createdAt}
              latitude={marker.location.latitude}
              longitude={marker.location.longitude}
              accuracy={marker.location.accuracy}
              title={marker.name}
              description={moment(marker.updatedAt).fromNow()}
            />)) 
          }
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 32,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: { ...StyleSheet.absoluteFillObject }
});

export default connect(MapStateToProps, MapDispatchToProps)(Maps)