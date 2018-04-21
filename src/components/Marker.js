import React, { Component } from 'react';
import { Circle, Marker as Mark } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';

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
          <View style={styles.container}>
              <Text style={[styles.text, styles.title]}>{ this.props.title }</Text>
              <Text style={[styles.text, styles.content]}>{ this.props.description }</Text>
          </View>
        </Mark>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 80,
    height: 30,
    paddingHorizontal: 2,
    paddingVertical: 2
  },
  text: {
    flexGrow: 1,
    color:'#fff'
  },
  title: {
    fontWeight:'bold',
    fontSize:12
  },
  content: {
    fontSize:8
  }
})