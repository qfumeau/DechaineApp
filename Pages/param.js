import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Alert,
  View,
  Switch,
  BackHandler,
  TouchableHighlight,
  Button,
  Dimensions,
  StatusBar,
  ImageBackground
} from 'react-native';
import Header from '../Composants/header';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import VolumeSlider from '../Composants/volume.js';
import NewMdpModal from '../Composants/Modaux/newMdpModal.js';

require('../ConnexionBD.js');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

class ParamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //permet de passer le switch sur validé ou non
      ok: false
    };
  }
  //permet de se déconnecter de l'application renvoie une erreur en cas d'échec
  logOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log('on se casse');
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //permet d'afficher une alerte demandant à l'utilisateur une confirmation de déconnexion
  goBackHome() {
    Alert.alert(
      'Déconnexion',
      'Vous êtes sur le point de vous déonnecter.\nVoulez-vous continuer ?',
      [
        { text: 'Annuler' },
        {
          text: 'OK',
          onPress: () => {
            this.logOut(), this.props.navigation.navigate('Home');
          }
        }
      ]
    );
  }
  newPassword(){
    firebase.auth().currentUser.updatePassword('1234567').then(function(){
      alert('Mot de passe modifié')
    }).catch(function(error){
      alert(error)
    })
  }
  supprAccount(){
    Alert.alert(
      'Déconnexion',
      'Vous êtes sur le point de supprimer votre compte.\nCette opération est irréversible\nEt entraînera la perte de toutes vos données\nVoulez-vous continuer ?',
      [
        { text: 'Annuler' },
        {
          text: 'OK',
          onPress: () => {
            this.deleteAccount(),this.props.navigation.navigate('Home')
          }
        }
      ]
    );
  }
  deleteAccount(){
    firebase.auth().currentUser.delete().then(
      Alert.alert('Compte Supprimé','Votre compte a bien été supprimé')
).catch((error)=> {
  alert(error.toString())
});
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ImageBackground
        source={require('../img/lockScreen2.png')}
        style={{
          width: viewportWidth,
          height: viewportHeight
        }}
      >
        <StatusBar hidden={true} />
        <Header page="Paramètres" />
        <View style={{ alignItems: 'center', marginTop: '5%' }}>
          <Text style={{ fontSize: 25 }}>Volume des notifications</Text>
          <View style={styles.ligne} />
          <VolumeSlider style={{ marginBottom: '5%' }} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25 }}>Notifications</Text>
          <View style={styles.ligne} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, marginRight: '5%' }}>
              Activer/Désactiver
            </Text>
            <Switch
              value={this.state.ok}
              onValueChange={() => this.setState({ ok: !this.state.ok })}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center' , marginTop:'10%'}}>
          <Text style={{ fontSize: 25 }}>Mon compte</Text>
          <View style={styles.ligneCompte} />
          <NewMdpModal />
          <View style={{flexDirection:'row'}}>
          <TouchableHighlight
            style={{
              width: "45%",
              height: "50%",
              backgroundColor: 'grey',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              this.goBackHome();
            }}
          >
            <View style={{ flexDirection:'row' }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}
              >
                Déconnexion{'  '}
              </Text>
              <Icon name="sign-out" size={25} color="white" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: "45%",
              height: "50%",
              backgroundColor: 'white',
              borderRadius: 10,
             // borderColor:'red',
              //borderWidth:2,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:'5%'
            }}
            onPress={() => {
              this.supprAccount();
            }}
          >
            <View style={{ flexDirection:'row' }}>
              <Text
                style={{ /*fontWeight: 'bold',*/ fontSize: 20, color: 'red' }}
              >
                Supprimer{'  '}
              </Text>
              <Icon name="remove" size={25} color="red" />
            </View>
          </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  ligne: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: '5%',
    marginBottom: '5%'
  },
  ligneCompte:{
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: '5%',
  }
});
module.exports = ParamScreen;
