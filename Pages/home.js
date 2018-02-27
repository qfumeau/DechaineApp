import React from 'react';
import { StyleSheet,Alert, Text, StatusBar,Modal,AsyncStorage,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import ModalSignUp from '../Modaux/signUp.js'
import RecupMdpModal from '../Modaux/RecupMdpModal.js';
import timer from 'react-native-timer';

const adresseMailText="Quentin";
const mdp="a";

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
            leMdp:""
        }
    };
    update(){
        let theUser = JSON.parse(this.state.name);
        this.setState({leEmail:theUser.email})
        this.setState({leMdp:theUser.mdpUser})
    };
    chargerBd() {
        AsyncStorage.getItem('user').then((value)=>this.setState({name:value}));
        return(0);
    }
    componentWillMount=()=>{
        timer.setTimeout('coucou',()=>this.chargerBd(),1);
        timer.setTimeout('le',()=>this.update(),350);
    }
    component
    connexion=async () =>{
        try{
          let util = await AsyncStorage.getItem('user');
          const user = JSON.parse(util);
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
            if(adresseMailText!=user.email||mdp!=user.mdpUser){
                Alert.alert("Adresse mail ou mot de passe erroné.")
            }
            else{
                this.props.navigation.navigate('A')
            }
        }
        }
        catch(error){
          alert(error);
        }
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
                    <Text style={{fontWeight: 'bold',fontSize:18}}>Entrez votre adresse mail :</Text>
                    <TextInput
                        defaultValue={this.state.leEmail}
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
                        defaultValue={this.state.leMdp}
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
  