import React from 'react';
import { StyleSheet, Text, StatusBar,Alert,Modal,ScrollView,AsyncStorage,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import * as firebase from 'firebase';

require('../ConnexionBD.js');
const adresseMail=null;

export default class RecupMdpModal extends React.Component {
    static navigationOptions={
      header:null
    }
    state = {
        modalVisible: false,
        adresseMailState:""
      };
    
    openModal() {
        this.setState({modalVisible:true});
    }
    
    closeModal() {
        this.setState({modalVisible:false});
    }
    recupMdp2=async () =>{
        try{
          let util = await AsyncStorage.getItem('user');
          const user = JSON.parse(util);
          Alert.alert(
            'Compte ajouté !',
            'Email : '+user.email+'\nMdp : '+user.mdpUser,
            [
                {text:'OK',onPress:()=>this.closeModal()},
            ]
        );
        }
        catch(error){
          alert(error);
        }
    }
    recupMdp(){
        if(adresseMail){
            firebase.auth().sendPasswordResetEmail(adresseMail).then(()=>alert('Mail envoyé !')).catch((error)=>{
                if(error.toString()=="Error: The email address is badly formatted."){
                    alert('Adresse mail invalide')
                }
                else{
                    alert(error)
                }
            });
        }
        else{
            Alert.alert('Champ vide',
            'Veuillez saisir une adresse mail'
        )
        }
    }
    
      render() {
        return(
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                    >
                        <ImageBackground source={require('../img/lock.png')} 
                            style={{
                                width: '100%',
                                height:'110%',
                                alignItems: 'center',
                                }}
                                >
                            <Text style={{marginTop:70,fontSize:28,fontFamily:'notoserif',color:'white'}}>Récupération mot de passe</Text>
                                <Text style={styles.textMdpLost}>
                                <Text>Entrez votre adresse mail,{"\n"}</Text>
                                <Text>un nouveau mot de passe{"\n"}</Text>
                                <Text>      vous sera envoyé.</Text>
                            </Text>
                            <TextInput
                                style={{width: '60%', height:'10%',fontSize:15,color:'white',marginBottom:30,marginTop:20}}
                                placeholder="Adresse mail"
                                autoCorrect={false}
                                onChangeText={
                                    (text)=>{
                                        this.setState({adresseMailState:text}),
                                        adresseMail=text
                                    }}
                                keyboardType={'email-address'}
                                />
                            <View style={{width:'59%',flex:1,
                                    flexDirection:'row',
                                    maxHeight:35,justifyContent:'center',
                                    alignItems:'center'}}>
                                <View style={{flex:1,maxWidth:140,paddingLeft:20,
                                    alignItems:'center'}}>
                                    <Button
                                        onPress={() => this.closeModal()}
                                        title="Annuler"
                                        style={{flex:1,marginRight:5,paddingRight:20}}
                                        color={'grey'}
                                        />
                                </View>
                                <View style={{flex:1,maxWidth:140,
                                    paddingLeft:20,alignItems:'center',}}>
                                    <Button
                                        onPress={() => this.recupMdp()}
                                        title="Valider"
                                        />
                                </View>
                            </View>
                            <Image source={require('../img/security3.png')} style={{marginTop:45,width:'30%',height:'15%'}}/>
                        </ImageBackground>
                </Modal>
                <TouchableHighlight
                onPress={() => this.openModal()}
                underlayColor={null}
                >
                <Text style={{textDecorationLine:'underline',marginBottom:30}}>
                    Mot de passe oublié?
                </Text>
                </TouchableHighlight>
            </View>
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