import React from 'react';
import { StyleSheet,Alert, Text, StatusBar,ActivityIndicator,Modal,AsyncStorage,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import ModalSignUp from '../Modaux/signUp.js'
import RecupMdpModal from '../Modaux/RecupMdpModal.js';
import timer from 'react-native-timer';

const adresseMailText="";
const mdp="";

class LoginScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
        this.state={
            mailAddress:"",
            leMdp:"",
            mailVide:false,
            mdpVide:false,
            name:"",
            leEmail:"",
            leMdp:"",
            bdPleine:true,
            bdCharge:false,
        }
    };
    update(){
        if(this.state.name!=null){
            let theUser = JSON.parse(this.state.name);
            this.setState({leEmail:theUser.email})
            this.setState({leMdp:theUser.mdpUser})
            adresseMailText=this.state.leEmail
            mdp=this.state.leMdp
        }
        else{
            this.setState({bdPleine:false})
        }};
    chargerBd= async ()=> {
        let monUser = await AsyncStorage.getItem('user');
        this.setState({bdCharge:true});
        this.setState({name:monUser});
        this.update();
        return(monUser);
    }
    componentWillMount=()=>{
        this.chargerBd();
    }
    connexion(){
        if(this.state.bdPleine){
            if(adresseMailText==""||mdp==""){
                Alert.alert('Champ(s) vide(s)',
                "Veuillez compléter tous les champs.",
                [
                    {text: 'OK'},
                ]);
                if(adresseMailText==""){
                    this.setState({mailVide:true})
                }
                if(mdp==""){
                    this.setState({mdpVide:true})
                }
            }
            else{
                if(adresseMailText!=this.state.leEmail||mdp!=this.state.leMdp){
                    Alert.alert("Adresse mail ou mot de passe erroné.")
                }
                else{
                    this.props.navigation.navigate('A')
                }
            }
        }
        else{
            Alert.alert(
                 'Pas de compte',
                 "Il n'y a aucun compte enregistré sur votre appareil.\n\nVous pouvez en créer un en allant sur 'Créer un compte Dé-chaine'",
                [
                    {text:'OK',onPress:()=>this.setState({bdPleine:true})}
                ]
                )
        }
    }
    connexion2(){
        this.props.navigation.navigate('A')
    }
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
                    {this.state.bdCharge||<ActivityIndicator color="grey" size='large'/>}
                    <Text style={{fontWeight: 'bold',fontSize:18}}>Entrez votre adresse mail :</Text>
                    <TextInput
                        defaultValue={this.state.bdPleine&&this.state.leEmail||""}
                        style={{width: '50%', height:50,fontSize:15}}
                        placeholder="Adresse mail"
                        placeholderTextColor={this.state.mailVide&&'red'||null
                        }
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        underlineColorAndroid={this.state.mailVide&&'red'||null
                        }
                        onChangeText={(text)=>{
                            this.setState({mailAddress:text});
                            adresseMailText=text;
                        }}
                        />
                    <Text style={{fontWeight: 'bold',fontSize:16,marginTop:'10%'}}>Entrez votre mot de passe :</Text>
                    <TextInput
                        defaultValue={this.state.bdPleine&&this.state.leMdp||""}
                        style={{width: '50%', height:50,fontSize:15}}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        placeholderTextColor={this.state.mdpVide&&'red'||null
                        }
                        underlineColorAndroid={this.state.mdpVide&&'red'||null
                        }
                        onChangeText={(text)=>{
                            this.setState({leMdp:text});
                            mdp=text;
                        }}    
                        />
                    <RecupMdpModal/>
                    <Button
                        onPress={() => this.connexion()}
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
  