import React from 'react';
import { StyleSheet, Text,Image,View,ToastAndroid,TouchableHighlight,BackHandler,Button,StatusBar, Dimensions,ImageBackground, Alert } from 'react-native';
import MapView from 'react-native-maps';
import Header from './header';
import styles from '../Styles/style.js';
import Map from '../Modaux/map.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class LockScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cadenasOuvertVisible:true,
      cadenasFermeVisible:false,
      modal:false,
    }
  }
  componentDidMount(){
    ToastAndroid.show('Bienvenue sur Dé-chaine !',5000)
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
                <TouchableHighlight
                  onPress={()=>{this.setState({
                    cadenasFermeVisible:true})
                    this.setState({cadenasOuvertVisible:false})
                    }}
                    underlayColor={null}
                    >
                  <Image source={require('../img/cadenasOuvert.png')} style={{width:200,height:220,}}/>
                </TouchableHighlight> ||
                <TouchableHighlight
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
              <TouchableHighlight
                style={{width:'90%',justifyContent:'center',height:'7%',backgroundColor:'rgba(52, 52, 52, 0.8)',marginLeft:'5%',alignItems:'center'}}
                >
                <Text style={{fontSize:25,color:'white',opacity:1,fontWeight:'bold'}}>Position de mon vélo</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{width:'90%',height:'30%',marginLeft:'5%',borderColor:'rgba(52, 52, 52, 0.8)',borderWidth:2}}
                >
                <MapView
                  style={{width:'100%',height:'100%'}}
                  onPress={()=>this.setState({modal:true})}
                />
              </TouchableHighlight>
              {this.state.modal&&<Map ouvert={true}/>}
          </ImageBackground>
        );
    }
}


module.exports = LockScreen;