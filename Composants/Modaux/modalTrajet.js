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
  ImageBackground
} from 'react-native';
import styles from '../../Styles/style.js';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

//Permet de se connecter à la bd firebase
require('../../ConnexionBD.js');

//nb de km du trajet
const lesKm = '0';
//nb de m du trajet
const lesM = '0';
//nb heure du trajet
const lesH = '0';
//nb min du trajet
const lesMin = '0';
//duree du trajet
const duree = '0';
//distance du trajet
const distance = '0';
//date du trajet initialisée à celle du jour actuel
const maDate = new Date();
//Stocke l'id de l'utilisateur connecté
const userId = '';
//incone de calendrier
const calendarIcon = <Icon name="calendar" size={40} color="black" />;
//liste utilisée pour les pickers
const data = [];
//variables utilisées pour le calcul des statistiques
const Jc = null;
const Sc = null;
const Mc = null;
const Tc = null;
const Je = null;
const Se = null;
const Me = null;
const Te = null;
const Jco = null;
const Sco = null;
const Mco = null;
const Tco = null;
const Jd = null;
const Sd = null;
const Md = null;
const Td = null;

//Booléens utilsiés pour vérifier s'il existe ou non un trajet réaliser au jour actuel
const moisEx = false;
const jourEx = false;
const semaineEx = false;

//récupère la date actuelle
const toDay = new Date();
//ajout de valeurs de 0 à 99 pour les pickers
for (let i = 0; i < 100; i++) {
  data.push(i);
}

export default class ModalTrajet extends React.Component {
  state = {
    //Etat du modal
    modalVisible: false,
    //affiche ou non un text grisé dans les zones de saisie
    placeholderVisible1: 'Distance',
    placeholderVisible2: 'Durée',
    placeholderVisible3: 'Date',
    dateVisible: false,
    km: 0,
    m: 0,
    h: 0,
    min: 0
  };
  //fonction appelée au chargement du composant, récupère les valeurs de chaque données pour chaque durée j/s/m/t
  componentWillMount = async () => {
    //récupère l'id de l'utilisateur
    userId = firebase.auth().currentUser.uid;
    try {
      let database = firebase.database();
      //récupère les valeurs pour la donnée calories
      database.ref(userId + '/Cal').on('value', data => {
        (Jc = data.val().Jour),
          (Sc = data.val().Semaine),
          (Mc = data.val().Mois),
          (Tc = data.val().Total);
      });
      //récupère les valeurs pour la donnée Economie
      database.ref(userId + '/Eco').on('value', data => {
        (Je = data.val().Jour),
          (Se = data.val().Semaine),
          (Me = data.val().Mois),
          (Te = data.val().Total);
      });
      //récupère les valeurs pour la donnée distance
      database.ref(userId + '/Co2').on('value', data => {
        (Jco = data.val().Jour),
          (Sco = data.val().Semaine),
          (Mco = data.val().Mois),
          (Tco = data.val().Total);
      });
      //récupère les valeurs pour la donnée Co2
      database.ref(userId + '/Distance').on('value', data => {
        (Jd = data.val().Jour),
          (Sd = data.val().Semaine),
          (Md = data.val().Mois),
          (Td = data.val().Total);
      });
    } catch (error) {
      alert(error.toString());
    }
  };
  //Vérification de l'existance d'un autre trajet relatif à la date actuelle
  existData() {
    if (this.props.trajets) {
      for (let i = 0; i < this.props.trajets.length; i++) {
        //vérifie que l'année existe
        if (
          toDay.getFullYear() ==
          this.props.trajets[this.props.cle[i]].getFullYear()
        ) {
          //vérifie que le mois existe
          if (
            toDay.getMonth() == this.props.trajets[this.props.cle[i]].getMonth()
          ) {
            moisEx = true;
            //vérifie que c'est le même jour
            if (
              toDay.getDate() == this.props.trajets[this.props.cle[i]].getDate()
            ) {
              jourEx = true;
            }
            //vérifie que c'est la même semaine
            if (
              toDay.getDate() - 7 <
                this.props.trajets[this.props.cle[i]].getDate() ||
              toDay.getDate() + 7 >
                this.props.trajets[this.props.cle[i]].getDate()
            ) {
              semaineEx = true;
            }
          }
        }
      }
    }
  }
  //fonction appelée pour créer un trajet
  infos() {
    //converti la date pour qu'elle soit prise en compte par firebase
    let laDate = maDate.getTime();
    //crée l'objet à ajouter en bd
    let trajet = {
      dist: distance,
      time: duree,
      day: laDate
    };
    //contrôle qu'un distance et une durée non nuls ont été saisis
    if (distance != '00' && duree != '00') {
      //essaie d'ajouter le trajet dans firebase et renvoie une alert avec l'erreur responsable de l'échec sinon
      try {
        firebase
          .database()
          .ref(userId + '/Trajets')
          .push(trajet);
        Alert.alert('Trajet', 'Votre trajet a bien été ajouté !', [
          { text: 'OK', onPress: () => this.closeModal() }
        ]);
      } catch (error) {
        alert(error);
      }
    } else {
      //alerte signifiant à l'utilisateur que tous les champs n'ont pas été saisis
      alert('Champs vides');
    }
  }
  //Fonction de calcul des statistiques
  calculs() {
    //appel de la fonction de vérification de date éxistante
    this.existData();
    //mise en forme des données
    distance = '' + (lesKm + lesM * 0.001);
    let calcDuree = parseInt(lesH) * 60 + parseInt(lesMin);
    duree = calcDuree;
    //calcul des stats
    let lesCal = (lesH * 700 + lesMin * 11.5) / 1000;
    let lesEco = lesKm * 0.07 * 1.43;
    let leCo2 = (124 * lesKm + 0.124 * lesM) / 1000;
    //boléen pour vérifier que la date correspond à celle actuelle
    let jour = false;
    let semaine = false;
    let mois = false;
    let annee = false;
    //compare les années
    if (maDate.getFullYear() == toDay.getFullYear()) {
      annee = true;
      //compare les mois
      if (maDate.getMonth() == toDay.getMonth()) {
        mois = true;
        //compare les dates
        if (maDate.getDay() == toDay.getDay()) {
          jour = true;
          semaine = true;
          if (
            maDate.getDate() >= toDay.getDate() - 7 &&
            maDate.getDate() <= toDay.getDate() + 7
          )
            semaine = true;
        }
      }
    }
    if (mois) {
      //si le mois n'existe pas remise à 0 des stats mois
      if (!moisEx) {
        Mc = 0;
        Mco = 0;
        Md = 0;
        Mj = 0;
        Jc = 0;
        Jco = 0;
        Je = 0;
        Jd = 0;
        Sc = 0;
        Sco = 0;
        Sd = 0;
        Sj = 0;
      }
      if (!semaineEx) {
        //si la semaine n'existe pas remise à 0 des stats semaine
        Sc = 0;
        Sco = 0;
        Sd = 0;
        Sj = 0;
      }
      //Ajout des données
      let c = (lesCal + parseFloat(Mc)).toFixed(3);
      let e = (lesEco + parseFloat(Me)).toFixed(2);
      let co = (leCo2 + parseFloat(Mco)).toFixed(3);
      let d = (parseFloat(distance) + parseInt(Md)).toFixed(3);
      firebase
        .database()
        .ref(userId + '/Cal/Mois')
        .set(c);
      firebase
        .database()
        .ref(userId + '/Eco/Mois')
        .set(e);
      firebase
        .database()
        .ref(userId + '/Co2/Mois')
        .set(co);
      firebase
        .database()
        .ref(userId + '/Distance/Mois')
        .set(d);
    }
    if (jour) {
      if (!jourEx) {
        //si le jour n'existe pas remise à 0 des stats jour
        Jc = 0;
        Jco = 0;
        Je = 0;
        Jd = 0;
      }
      let c = (lesCal + parseFloat(Jc)).toFixed(3);
      let e = (lesEco + parseFloat(Je)).toFixed(2);
      let co = (leCo2 + parseFloat(Jco)).toFixed(3);
      let d = (parseFloat(distance) + parseFloat(Jd)).toFixed(3);
      firebase
        .database()
        .ref(userId + '/Cal/Jour')
        .set(c);
      firebase
        .database()
        .ref(userId + '/Eco/Jour')
        .set(e);
      firebase
        .database()
        .ref(userId + '/Co2/Jour')
        .set(co);
      firebase
        .database()
        .ref(userId + '/Distance/Jour')
        .set(d);
    }
    if (semaine) {
      if (!semaineEx) {
        //si la semaine n'existe pas remise à 0 des stats semaine
        Sc = 0;
        Sco = 0;
        Sd = 0;
        Sj = 0;
      }
      let c = (lesCal + parseFloat(Sc)).toFixed(3);
      let e = (lesEco + parseFloat(Se)).toFixed(2);
      let co = (leCo2 + parseFloat(Sco)).toFixed(3);
      let d = (parseFloat(distance) + parseFloat(Sd)).toFixed(3);
      firebase
        .database()
        .ref(userId + '/Cal/Semaine')
        .set(c);
      firebase
        .database()
        .ref(userId + '/Eco/Semaine')
        .set(e);
      firebase
        .database()
        .ref(userId + '/Co2/Semaine')
        .set(co);
      firebase
        .database()
        .ref(userId + '/Distance/Semaine')
        .set(d);
    }
    let c = (lesCal + parseFloat(Tc)).toFixed(3);
    let e = (lesEco + parseFloat(Te)).toFixed(2);
    let co = (leCo2 + parseFloat(Tco)).toFixed(3);
    let d = (parseFloat(distance) + parseFloat(Td)).toFixed(3);
    firebase
      .database()
      .ref(userId + '/Cal/Total')
      .set(c);
    firebase
      .database()
      .ref(userId + '/Eco/Total')
      .set(e);
    firebase
      .database()
      .ref(userId + '/Co2/Total')
      .set(co);
    firebase
      .database()
      .ref(userId + '/Distance/Total')
      .set(d);
    this.infos();
  }
  //Crée un picker permettant de choisir le nb de kilomètres parcourus de 0 à 100
  pickerKm() {
    const nbKm = [];
    for (i = 0; i <= 100; i++) {
      nbKm.push(
        <Picker.Item label={'' + i + ' kilomètres'} value={i} key={i} />
      );
    }
    return nbKm;
  }
  //Crée un picker permettant de choisir le nb de mètres parcourus de 0 à 900 par pas de 100
  pickerM() {
    const nbM = [];
    for (i = 0; i < 10; i++) {
      nbM.push(
        <Picker.Item label={'' + i * 100 + ' mètres'} value={i * 100} key={i} />
      );
    }
    return nbM;
  }
  //Crée un picker permettant de choisir combien d'heures le trajet à duré de 0 à 23
  pickerH() {
    const nbKm = [];
    for (i = 0; i < 23; i++) {
      nbKm.push(<Picker.Item label={'' + i + ' heures'} value={i} key={i} />);
    }
    return nbKm;
  }
  //Crée un picker permettant de choisir combien de minutes le trajet à duré de 0 à 23
  pickerMin() {
    const nbM = [];
    for (i = 0; i < 60; i++) {
      nbM.push(<Picker.Item label={'' + i + ' minutes'} value={i} key={i} />);
    }
    return nbM;
  }
  //fonction appelée pour la fermeture du modal
  closeModal() {
    this.setState({ modalVisible: false });
    this.props.ferme();
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
              <Text
                style={{ fontSize: 30, marginTop: '15%', marginBottom: '5%' }}
              >
                Ajouter un trajet
              </Text>
              <Text style={{ fontSize: 20 }}>
                Renseignez les informations du trajet
              </Text>
              <Text style={{ fontSize: 20, marginBottom: '10%' }}>
                que vous voulez ajouter à votre profil
              </Text>
              <Text style={{ fontSize: 15 }}>Distance parcourrue : </Text>
              <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                <View style={{ width: '50%', height: 50 }}>
                  <Picker
                    style={{ width: '100%', height: '100%' }}
                    selectedValue={this.state.km}
                    onValueChange={value => {
                      this.setState({ km: value }), (lesKm = value);
                    }}
                  >
                    {this.pickerKm()}
                  </Picker>
                </View>
                <View style={{ width: '50%', height: 50 }}>
                  <Picker
                    style={{ width: '100%', height: '100%' }}
                    selectedValue={this.state.m}
                    onValueChange={value => {
                      this.setState({ m: value }), (lesM = value);
                    }}
                  >
                    {this.pickerM()}
                  </Picker>
                </View>
              </View>
              <Text style={{ fontSize: 15, marginBottom: '10%' }}>
                Durée du trajet :
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', height: 50 }}>
                  <Picker
                    style={{ width: '100%', height: '100%' }}
                    selectedValue={this.state.h}
                    onValueChange={value => {
                      this.setState({ h: value }), (lesH = value);
                    }}
                  >
                    {this.pickerH()}
                  </Picker>
                </View>
                <View style={{ width: '50%', height: 50 }}>
                  <Picker
                    style={{ width: '100%', height: '100%' }}
                    selectedValue={this.state.min}
                    onValueChange={value => {
                      this.setState({ min: value }), (lesMin = value);
                    }}
                  >
                    {this.pickerMin()}
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: '5%',
                  marginTop: '5%'
                }}
              >
                <Text style={{ marginRight: '10%', fontSize: 25 }}>
                  Date :{' '}
                </Text>
                <TouchableHighlight
                  underlayColor={null}
                  onPress={() => this.setState({ dateVisible: true })}
                >
                  <Icon name="calendar" size={40} color="black" />
                </TouchableHighlight>
              </View>
              <DateTimePicker
                isVisible={this.state.dateVisible}
                datePickerModeAndroid={'calendar'}
                onConfirm={date => {
                  maDate = date;
                  this.setState({ dateVisible: false });
                }}
                onCancel={() => this.setState({ dateVisible: false })}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: '5%' }}>
                  <Button
                    title="Annuler"
                    color="grey"
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}
                  />
                </View>
                <View>
                  <Button title="Ajouter" onPress={() => this.calculs()} />
                </View>
              </View>
            </View>
          </ImageBackground>
        </Modal>
        <TouchableHighlight
          style={styles.creerTrajetButton}
          onPress={() => this.setState({ modalVisible: true })}
          underlayColor={null}
        >
          <Text style={styles.creerTrajetText}>Ajouter un trajet ?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
