import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Modal,
  View,
  TouchableHighlight,
  Dimensions,
  Alert,
  Picker,
  Button,
  ImageBackground,
  TextInput
} from 'react-native';
import styles from '../../Styles/style.js';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
const actuMdp = '';
const nvMdp = '';
const confMdp = '';

//Permet de se connecter à la bd firebase
require('../../ConnexionBD.js');

export default class NewMdpModal extends React.Component {
  state = {
    //Etat du modal
    modalVisible: false,
    mdpOk: false
  };
  //permet de vérifier si le mot de passe actuel de l'utilisateur est correct
  Verif() {
    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          actuMdp
        )
      )
      .then(this.changePass())
      .catch(function(error) {
        alert(error.toString());
      });
  }
  //permet de changer de mot de passe
  changePass() {
    //vérifie que les 2 mots de passe ne sont pas vides
    if (nvMdp != '' && confMdp != '') {
      //vérifie que les 2 mots de passe sont égaux
      if (nvMdp == confMdp) {
        firebase
          .auth()
          .currentUser.updatePassword(nvMdp)
          .then(function() {
            alert('Mot de passe modifié');
          })
          .catch(function(error) {
            alert(error);
          });
        this.setState({ modalVisible: false });
      } else {
        Alert.alert(
          'Mauvais mot de passe',
          'Les deux mots de passes ne correspondent pas.'
        );
      }
    } else {
      Alert.alert('Champ manquants', 'Veuillez saisir tous les champs.');
    }
  }
  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageBackground
            source={require('../../img/trip.png')}
            imageStyle={{ resizeMode: 'cover' }}
            style={{
              width: viewportWidth,
              height: viewportHeight
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 30, marginTop: '15%' }}>
                Changement de
              </Text>
              <Text style={{ fontSize: 30, marginBottom: '5%' }}>
                {' '}
                mot de passe
              </Text>
              <Text>Mot de passe actuel : </Text>
              <TextInput
                style={styles.textInputStandard}
                placeholderTextColor="grey"
                placeholder="Mot de passe actuel"
                onChangeText={text => (actuMdp = text)}
                secureTextEntry={true}
              />
              <Text>Nouveau mot de passe : </Text>
              <TextInput
                style={styles.textInputStandard}
                placeholderTextColor="grey"
                placeholder="Nouveau mot de passe"
                onChangeText={text => (nvMdp = text)}
                secureTextEntry={true}
              />
              <Text>Confirmation du mot de passe : </Text>
              <TextInput
                style={styles.textInputStandard}
                placeholderTextColor="grey"
                placeholder="Confirmation du mot de passe"
                onChangeText={text => (confMdp = text)}
                secureTextEntry={true}
              />
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: '59%',
                    flex: 1,
                    flexDirection: 'row',
                    maxHeight: 35,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      maxWidth: 140,
                      paddingLeft: 20,
                      alignItems: 'center'
                    }}
                  >
                    <Button
                      onPress={() => this.setState({ modalVisible: false })}
                      title="Annuler"
                      style={{ flex: 1, marginRight: 5, paddingRight: 20 }}
                      color={'grey'}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      maxWidth: 140,
                      paddingLeft: 20,
                      alignItems: 'center'
                    }}
                  >
                    <Button onPress={() => this.Verif()} title="Valider" />
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Modal>
        <TouchableHighlight
          style={{
            backgroundColor: '#1a75ff',
            height: 40,
            width: 165,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '4%'
          }}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              Changer mdp{'   '}
            </Text>
            <Icon name="edit" size={25} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
