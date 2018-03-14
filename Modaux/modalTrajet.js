import React from 'react';
import { StyleSheet, Text,Image, Modal ,View,TouchableHighlight,Dimensions,Button,StatusBar, ImageBackground } from 'react-native';
import styles from '../Styles/style.js';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

require('../ConnexionBD.js')
const duree="";
const distance="";
const date="";

export default class ModalTrajet extends React.Component {
  state={
    modalVisible:false,
    placeholderVisible1:"Distance",
    placeholderVisible2:"Durée",
    placeholderVisible3:"Date"
  }
  infos(){
    if(distance!=""&&duree!=""&&date!=""){
      let userId = firebase.auth().currentUser.uid;
      let trajet={
        dist : distance,
        time : duree,
        day : date
      };
      try{
        firebase.database().ref(userId+"/Cal/").update({Jour:5000000000})
        
        firebase.database().ref(userId).push(trajet)
        console.log("ok")
        this.setState({modalVisible:false})
      }
      catch(error){
        console.log(error)
      }
    }
    else{
      alert('Faut tout remplir !')
    }
  }
    render() {
      return (
        <View>
          <Modal visible={this.state.modalVisible}
            
            >
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <TextInput placeholder={this.state.placeholderVisible1} 
              style={{width:'50%',height:40}} 
              onFocus={()=>this.setState({placeholderVisible1:""})}
              onChangeText={(text)=>distance=text}
              />
            <TextInput placeholder={this.state.placeholderVisible2} 
              style={{width:'50%',height:40}} 
              onFocus={()=>this.setState({placeholderVisible2:""})}
              onChangeText={(text)=>duree=text}
              />
            <TextInput placeholder={this.state.placeholderVisible3} 
              style={{width:'50%',height:40}} 
              onFocus={()=>this.setState({placeholderVisible3:""})}
              onChangeText={(text)=>date=text}
              />
            <Button title='Fermer' onPress={()=>{
              this.infos()
              }}/>
            </View>
          </Modal>
          <TouchableHighlight style={styles.creerTrajetButton}
            onPress={()=>this.setState({modalVisible:true})}
            underlayColor={null}
            >
            <Text style={styles.creerTrajetText}>Créer un trajet ?</Text>
          </TouchableHighlight>
        </View>
      );
    }
}