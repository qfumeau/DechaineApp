import React from 'react';
import { StyleSheet, Text, StatusBar,Modal,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';

export default class RecupMdpModal extends React.Component {
    static navigationOptions={
      header:null
    }
    state = {
        modalVisible: false,
      };
    
      openModal() {
        this.setState({modalVisible:true});
      }
    
      closeModal() {
        this.setState({modalVisible:false});
      }
    render() {
        return(
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                    >
                    <View sytle={styles.modalContent}>
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
                                        onPress={() => this.closeModal()}
                                        title="Valider"
                                        />
                                </View>
                            </View>
                            <Image source={require('../img/security3.png')} style={{marginTop:45,width:'30%',height:'15%'}}/>
                        </ImageBackground>
                    </View>
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
    modalContent: {
        borderRadius: 500,
        borderColor: 'rgba(0, 0, 0, 0.1)',
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