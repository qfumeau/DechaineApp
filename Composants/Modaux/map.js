import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
  ImageBackground
} from 'react-native';
import MapView from 'react-native-maps';
import LockScreen from '../../Pages/lock.js';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    //state utilisé pour signifier le chargement correct ou non de la carte
    modalVisible: this.props.ouvert
  };
  //Fonction qui permet de fermer le modal et de renvoyer le state à la vue mère
  closeModal() {
    this.setState({ modalVisible: false });
    this.props.activeModal();
  }
  //Méthode appelée au chargement du composant
  componentWillMount() {
    StatusBar.setHidden(false);
  }
  render() {
    return (
      <Modal
        transparent={this.props.mapCharge}
        animationType={'fade'}
        visible={this.state.modalVisible}
        onRequestClose={() => this.closeModal()}
      >
        {(this.props.mapCharge && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(25,25,25,0.5)'
            }}
          >
            <MapView
              style={{ width: '80%', height: '80%' }}
              initialRegion={this.props.myPosition}
            >
              <MapView.Marker
                coordinate={this.props.positionMarker}
                image={require('../../img/markerBike.png')}
                title={'Mon vélo'}
                description={'Potision de votre vélo'}
              />
            </MapView>
            <TouchableHighlight
              onPress={() => this.closeModal()}
              style={{
                width: '50%',
                backgroundColor: 'grey',
                alignItems: 'center',
                marginTop: '10%',
                borderRadius: 20
              }}
            >
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
              >
                Fermer la carte
              </Text>
            </TouchableHighlight>
          </View>
        )) || (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0078d7',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                marginBottom: '10%',
                color: 'white'
              }}
            >
              :( Erreur Carte
            </Text>
            <Text style={styles.textErreur}>Une erreur est survenue lors</Text>
            <Text style={styles.textErreur}>
              de l'affichage de la carte.{'\n\n'}
            </Text>
            <Text style={styles.textErreur}>
              Cela peut être dû à un problème
            </Text>
            <Text style={styles.textErreur}>de géolocalisation</Text>
            <Text style={styles.textErreur}>
              ou à une erreur interne.{'\n\n'}
            </Text>
            <Text style={styles.textErreur}>
              Pour contrôler votre géolocalisation
            </Text>
            <Text style={styles.textErreur}>
              vous pouvez utiliser google map.
            </Text>
            <Text style={styles.textErreur}>
              Sinon rechargez l'application.
            </Text>
            <TouchableHighlight
              onPress={() => this.closeModal()}
              overlayColor={null}
              style={{ marginTop: '10%' }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  textDecorationLine: 'underline'
                }}
              >
                Fermer
              </Text>
            </TouchableHighlight>
          </View>
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textErreur: {
    fontSize: 20,
    color: 'white'
  }
});
