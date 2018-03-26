import React from 'react';
import { StyleSheet, Text,Image, View,BackHandler,TouchableHighlight,Button,Dimensions,StatusBar, ImageBackground } from 'react-native';
import Header from './header';
import styles from '../Styles/style.js';
import * as firebase from 'firebase';

require('../ConnexionBD.js');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ParamScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cadenasOuvertVisible:true,
      cadenasFermeVisible:false
    }
  }
  logOut(){
    firebase.auth().signOut().then(function() {
      console.log('on se casse')
      BackHandler.exitApp();
    }).catch(function(error) {
      console.log(error)
    });
    
  }
    static navigationOptions = {
      header:null,
    };
    render() {
      return (
          <ImageBackground source={require('../img/lockScreen2.png')} style={{width: viewportWidth,
            height: viewportHeight}}>
            <StatusBar hidden={true}/>
            <Header page='Paramètres'/>
            <TouchableHighlight
              style={{width:'30%',height:'15%',backgroundColor:'grey',
                borderRadius:20,alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.logOut()}
              >
              <Text>Déconnexion</Text>
            </TouchableHighlight>
          </ImageBackground>
      );
    }
}
module.exports = ParamScreen;