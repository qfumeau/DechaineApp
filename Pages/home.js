import React from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  StatusBar,
  ActivityIndicator,
  Modal,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  View,
  Button,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import ModalSignUp from '../Composants/Modaux/signUp.js';
import RecupMdpModal from '../Composants/Modaux/recupMdpModal.js';
import timer from 'react-native-timer';
import * as firebase from 'firebase';

const adresseMailText = 'quentin.fumeau@hotmail.fr';
const mdp = '123456';
const FireBase = require('../ConnexionBD.js');

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  //vide des les champs pour que lors d'une déconnexion on ne puisse pas se reconnecter sans les reremplir
  componentWillMount(){
    /*adresseMailText="";
    mdp=""*/
  }
  constructor(props) {
    super(props);
    this.state = {
      mailAddress: '',
      leMdp: '',
      mailVide: false,
      mdpVide: false,
      name: '',
      leEmail: '',
      leMdp: '',
      bdPleine: true,
      bdCharge: false
    };
  }
  //Fonction permettant à l'utilisateur de se connecté en ayant rentré son adresse mail et son mot de passe
  connexion = async () => {
    //controle si les champs sont remplis
    if (adresseMailText == '' || mdp == '') {
      Alert.alert('Champ(s) vide(s)', 'Veuillez compléter tous les champs.', [
        { text: 'OK' }
      ]);
      if (adresseMailText == '') {
        this.setState({ mailVide: true });
      }
      if (mdp == '') {
        this.setState({ mdpVide: true });
      }
    } else {
      try {
        await firebase.auth().signInWithEmailAndPassword(adresseMailText, mdp);
        this.props.navigation.navigate('A');
      } catch (error) {
        alert(error.toString());
      }
    }
  };
  connexion2() {
    this.props.navigation.navigate('A');
  }
  render() {
    return (
      <ImageBackground
        source={require('../img/flowers.png')}
        style={{
          width: '100%',
          height: '110%',
          alignItems: 'center'
        }}
      >
        <StatusBar hidden={true} />
        <KeyboardAvoidingView style={styles.container2} behavior="padding">
          <Image
            source={require('../img/icone.png')}
            style={{
              marginTop: '15%',
              width: 193,
              height: 110,
              marginBottom: '15%'
            }}
          />

          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Entrez votre adresse mail :
          </Text>
          <TextInput
            style={{ width: '50%', height: 50, fontSize: 15 }}
            placeholder="Adresse mail"
            placeholderTextColor={(this.state.mailVide && 'red') || null}
            keyboardType={'email-address'}
            autoCorrect={false}
            underlineColorAndroid={(this.state.mailVide && 'red') || null}
            onChangeText={text => {
              //this.setState({mailAddress:text});
              adresseMailText = text;
            }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: '10%' }}>
            Entrez votre mot de passe :
          </Text>
          <TextInput
            style={{ width: '50%', height: 50, fontSize: 15 }}
            placeholder="Mot de passe"
            secureTextEntry={true}
            placeholderTextColor={(this.state.mdpVide && 'red') || null}
            underlineColorAndroid={(this.state.mdpVide && 'red') || null}
            onChangeText={text => {
              //this.setState({leMdp:text});
              mdp = text;
            }}
          />
          <RecupMdpModal />
          <Button
            onPress={() => this.connexion()}
            title="Connexion"
            color="#0B9002"
          />
          <ModalSignUp />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  container2: {
    width: '100%',
    height: '110%',
    alignItems: 'center',
    flex: 1
  },
  textInputs: {
    color: 'white',
    fontSize: 16
  },
  textMdpLost: {
    marginTop: 50,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

module.exports = LoginScreen;
