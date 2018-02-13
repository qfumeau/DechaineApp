import React from 'react';
import { StyleSheet, Text,Image, ScrollView ,View,TouchableHighlight,Button,StatusBar, ImageBackground } from 'react-native';
import Header from './header';
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
        <View>
          <StatusBar hidden={true}/>
          <ImageBackground source={require('../img/lockScreen2.png')} style={{position:'absolute',}}>
            <Header page='Trajets'/>
            <ScrollView style={styles.scrollView}>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 1</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 2</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text>Trajet 3</Text>
              </TouchableHighlight>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }
}

const styles=StyleSheet.create({
  container:{
    height:50,
    width:'30%',
    backgroundColor:'#A5D6A7'
  },
  conatiner3:{
    flex:1,
    flexDirection:'row',backgroundColor:'grey'
    
  },
  container4:{
    height:50,
    width:50,
    backgroundColor:'#A5D6A7'
  },
  popupView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  cadenasView:{
    alignItems:'center',
    height:520
  },
  scrollView:{
    height:200,
    backgroundColor:'blue'
    /*alignItems:'center',
    justifyContent:'center'*/
  },
  touchableHighlight:{
    height:300
  }
})
module.exports = trajetsScreen;