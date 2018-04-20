import React, { Component } from 'react';
import { Circle, Marker as Mark } from 'react-native-maps';
import {
  View,
  Text
} from 'react-native';

export default class Marker extends Component {
  render() {
    return (
      <View>
        <Circle
          center={{
            latitude: this.props.latitude,
            longitude: this.props.longitude
          }}
          radius={ this.props.accuracy }
          fillColor='rgba(242,245,101,0.5)'
        />
        <Mark
          title={ this.props.title }
          description={ this.props.description }
          coordinate={{
            latitude: this.props.latitude,
            longitude: this.props.longitude
          }}
          image={require('../../public/img/marker3.png')}
        >
          <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
            <Text style={{ color:'#fff', fontWeight:'bold', fontSize:12 }}>{ this.props.title }</Text>
            <Text style={{ color:'#fff', fontSize:8 }}>{ this.props.description }</Text>
          </View>
      </Mark>
      </View>
    )
  }
}