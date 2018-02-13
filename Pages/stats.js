import React from 'react';
import { StyleSheet, Text,Image, View,TouchableHighlight,Button,StatusBar, ImageBackground } from 'react-native';
import Header from './header';

class StatScreen extends React.Component {
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
            <Header page='Mes stats'/>
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
              <Text style={{fontSize:30,fontWeight:'bold',marginTop:30}}>Vélo déverrouillé</Text>
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
    backgroundColor:'#A5D6A7'
  },
  conatiner3:{
    flex:1,
    flexDirection:'row',
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
  }
})
module.exports = StatScreen;