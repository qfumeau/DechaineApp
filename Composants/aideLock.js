import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Modal,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  View,
  Button,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  SlideAnimation
} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
});

export default class AideLock extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.popupDialog.show()}
          underlayColor={null}
        >
          <Image
            source={require('../img/aide.png')}
            style={{ marginLeft: 1, marginTop: 3, width: '90%', height: '90%' }}
          />
        </TouchableHighlight>
        <PopupDialog
          dialogTitle={<DialogTitle title="Aide" />}
          ref={popupDialog => (this.popupDialog = popupDialog)}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.popupView}>
            <Text>Cet écran vous permet de verrouiller votre vélo.</Text>
            <Text>C'est-à-dire, signifier qu'il est attaché</Text>
            <Text>et qu'il n'est plus censé bouger</Text>
            <Text>jusqu'au prochain déverrouillage.</Text>
            <Text style={{ marginTop: 10 }}>
              Pour verrouiller ou déverrouiller :
            </Text>
            <Text style={{ marginBottom: 20 }}>
              il suffit de cliquer sur le cadenas.
            </Text>
            <Button
              title="J'ai compris"
              onPress={() => this.popupDialog.dismiss()}
            />
          </View>
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popupView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
