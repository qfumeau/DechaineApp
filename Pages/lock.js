import React from 'react';
import { StyleSheet, Platform,Text,ActivityIndicator,Image,View,ToastAndroid,TouchableHighlight,BackHandler,Button,StatusBar, Dimensions,ImageBackground, Alert } from 'react-native';
import MapView from 'react-native-maps';
import Header from './header';
import styles from '../Styles/style.js';
import Map from '../Modaux/map.js';
import {Constants, Location, Permissions } from 'expo';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const maPosition=null;
const markerPosition=null;

class LockScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cadenasOuvertVisible:true,
      cadenasFermeVisible:false,
      modal:false,
      location: null,
      errorMessage: null,
      showCarte:false,
    }
  }
  componentWillMount(){
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }
  componentDidMount(){
    ToastAndroid.show('Bienvenue sur Dé-chaine !',5000)
  }
    static navigationOptions = {
      header:null,
    };
    getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
        alert('Permission denied');
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
      this.setState({showCarte:true})
    };
    render() {
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        maLatitude=this.state.location.coords.latitude;
        maLongitude=this.state.location.coords.longitude;
        maPosition={
          latitude: maLatitude,
          longitude: maLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }
        markerPosition={
          latitude: maLatitude,
          longitude: maLongitude,
        }
      }
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
                onPress={()=>this.setState({modal:false})}
                >
                <Text style={{fontSize:25,color:'white',opacity:1,fontWeight:'bold'}}>Position de mon vélo</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{width:'90%',height:'30%',marginLeft:'5%',borderColor:'rgba(52, 52, 52, 0.8)',borderWidth:2}}
                onPress={()=>this.setState({modal:true})}
                >
                {this.state.showCarte && 
                  <MapView style={{width:"100%",height:'80%'}}
                    initialRegion={maPosition}
                  >
                    <MapView.Marker
                        coordinate={markerPosition}
                        title={"title"}
                        description={"description"}
                    />
                  </MapView>
                  ||<View style={{alignItems:'center'}}>
                  <ActivityIndicator size="large" color="green"/>
                  <Text>Waiting map</Text>
                </View>
                }
              </TouchableHighlight>
              {this.state.modal&&<Map positionMarker={markerPosition} myPosition={maPosition} ouvert={true}/>}
          </ImageBackground>
        );
    }
}


module.exports = LockScreen;