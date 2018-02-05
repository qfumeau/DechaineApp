import React,{PropTypes} from 'react';
import { StyleSheet, Text,StatusBar,Modal,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';

class ModalSignUp extends React.Component {
    constructor(props){
        super(props);
        this.state={modalVisible:false}
    }
    
    render() {
      return (
          <View>
           <Modal
                    animationType={'slide'}
                    visible={this.state.modalVisible}
                   
                >
                    <View sytle={styles.modalContent}>
                    <ImageBackground source={require('./img/lock.png')} 
                    style={{
                        width: '100%',
                        height:'110%',
                        alignItems: 'center',
                    }}
                    >
                        <Text style={{marginTop:70,fontSize:28,fontFamily:'notoserif',color:'white'}}>oou mot de passe</Text>
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
                        <View style={{width:'75%',flex:1,
                            flexDirection:'row',
                            maxHeight:35,justifyContent:'center',
                            alignItems:'center'}}>
                            <View style={{flex:1,maxWidth:120,paddingLeft:40,
                                alignItems:'center'}}>
                               <Button
                                    title="Annuler"
                                    style={{flex:1,marginRight:5,paddingRight:20}}
                                    color={'grey'}
                                />
                            </View>
                            <View style={{flex:1,maxWidth:100,
                                paddingLeft:20,alignItems:'center',}}>
                                <Button
                                    title="Valider"
                                />
                            </View>
                        </View>
                        <Image source={require('./img/security3.png')} style={{marginTop:45,width:'30%',height:'15%'}}/>
                    </ImageBackground>
                    </View>
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
        padding: 22,
        borderRadius: 500,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    textMdpLost:{
        marginTop:70,
        fontWeight: 'bold',
        color:'#ffffe6',
        fontSize:20,
        justifyContent:'center'
    },
});
export default ModalSignUp;  