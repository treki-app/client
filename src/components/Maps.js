import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Marker from './Marker';

export default class Maps extends Component {

  state = {
    markerData: [
      {
        latitude: 37.78825,
        longitude: -122.4324
      },
      {
        latitude: 37.787,
        longitude: -122.4324
      }
    ],
    midPoint: {
      latitude: 0,
      longitude: 0
    }
  }

  componentWillMount = () => {
    let newMidPoint = {
      latitude : this.state.markerData.reduce((acc, cur) => acc.latitude + cur.latitude)/this.state.markerData.length,
      longitude : this.state.markerData.reduce((acc, cur) => acc.longitude + cur.longitude)/this.state.markerData.length
    }
    this.setState({ midPoint: newMidPoint })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitudeDelta: 0.00675,
            longitudeDelta: 0.00675,
            latitude: this.state.midPoint.latitude,
            longitude: this.state.midPoint.longitude
          }}
        >
          {
            this.state.markerData.map(marker => (<Marker latitude={marker.latitude} longitude={marker.longitude} />)) 
          }
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject }
});