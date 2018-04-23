import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class componentName extends Component {
  render() {
    return (
      <View style={style.outer}>
        <View style={style.outer2}>
          <View style={style.outer3}>
            <View style={style.outer4}>
              <Text style={style.title}> Handphone </Text>
              <Text style={style.distance}> 15.00 m</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  outer: {
    backgroundColor: '#004e54',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  outer2: {
    backgroundColor: '#006971',
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
    height: 600,
    borderRadius: 300
  },
  outer3: {
    backgroundColor: '#0098a7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    height: 450,
    borderRadius: 225
  },
  outer4: {
    backgroundColor: '#00afc4',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 150
  },
  title: {
    color: 'white',
    fontSize: 40,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    paddingBottom: 7
  },
  distance: {
    color: 'white',
    fontSize: 70,
    fontWeight: '600',
    paddingTop: 7
  }
})