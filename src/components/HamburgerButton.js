import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ToolbarAndroid,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

class HamburgerButton extends Component {

  onActionSelected = (position) => {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={style.titlebar}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('DrawerOpen')}
          style={style.listButton}
        >
            <View>
              <MaterialIcons
                name="list"
                size={32}
                style={{color: 'white'}} 
              >
              </MaterialIcons>
            </View>
        </TouchableOpacity>
        <Image style={ style.logo } source={require('../treki_logo_inline_white.png')}/>
       {/* <ToolbarAndroid
          style={{
            height: 46,
            backgroundColor: "#0098a7",
            elevation: 4,
          }}
          titleColor="white"
          logo={require('../treki_logo_inline_white.png')}
          title="CheeseSquare"
        /> */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  listButton : {
    width: 40, 
    marginLeft: 5,
    marginTop: 5,
  },
  titlebar: {
    height: 46,
    backgroundColor: "#0098a7",
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    flex: 1,
    marginRight: '20%',
    // backgroundColr:'red',
    height: 45,
    resizeMode: 'contain',
  }
})
export default HamburgerButton;