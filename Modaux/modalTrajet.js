import React from 'react';
import { StyleSheet, Text,Image, Modal ,View,TouchableHighlight,Dimensions,Button, ImageBackground } from 'react-native';
import styles from '../Styles/style.js';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import DateTimePicker  from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

require('../ConnexionBD.js')
const duree="";
const distance="";
const maDate="";
const calendarIcon = (<Icon name="calendar" size={40} color='black' />)
const data = [];
for(let i=0;i<100;i++){
    data.push(i);
}

export default class ModalTrajet extends React.Component {
  state={
    modalVisible:false,
    placeholderVisible1:"Distance",
    placeholderVisible2:"Durée",
    placeholderVisible3:"Date",
    dateVisible:false,
  }
  infos(){
    if(distance!=""&&duree!=""&&maDate!=""){
      let userId = firebase.auth().currentUser.uid;
      let date = maDate.getDate()+","+(maDate.getMonth()+1)+","+maDate.getFullYear();
      let trajet={
        dist : distance,
        time : duree,
        day : date
      };
      try{
        //firebase.database().ref(userId+"/Cal/").update({Jour:5000000000});
        firebase.database().ref(userId).push(trajet);
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
            <View style={{flexDirection:'row',marginBottom:'5%',marginTop:'5%'}}>
            <Text style={{marginRight:'10%',fontSize:25}}>Date : </Text>
            <TouchableHighlight
              underlayColor={null}
              onPress={()=>this.setState({dateVisible:true})}>
              <Icon name="calendar" size={40} color='black'/>
            </TouchableHighlight>
            </View>
            <DateTimePicker
              isVisible={this.state.dateVisible}
              datePickerModeAndroid={"spinner"}
              onConfirm={(date)=>{            
                maDate=date
                this.setState({dateVisible:false})
              }}
              onCancel={()=>this.setState({dateVisible:false})}
              />
              <View style={{flexDirection:'row'}}>
              <View style={{marginRight:'5%'}}>
                <Button title='Annuler' 
                  color='grey'
                  onPress={()=>{
                  this.setState({modalVisible:false})
                  }}/>
              </View>
              <View>
                <Button title='Fermer' onPress={()=>
                    this.infos()}/>
              </View>
              </View>
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