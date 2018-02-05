import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {StackNavigator} from 'react-navigation';
import SuiteScreen from './suite';
import LoginScreen from './home';

export const SimpleApp = StackNavigator({
  Home:{screen: LoginScreen},
  Suite: { screen: SuiteScreen },
});

export default class App extends React.Component {
  static navigationOptions={
    header:null
  }
  render() {
    return <SimpleApp />;
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

