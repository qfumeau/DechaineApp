import React from 'react';
import { StyleSheet, Text,Image,View,TouchableHighlight,BackHandler,Button,StatusBar, Dimensions,ImageBackground, Alert } from 'react-native';
import Header from './header';
import styles from '../Styles/style.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class LockScreen extends React.Component {
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
          <ImageBackground source={require('../img/lockScreen.png')} imageStyle={{resizeMode:'cover'}} style={{width: viewportWidth,
            height: viewportHeight,}}>
            <StatusBar hidden={true}/>
            <Header page='Verrouillage'/>
            <View style={styles.cadenasView}>
              {this.state.cadenasOuvertVisible && 
                <TouchableHighlight style={{marginTop:50}} 
                  onPress={()=>{this.setState({
                    cadenasFermeVisible:true})
                    this.setState({cadenasOuvertVisible:false})
                    }}
                    underlayColor={null}
                    >
                  <Image source={require('../img/cadenasOuvert.png')} style={{width:200,height:220,}}/>
                </TouchableHighlight> ||
                <TouchableHighlight style={{marginTop:50}}
                  onPress={()=>{this.setState({
                  cadenasFermeVisible:false})
                  this.setState({cadenasOuvertVisible:true})
                  }}
                  underlayColor={null}>
                  <Image source={require('../img/cadenasFerme.png')} style={{width:200,height:220}}/>
                </TouchableHighlight>
              }
              {this.state.cadenasOuvertVisible && 
                <Text style={{fontSize:30,fontWeight:'bold',marginTop:30}}>Vélo déverrouillé</Text>||
                <Text style={{fontSize:30,fontWeight:'bold',marginTop:30}}>Vélo verrouillé</Text>
              }
            </View>
          </ImageBackground>
        );
    }
}


module.exports = LockScreen;