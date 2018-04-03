import React from 'react';
import { StyleSheet, Text,Image,Alert,View,Switch,BackHandler,TouchableHighlight,Button,Dimensions,StatusBar, ImageBackground } from 'react-native';
import Header from '../Composants/header';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import VolumeSlider from '../Composants/volume.js';


require('../ConnexionBD.js');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ParamScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      //permet de passer le switch sur validé ou non
      ok:false,
    }
  }
  //permet de se déconnecter de l'application renvoie une erreur en cas d'échec
  logOut(){
    firebase.auth().signOut().then(function() {
      console.log('on se casse')
    }).catch(function(error) {
      console.log(error)
    });
    
  }
  //permet d'afficher une alerte demandant à l'utilisateur une confirmation de déconnexion
  goBackHome(){
    Alert.alert(
      'Déconnexion',
      'Vous êtes sur le point de vous déonnecter.\nVoulez-vous continuer ?',
      [
          {text:'Annuler'}  ,
          {text:'OK',onPress:()=>{
            this.logOut(),
            this.props.navigation.navigate('Home')
          },}
      ]
  );
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
            <View style={{alignItems:'center',marginTop:'5%'}}>
              <Text style={{fontSize:25}}>Volume des notifications</Text>
              <View
                style={styles.ligne}/>
              <VolumeSlider style={{marginBottom:'10%'}}/>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:25}}>Notifications</Text>
              <View style={styles.ligne}/>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:20,marginRight:'5%'}}>Activer/Désactiver</Text>
                <Switch
                  value={this.state.ok}
                  onValueChange={() => this.setState({ok:!this.state.ok})}
                  style={{
                    //marginRight:'60%'
                  }}
                  />
              </View>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:25}}>Mon compte</Text>
              <View style={styles.ligne}/>
              <TouchableHighlight
              style={{width:100,height:80,backgroundColor:'grey',
              borderRadius:20,alignItems:'center',justifyContent:'center'}}
              onPress={()=>{
                this.goBackHome()
              }}
              >
              <View style={{alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:15,color:'white'}}>Déconnexion</Text>
                <Icon name="sign-out" size={40} color='white'/>
              </View>
            </TouchableHighlight>
            </View>
            
            
          </ImageBackground>
      );
    }
}


const styles=StyleSheet.create({
  ligne:{
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    width:'100%',
    marginTop:'5%',
    marginBottom:'10%'
  }
})
module.exports = ParamScreen;