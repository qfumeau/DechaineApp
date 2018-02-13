import React from 'react';
import { StyleSheet, Text,BackHandler, Alert,View,Button } from 'react-native';
import {TabNavigator} from 'react-navigation';
import LockScreen from './lock';
import StatsScreen from './stats';
import TrajetsScreen from './trajets';
import ParamScreen from './param';
import Icon from 'react-native-vector-icons/FontAwesome';

const lockIcon = (<Icon name="lock" size={40} color='black' />)
const trajetIcon = (<Icon name="map" size={40} color='black' />)
const statIcon = (<Icon name="signal" size={40} color='black' />)
const paramIcon = (<Icon name="gear" size={40} color='black' />)

export const SuiteScreen = TabNavigator({
    A: { 
      screen: LockScreen ,
      navigationOptions:{
        tabBarLabel: <Text>{lockIcon}</Text>
      } 
    },
    TrajetsScreen:{
      screen:TrajetsScreen,
      navigationOptions:{
        tabBarLabel:<Text>{trajetIcon}</Text>
      }
    },
    StatsScreen :{
      screen:StatsScreen,
      navigationOptions:{
        tabBarLabel:<Text>{statIcon}</Text>
      }
    },
    ParamScreen : {
      screen:ParamScreen,
      navigationOptions:{
        tabBarLabel:<Text>{paramIcon}</Text>
      }
    }


},{tabBarPosition:"bottom",
  tabBarOptions:{
    pressColor: 'white',
    activeTintColor:'blue',
    indicatorStyle:{
      backgroundColor:'green',
      opacity:0.9,
      height:60
    },
      style:{
          backgroundColor:'green',
          opacity:0.5
      },
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