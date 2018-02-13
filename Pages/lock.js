import React from 'react';
import { StyleSheet, Text,Image,View,TouchableHighlight,BackHandler,Button,StatusBar, ImageBackground, Alert } from 'react-native';
import Header from './header';

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
    componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', function() {
        Alert.alert('Coucou');
      })}
    render() {
      return (
        <View>
          <StatusBar hidden={true}/>
          <ImageBackground source={require('../img/lockScreen.png')} imageStyle={{resizeMode:'cover'}} style={{position:'absolute'}}>
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
        </View>
      );
    }
}

const styles=StyleSheet.create({
  container:{
    height:50,
    width:'25%',
    backgroundColor:'green',
    opacity:0.5
  },
  conatiner3:{
    flex:1,
    flexDirection:'row',
  },
  container4:{
    height:50,
    width:50,
    backgroundColor:'green',
    opacity:0.5
  },
  popupView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  cadenasView:{
    alignItems:'center',
    height:520
  }
})
module.exports = LockScreen;