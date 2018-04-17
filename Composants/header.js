import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  Image
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  SlideAnimation
} from 'react-native-popup-dialog';
import styles from '../Styles/style.js';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
});

export default class Header extends React.Component {
  render() {
    return (
      <View style={{ marginBottom: '15%' }}>
        <View style={styles.conatiner}>
          <View style={styles.container2}>
            <Text style={styles.textView}>{this.props.page}</Text>
          </View>
          <View style={styles.container3}>
            <TouchableHighlight
              onPress={() => this.popupDialog.show()}
              underlayColor="white"
              style={{ borderRadius: 15 }}
            >
              <Image
                source={require('../img/aide.png')}
                style={{
                  marginLeft: 1,
                  marginTop: 3,
                  width: '90%',
                  height: '90%'
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
        {this.props.page == 'Verrouillage' && (
          <PopupDialog
            dialogTitle={<DialogTitle title="Aide" />}
            ref={popupDialog => (this.popupDialog = popupDialog)}
            dialogAnimation={slideAnimation}
          >
            <View style={styles.popupView}>
              <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                Cet écran vous permet de verrouiller votre vélo.
                {'\n'}C'est-à-dire, signifier qu'il est attaché{'\n'}et qu'il
                n'est plus censé bouger
                {'\n'}jusqu'au prochain déverrouillage.{'\n'}
              </Text>
              <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                Pour verrouiller ou déverrouiller :{'\n'}il suffit de cliquer
                sur le cadenas.
              </Text>
              <Button
                title="J'ai compris"
                onPress={() => this.popupDialog.dismiss()}
              />
            </View>
          </PopupDialog>
        )}
        {this.props.page == 'Trajets' && (
          <PopupDialog
            dialogTitle={<DialogTitle title="Aide" />}
            ref={popupDialog => (this.popupDialog = popupDialog)}
            dialogAnimation={slideAnimation}
          >
            <View style={styles.popupView}>
              <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                Cet écran vous permet de consulter{'\n'}vos 10 derniers trajets.
                {'\n'}En cliquant sur l'un d'eux,{'\n'}vous pourrez consulter
                des informations
                {'\n'}telles que : la durée, la date et la distance parcourue.
              </Text>
              <Button
                title="J'ai compris"
                onPress={() => this.popupDialog.dismiss()}
              />
            </View>
          </PopupDialog>
        )}
        {this.props.page == 'Mes stats' && (
          <PopupDialog
            dialogTitle={<DialogTitle title="Aide" />}
            ref={popupDialog => (this.popupDialog = popupDialog)}
            dialogAnimation={slideAnimation}
          >
            <View style={styles.popupView}>
              <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                Cet écran vous permet de consulter vos statistiques. Cliquez sur
                un item pour voir les statistiques{'\n'} qui lui sont associées.{
                  '\n\n'
                }
                Les informations disponibles sur le calcul de celles-ci {'\n'}sont
                disponibles dans l'onglet "Paramètres". {'\n'}en cliquant sur
                "Infos"
              </Text>
              <Button
                title="J'ai compris"
                onPress={() => this.popupDialog.dismiss()}
              />
            </View>
          </PopupDialog>
        )}
        {this.props.page == 'Paramètres' && (
          <PopupDialog
            dialogTitle={<DialogTitle title="Aide" />}
            ref={popupDialog => (this.popupDialog = popupDialog)}
            dialogAnimation={slideAnimation}
          >
            <View style={styles.popupView}>
              <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                Cet écran vous permet de gérer les paramètres de l'application.{
                  '\n'
                }
                Vous pouvez baissez le son ou désactiver {'\n'}les notifiations
                associées au mouvement du vélo.{'\n'}
                Vous pouvez également changer votre mot de passe,{'\n'}
                consulter les informations de calcul des statistiques{'\n'}
                ou bien nous quitter en supprimant définitivement votre comtpe.
              </Text>

              <Button
                title="J'ai compris"
                onPress={() => this.popupDialog.dismiss()}
              />
            </View>
          </PopupDialog>
        )}
      </View>
    );
  }
}
