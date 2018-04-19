import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native'

class AvailableDevice extends Component {
  render() {
    return (
      <View style={ style.flatListItem }>
        <View style={ style.flatListButton }>
          <Button
            title={this.props.item}
            color="#ff6600"
            onPress={ () => { console.log(`Halloo`) }}
            // navigate.navigate('LeagueTable', {competitionId: item.id, competitionName: item.caption})
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  flatListButton: {
    paddingTop: 25,
    width: 200
  }
})

export default AvailableDevice;