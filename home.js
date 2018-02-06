import React from 'react';
import { StyleSheet, Text, StatusBar,Modal,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import ModalSignUp from './signUp'

class LoginScreen extends React.Component {
    state = {
        modalVisible: false,
        modalVisible2:false,
      };
    
      openModal() {
        this.setState({modalVisible:true});
      }
    
      closeModal() {
        this.setState({modalVisible:false});
      }
      openModalSignUp(){
          this.setState({modalVisible2:true});
      }
      closeModalSignUp(){
          this.setState({modalVisible2:false});
      }
    static navigationOptions = {
        header:null
    };
    render() {
      return (
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <ImageBackground source={require('./img/flowers.png')} 
                style={{
                width: '100%',
                height:'110%',
                alignItems: 'center',
                }}
                >
                <KeyboardAvoidingView
                    style={styles.container2}
                    behavior="padding"
                    >
                    <Image source={require('./img/icone.png')} style={{marginTop:60, width: 193, height: 110,marginBottom:40}}/>
                    <Text style={{fontWeight: 'bold',fontSize:18}}>Entrez votre adresse mail :</Text>
                    <TextInput
                        style={{width: '50%', height:50,marginBottom:30,fontSize:15}}
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
                    <TouchableHighlight
                        onPress={() => this.openModal()}
                        underlayColor={null}
                        >
                        <Text style={{textDecorationLine:'underline',marginBottom:30}}>Mot de passe oublié?</Text>
                    </TouchableHighlight>
                    <Button
                        onPress={() => this.props.navigation.navigate('Verrouillage')}
                        title="Connexion"
                        color="#0B9002"
                        />
                    <TouchableHighlight
                        onPress={()=>this.openModalSignUp()}
                        underlayColor={null}
                        >
                        <Text style={{textDecorationLine:'underline',marginTop:40,color:'white'}}>Créer un compte Dé-chaine</Text>
                    </TouchableHighlight>
                </KeyboardAvoidingView>
            </ImageBackground>
            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.closeModal()}
                >
                <View sytle={styles.modalContent}>
                    <ImageBackground source={require('./img/lock.png')} 
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
                        <Image source={require('./img/security3.png')} style={{marginTop:45,width:'30%',height:'15%'}}/>
                    </ImageBackground>
                </View>
            </Modal>
            <Modal
                visible={this.state.modalVisible2}
                animationType={'slide'}
                onRequestClose={() => this.closeModalSignUp()}
                backgroundColor={'blue'}       
                >
                <ImageBackground source={require('./img/accueil2.png')} 
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

module.exports = LoginScreen;
  