import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  ImageBackground
} from 'react-native';
import Header from '../Composants/header';
import styles from '../Styles/style.js';
import ModalTrajet from '../Composants/Modaux/modalTrajet.js';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

require('../ConnexionBD.js');

//récupère les dimension du mobile afin d'adapter l'image de fond
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

//Liste des clés de trajets présentes dans firebase
const listKey = [];
//Liste des trajets présents dans firebase
const listTrajets = [];
//Utilisé pour conserver l'id de l'utilisateur connecté
const id = '';
//liste des trajets (affichage)
const trajets = [];

class trajetsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //vérifie que la bd est chargée
      bdcharge: false
    };
  }
  //fonction appelée au chargement du composant qui récupère les trajets en BD
  componentWillMount = async () => {
    this.setState({ bdcharge: false });
    listKey = [];
    listTrajets = [];
    try {
      //récupère l'id de l'utilisateur connecté
      id = firebase.auth().currentUser.uid;
      let ref = firebase.database().ref(id + '/Trajets');
      //récupère les clés présentes sur chaque "noeud" dans la bd
      ref.on('child_added', data => {
        listKey.push(data.key);
      });
      //Récupère les valeurs en bd
      ref.on('value', data => {
        listTrajets = data.val();
        this.setState({ bdcharge: true });
      });
    } catch (error) {
      alert(error.toString());
    }
  };
  //crée une liste de l'affichage de chaque trajet
  maFonction() {
    if (this.state.bdcharge) {
      trajets = [];
      for (let i = 0; i < listKey.length; i++) {
        //récupère la date du trajet
        let dateNT = new Date(listTrajets[listKey[i]].day);
        //met la date sous forme dd/mm/yyyy
        let dateT =
          dateNT.getDate() +
          '/' +
          (dateNT.getMonth() + 1) +
          '/' +
          dateNT.getFullYear();
        //récupère la durée du trajet et la met sous la fome hh/minmin
        let dureeH = parseInt(parseInt(listTrajets[listKey[i]].time) / 60);
        let dureeMin = parseInt(listTrajets[listKey[i]].time) % 60;
        //Ajout du trajet dans la liste à afficher
        trajets.push(
          <TouchableHighlight style={styles.touchableHighlight} key={i}>
            <View>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: '90%' }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      fontSize: 20
                    }}
                  >
                    Trajet {i + 1}
                    {'\n'}
                  </Text>
                </View>
                <TouchableHighlight
                  onPress={() => {
                    this.deleteTrip(listKey[i]);
                  }}
                  underlayColor="#ff4d4d"
                >
                  <Icon name="trash-o" size={25} color="black" />
                </TouchableHighlight>
              </View>
              <Text style={{ marginLeft: '5%' }}>
                Distance : {listTrajets[listKey[i]].dist} km
              </Text>
              <Text style={{ marginLeft: '5%' }}>
                Durée : {dureeH}h{dureeMin}min
              </Text>
              <Text style={{ marginLeft: '5%' }}>Date : {dateT}</Text>
            </View>
          </TouchableHighlight>
        );
      }
      return trajets;
    } else {
      console.log('Waiting');
    }
  }
  //foncion appelée lors de la suppression d'un trajet
  deleteTrip(val) {
    try {
      //enlève l'élément dans firebase
      firebase
        .database()
        .ref(id + '/Trajets/' + val)
        .remove();
      //recharge le composant
      this.componentWillMount();
    } catch (error) {
      alert(error.toString());
    }
  }
  //masque le header généré à cause de la navigation
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
        <Header page="Trajets" />
        <ScrollView style={{ marginBottom: '20%' }}>
          <ModalTrajet
            ferme={() => this.componentWillMount()}
            trajets={listTrajets}
            cle={listKey}
          />
          {(this.state.bdcharge && this.maFonction()) || (
            <View
              style={{
                marginTop: '30%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" color="green" />
              <Text>Chargement</Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    );
  }
}
module.exports = trajetsScreen;
