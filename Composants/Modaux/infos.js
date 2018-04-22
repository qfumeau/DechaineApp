import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
  Dimensions,
  Button,
  ImageBackground
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

//Permet de se connecter à la bd firebase
require('../../ConnexionBD.js');

export default class ModalInfos extends React.Component {
  state = {
    //Etat du modal
    modalVisible: false,
    //mot de passe actuel correct
    mdpOk: false
  };
  //remet toutes les stats à 0 et supprime tous les trajets
  resetData() {
    //récupère l'id de l'utilisateur connecté
    let userId = firebase.auth().currentUser.uid;
    //liste des période disponibles en bd
    let tps = ['Jour', 'Mois', 'Semaine', 'Total'];
    //liste des types de données disponibles en bd
    let type = ['Eco', 'Distance', 'Co2', 'Cal'];
    let db = firebase.database();
    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < tps.length; j++) {
        db.ref(userId + '/' + type[i] + '/' + tps[j]).set(0);
      }
    }
    try {
      db.ref(userId + '/Trajets').remove();
    } catch (error) {}
  }
  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageBackground
            source={require('../../img/Infos2.png')}
            imageStyle={{ resizeMode: 'cover' }}
            style={{
              width: viewportWidth,
              height: viewportHeight
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{ fontSize: 30, marginTop: '10%', marginBottom: '10%' }}
              >
                Infos sur les statistiques
              </Text>
              <View style={styles.viewInfo}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginRight: '2%',
                    marginBottom: '10%',
                    fontSize: 20
                  }}
                >
                  Les calories ont été calculées en prennant 700cal pour une
                  heure de vélo .{'\n\n'}
                  Les économies de carburant ont été calculées en se basant sur
                  la consomation moyenne des véhicules fonctionnant à l'essence
                  et au gazole, ainsi que sur le prix moyen entre l'essence et
                  le gazole en France.{'\n\n'}
                  Les économies de Co2 dépensé ont été calculées en se basant
                  sur la production moyenne de Co2 d'un véhicule en France.
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '35%', marginRight: '2%' }}>
                    <Button
                      title="Reset Data"
                      style={{ marginLeft: '5%' }}
                      onPress={() => this.resetData()}
                    />
                  </View>
                  <View style={{ width: '35%', marginLeft: '2%' }}>
                    <Button
                      title="Merci !"
                      onPress={() => this.setState({ modalVisible: false })}
                      color="grey"
                    />
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Modal>
        <TouchableHighlight
          style={{
            backgroundColor: '#00b33c',
            height: 40,
            width: 150,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '3%'
          }}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              Infos{'   '}
            </Text>
            <Icon name="info" size={25} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInfos2: {
    fontSize: 20
  },
  viewInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
