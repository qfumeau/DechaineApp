import React from 'react';
import { StyleSheet, Text, StatusBar,Modal,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import ModalSignUp from '../Modaux/signUp.js'
import RecupMdpModal from '../Modaux/RecupMdpModal.js';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    render() {
      return (
            <ImageBackground source={require('../img/flowers.png')} 
                style={{
                width: '100%',
                height:'110%',
                alignItems: 'center',
                }}
                >
                <StatusBar hidden={true}/>
                <KeyboardAvoidingView
                    style={styles.container2}
                    behavior="padding"
                    >
                    <Image source={require('../img/icone.png')} style={{marginTop:'15%', width: 193, height: 110,marginBottom:'15%'}}/>
                    <Text style={{fontWeight: 'bold',fontSize:18}}>Entrez votre adresse mail :</Text>
                    <TextInput
                        style={{width: '50%', height:50,marginBottom:'10%',fontSize:15}}
                        placeholder="Adresse mail"
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        />
                    <Text style={{fontWeight: 'bold',fontSize:16}}>Entrez votre mot de passe :</Text>
                    <TextInput
                        style={{width: '50%', height:50,fontSize:15}}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        />
                    <RecupMdpModal/>
                    <Button
                        onPress={() => this.props.navigation.navigate('A')}
                        title="Connexion"
                        color="#0B9002"
                        />
                    <ModalSignUp/>
                </KeyboardAvoidingView>
            </ImageBackground>
      );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    container2:{
        width: '100%',
        height:'110%',
        alignItems: 'center',
        flex:1,
    },
    textInputs:{
        color:'white',
        fontSize:16
    },
    textMdpLost:{
        marginTop:50,
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    }
});

module.exports = LoginScreen;
  