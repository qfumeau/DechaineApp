import React from 'react';
import { StyleSheet, Text,Image, ScrollView ,View,TouchableHighlight,Dimensions,Button,StatusBar, ImageBackground } from 'react-native';
import Header from './header';
import styles from '../Styles/style.js';
import ModalTrajet from '../Modaux/modalTrajet.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class trajetsScreen extends React.Component {
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
            <Header page='Trajets'/>
            <ScrollView>
              <ModalTrajet/>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 1</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 2</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 3</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 4</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 5</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.finalTouchableHighlight}>
                <Text>Trajet 6</Text>
              </TouchableHighlight>
            </ScrollView>
          </ImageBackground>
      );
    }
}
module.exports = trajetsScreen;