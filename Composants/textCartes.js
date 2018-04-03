import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator
} from 'react-native';
import styles from '../Styles/style.js';
import * as firebase from 'firebase';

require('../ConnexionBD.js');
const J = null;
const S = null;
const M = null;
const T = null;

export default class TextCarte extends React.Component {
  state = {
    chargeOk: false
  };
  componentWillMount = async () => {
    try {
      let leUid = firebase.auth().currentUser.uid;
      let database = firebase.database();
      database.ref(leUid + '/' + this.props.code).on('value', data => {
        (J = data.val().Jour),
          (S = data.val().Semaine),
          (M = data.val().Mois),
          (T = data.val().Total);
        this.setState({ chargeOk: true });
      });
    } catch (error) {
      console.log(error.toString());
    }
  };
  addUnity() {
    if (this.props.code == 'Distance') {
      return ' km';
    } else {
      if (this.props.code == 'Eco') {
        return ' €';
      } else {
        if (this.props.code == 'Cal') {
          return ' kCal';
        } else {
          if (this.props.code == 'Co2') {
            return ' kg';
          } else {
            return '';
          }
        }
      }
    }
  }
  render() {
    return (
      <View>
        {(this.state.chargeOk && (
          <View style={styles.vueTextCard}>
            <Text style={styles.titreTextCard}>{this.props.carte}</Text>
            <Text style={styles.sousTitreCarte}>
              Journée :
              <Text style={styles.infoTextCarte}>
                {' ' + J + this.addUnity()}
              </Text>
            </Text>
            <Text style={styles.sousTitreCarte}>
              Semaine :
              <Text style={styles.infoTextCarte}>
                {' ' + S + this.addUnity()}
              </Text>
            </Text>
            <Text style={styles.sousTitreCarte}>
              Mois :
              <Text style={styles.infoTextCarte}>
                {' ' + M + this.addUnity()}
              </Text>
            </Text>
            <Text style={styles.sousTitreCarte}>
              Tout :
              <Text style={styles.infoTextCarte}>
                {' ' + T + this.addUnity()}
              </Text>
            </Text>
          </View>
        )) || (
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
      </View>
    );
  }
}
