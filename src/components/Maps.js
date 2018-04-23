import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps';
import moment from 'moment';
import Marker from './Marker';
import Circle from './Circle';

class Maps extends Component {
  state = {
    midPoint: {
      latitude: 0,
      longitude: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitudeDelta: 0.003375,
            longitudeDelta: 0.003375,
            latitude: this.props.latitude,
            longitude: this.props.longitude
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
          <MapView.Marker
            coordinate={{
              latitude: this.props.userLatitude,
              longitude: this.props.userLongitude
            }}
            image={require('../../public/img/pin-point.png')}
            style={{ zIndex: -1 }}
          />
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

export default Maps