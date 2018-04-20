import React, { Component } from 'react';
import { Circle } from 'react-native-maps';

export default class Marker extends Component {
  render() {
    return (
      <Circle
        center={{
          latitude: this.props.latitude,
          longitude: this.props.longitude
        }}
        radius = { this.props.accuracy }
        fillColor = 'rgba(242,245,101,0.5)'
      />
    )
  }
}