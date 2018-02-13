import React,{PropTypes} from 'react';
import { StyleSheet, Text,StatusBar,Modal,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';

class ModalSignUp extends React.Component {
    state = {
        modalVisible2:false,
      };
      openModalSignUp(){
          this.setState({modalVisible2:true});
      }
      closeModalSignUp(){
          this.setState({modalVisible2:false});
      }
    
    render() {
      return (
        <View>
            <Modal
                visible={this.state.modalVisible2}
                animationType={'slide'}
                onRequestClose={() => this.closeModalSignUp()}
                backgroundColor={'blue'}       
                >
                <ImageBackground source={require('../img/accueil2.png')} 
                    style={{
                        width: '100%',
                        height:'110%',
                    }}
                    >
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={-150}
                        style={{width: '100%',
                        height:'100%',
                        alignItems: 'center',}}
                        behavior="position"
                        contentContainerStyle={{width: '100%',
                        height:'100%',
                        alignItems: 'center',}}
                        >
                        <Text style={{marginTop:30,marginBottom:30,fontSize:28,fontFamily:'notoserif',color:'white'}}>
                            <Text>  Bienvenue sur Dé-chaîne{"\n"}</Text>
                            <Text>l'application pour cyclistes,{"\n"}</Text>
                            <Text>   qui protège votre vélo</Text>
                        </Text>
                        <Text style={styles.textInputs}>Entrez votre adresse mail :</Text>
                        <TextInput
                            style={{width: '60%', height:50,fontSize:15,color:'white',marginBottom:30,marginTop:10}}
                            placeholder="Adresse mail"
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            />
                        <Text  style={styles.textInputs}>Entrez un mot de passe pour votre compte :</Text>
                        <TextInput
                            style={{width: '60%', height:50,fontSize:15,color:'white',marginBottom:30,marginTop:10}}
                            placeholder="Mot de passe"
                            autoCorrect={false}
                            secureTextEntry={true}
                            />
                        <Text  style={styles.textInputs}>Confirmez le mot de passe :</Text>
                        <TextInput
                            style={{width: '60%', height:50,fontSize:15,color:'white',marginBottom:30,marginTop:10}}
                            placeholder="Mot de passe"
                            autoCorrect={false}
                            secureTextEntry={true}
                            />
                        <View style={{width:'59%',flex:1,
                            flexDirection:'row',
                            maxHeight:35,justifyContent:'center',
                            alignItems:'center'}}>
                            <View style={{flex:1,maxWidth:140,paddingLeft:20,
                                alignItems:'center'}}>
                               <Button
                                    onPress={() => this.closeModalSignUp()}
                                    title="Annuler"
                                    style={{flex:1,marginRight:5,paddingRight:20}}
                                    color={'grey'}
                                />
                            </View>
                            <View style={{flex:1,maxWidth:140,
                                paddingLeft:20,alignItems:'center',}}>
                                <Button
                                    onPress={() => this.closeModalSignUp()}
                                    title="Valider"
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </Modal>
            <TouchableHighlight
                onPress={()=>this.openModalSignUp()}
                underlayColor={null}
                >
                <Text style={{textDecorationLine:'underline',marginTop:40,color:'white'}}>Créer un compte Dé-chaine</Text>
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

export default ModalSignUp;  