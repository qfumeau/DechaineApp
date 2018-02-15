import React from 'react';
import { StyleSheet, Text,Image, View,TouchableHighlight,Button,Dimensions,StatusBar, ImageBackground } from 'react-native';
import Header from './header';
import styles from '../Styles/style.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ParamScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cadenasOuvertVisible:true,
      cadenasFermeVisible:false
    }
  }
    static navigationOptions = {
      header:null,
    };
    render() {
      return (
          <ImageBackground source={require('../img/lockScreen2.png')} style={{width: viewportWidth,
            height: viewportHeight,}}>
            <StatusBar hidden={true}/>
            <Header page='Paramètres'/>
          </ImageBackground>
      );
    }
}
module.exports = ParamScreen;