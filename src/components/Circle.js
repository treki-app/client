import React, { Component } from 'react'
import { Circle as C } from 'react-native-maps';
import { Text, View } from 'react-native'

export default class Circle extends Component {
  state = {
    device: 'rgba(242, 245, 101, 0.5)',
    user: 'rgba(27, 120, 201, 0.9)'
  }

  render() {
    return (
      <C
        center={{
          latitude: this.props.latitude,
          longitude: this.props.longitude
        }}
        radius={ this.props.radius }
        fillColor={ this.state[this.props.color] }
        zIndex={ this.props.color == 'user' ? 100 : 0 }
      />
    )
  }
}