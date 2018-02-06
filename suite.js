import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LockScreen from './lock';
import Test from './test'

export const SuiteScreen = TabNavigator({
    Verrouillage: { screen: LockScreen },
    Test :{screen:Test}
},{tabBarPosition:"bottom",
  tabBarOptions:{activeTintColor:'white',
      style:{
          backgroundColor:'#A5D6A7'
      }
  }
});

export default class App extends React.Component {
    static navigationOptions={
        header:null
    }
  render() {
    return <SuiteScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = SuiteScreen;