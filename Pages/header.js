import React from 'react';
import { StyleSheet, Text, StatusBar,Modal,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import PopupDialog, {DialogTitle,SlideAnimation} from 'react-native-popup-dialog';
import AideLock from '../PopupAide/aideLock';

const slideAnimation=new SlideAnimation({
    slideFrom:'bottom'
  })
  
export default class Header extends React.Component {
    textPopup=
        ()=>{
            if(this.props.page=='Verrouillage'){
                return('coucou');
            }
            else{
                return('Pas coucou');
            }
        }
    render() {
        return(  
            <View>         
                <View style={styles.conatiner}>
                    <View style={styles.container2}>
                    </View>
                    <View style={{width:'56%',height:50,backgroundColor:'#A5D6A7'}}>
                        <Text style={styles.textView}>{this.props.page}</Text>
                    </View>
                    <View style={styles.container3}>
                        <TouchableHighlight onPress={()=>this.popupDialog.show()}
                            underlayColor={null}
                            >
                            <Image source={require('../img/aide.png')} style={{marginLeft:1,marginTop:3,width:'90%',height:'90%'}}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <PopupDialog
                    dialogTitle={<DialogTitle title='Aide'/>}
                    ref={(popupDialog)=>this.popupDialog=popupDialog}
                    dialogAnimation={slideAnimation}
                    >
                    <View style={styles.popupView}>
                        <Text>Cet écran vous permet de verrouiller votre vélo.</Text>
                        <Text>C'est-à-dire, signifier qu'il est attaché</Text>
                        <Text>et qu'il n'est plus censé bouger</Text>
                        <Text>jusqu'au prochain déverrouillage.</Text>
                        <Text style={{marginTop:10}}>Pour verrouiller ou déverrouiller :</Text>
                        <Text style={{marginBottom:20}}>il suffit de cliquer sur le cadenas.{this.textPopup()}</Text>
                        <Button title="J'ai compris" onPress={()=>this.popupDialog.dismiss()}
                            />
                    </View>
                </PopupDialog>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container2:{
      height:50,
      width:'30%',
      backgroundColor:'#A5D6A7'
    },
    conatiner:{
      flex:1,
      flexDirection:'row',
      
    },
    container3:{
      height:50,
      width:50,
      backgroundColor:'#A5D6A7'
    },
    textView:{
        backgroundColor:'#A5D6A7',
        marginTop:7,
        marginLeft:20,
        fontSize:25,
        fontWeight:'bold',
        color:'white'
    },
    popupView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
      },
  })
