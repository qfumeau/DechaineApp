import React from 'react';
import { StyleSheet, Text, StatusBar,Modal,ScrollView,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import PopupDialog, {DialogTitle,SlideAnimation} from 'react-native-popup-dialog';
import AideLock from './aideLock';
import styles from '../Styles/style.js';

const slideAnimation=new SlideAnimation({
    slideFrom:'bottom'
  })
  
export default class Header extends React.Component {
    render() {
        return(  
            <View style={{marginBottom:'15%'}}>
                <View style={styles.conatiner}>
                    <View style={styles.container2}>
                        <Text style={styles.textView}>{this.props.page}</Text>
                    </View>
                    <View style={styles.container3}>
                        <TouchableHighlight onPress={()=>this.popupDialog.show()}
                            underlayColor='white'
                            style={{borderRadius:15}}
                            >
                            <Image source={require('../img/aide.png')} style={{marginLeft:1,marginTop:3,width:'90%',height:'90%'}}/>
                        </TouchableHighlight>
                    </View>
                </View>
                {this.props.page=='Verrouillage'&&
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
                            <Text style={{marginBottom:20}}>il suffit de cliquer sur le cadenas.</Text>
                            <Button title="J'ai compris" onPress={()=>this.popupDialog.dismiss()}
                            />
                        </View>
                    </PopupDialog>
                }
                {this.props.page=='Trajets'&&
                    <PopupDialog
                        dialogTitle={<DialogTitle title='Aide'/>}
                        ref={(popupDialog)=>this.popupDialog=popupDialog}
                        dialogAnimation={slideAnimation}
                        >
                        <View style={styles.popupView}>
                            <Text>Cet écran vous permet de consulter</Text>
                            <Text style={{marginBottom:5}}>vos 10 derniers trajets.</Text>
                            <Text>En cliquant sur l'un d'eux,</Text>
                            <Text>vous pourrez consulter des informations</Text>
                            <Text style={{marginBottom:20}}>telles que : la durée, la date et la distance parcourue.</Text>
                            <Button title="J'ai compris" onPress={()=>this.popupDialog.dismiss()}
                            />
                        </View>
                    </PopupDialog>
                }
                {this.props.page=='Mes stats'&&
                    <PopupDialog
                        dialogTitle={<DialogTitle title='Aide'/>}
                        ref={(popupDialog)=>this.popupDialog=popupDialog}
                        dialogAnimation={slideAnimation}
                        >
                        <View style={styles.popupView}>
                            <Text>Cet écran vous permet de consulter vos statistiques.</Text>
                            <Text>Cliquez sur un item pour voir les statistiques</Text>
                            <Text style={{marginBottom:20}}>qui lui sont associées.</Text>
                            <Button title="J'ai compris" onPress={()=>this.popupDialog.dismiss()}
                            />
                        </View>
                    </PopupDialog>
                }
                {this.props.page=='Paramètres'&&
                    <PopupDialog
                        dialogTitle={<DialogTitle title='Aide'/>}
                        ref={(popupDialog)=>this.popupDialog=popupDialog}
                        dialogAnimation={slideAnimation}
                        >
                        <View style={styles.popupView}>
                            <Text>Cet écran vous permet de gérer les paramètres de l'appli.</Text>
                            <Text style={{marginTop:10}}>Vous pouvez désactiver les notifiations</Text>
                            <Text>associées au mouvement du vélo.</Text>
                            <Text>Et on verra plus tard pour la suite !</Text>
                            <Text style={{marginBottom:20,fontSize:30}}>♥</Text> 
                            <Button title="J'ai compris" onPress={()=>this.popupDialog.dismiss()}
                            />
                        </View>
                    </PopupDialog>
                }
            </View>
        );
    }
}
