import React from 'react';
import { StyleSheet, Text,Image, Modal ,View,TouchableHighlight,Dimensions,Picker,Button, ImageBackground } from 'react-native';
import styles from '../Styles/style.js';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import DateTimePicker  from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

require('../ConnexionBD.js')
const lesKm="";
const lesM="";
const lesH="";
const lesMin="";
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
    km:0,
    m:0,
    h:0,
    min:0
  }
  infos(){
    let distance=""+(lesKm)+","+lesM;
    let duree=""+lesH+"'"+lesMin;
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
        Alert.alert('Trajet',
        'Votre trajet a bien été ajouté !',
        [
          {text:'OK',onPress:()=>this.setState({modalVisible:false})}
        ]
      )
      }
      catch(error){
        console.log(error)
      }
    }
    else{
      alert('Faut tout remplir !')
    }
  }
  pickerKm(){
    const nbKm=[];
    for(i=0;i<=100;i++){
      nbKm.push(<Picker.Item label={""+i+" kilomères"} value={i} key={i}/>)
    }
    return nbKm;
  }
  pickerM(){
    const nbM=[];
    for(i=0;i<10;i++){
      nbM.push(<Picker.Item label={""+(i*100)+" mètres"} value={(i*100)} key={i}/>)
    }
    return nbM;
  }
  pickerH(){
    const nbKm=[];
    for(i=0;i<=24;i++){
      nbKm.push(<Picker.Item label={""+i+" heures"} value={i} key={i}/>)
    }
    return nbKm;
  }
  pickerMin(){
    const nbM=[];
    for(i=0;i<60;i++){
      nbM.push(<Picker.Item label={""+i+" minutes"} value={i} key={i}/>)
    }
    return nbM;
  }
  test(){
    let distance=""+(lesKm)+","+lesM;
    let duree=""+lesH+"'"+lesMin;
    console.log(""+duree+" "+distance);
    console.log(""+lesKm+' '+lesM+" "+lesH+" "+lesMin);
  }
    render() {
      return (
        <View>
          <Modal visible={this.state.modalVisible}
            >
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:30,marginTop:'15%',marginBottom:'5%'}}>Ajouter un trajet</Text>
              <Text style={{fontSize:20}}>Renseignez les informations du trajet</Text>
              <Text style={{fontSize:20,marginBottom:'10%'}}>que vous voulez ajouter à votre profil</Text>
              <Text style={{fontSize:15}}>Distance parcourrue : </Text>
              <View style={{flexDirection:'row',marginBottom:'5%'}}>
                <View style={{width:'50%',height:50}}>
                  <Picker
                    style={{width:'100%',height:'100%'}}
                    selectedValue={this.state.km}
                    onValueChange={(value)=>{
                      this.setState({km:value}),
                      lesKm=value
                    }}
                    >
                    {this.pickerKm()}
                  </Picker>
                </View>
                <View style={{width:'50%',height:50}}>
                  <Picker
                    style={{width:'100%',height:'100%'}}
                    selectedValue={this.state.m}
                    onValueChange={(value)=>{
                      this.setState({m:value}),
                      lesM=value
                    }}
                    >
                    {this.pickerM()}
                  </Picker>
                </View>
              </View>
              <Text style={{fontSize:15,marginBottom:'10%'}}>Durée du trajet :</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'50%',height:50}}>
                  <Picker
                    style={{width:'100%',height:'100%'}}
                    selectedValue={this.state.h}
                    onValueChange={(value)=>{
                      this.setState({h:value}),
                      lesH=value
                    }}
                    >
                    {this.pickerH()}
                  </Picker>
                </View>
                <View style={{width:'50%',height:50}}>
                  <Picker
                    style={{width:'100%',height:'100%'}}
                    selectedValue={this.state.min}
                    onValueChange={(value)=>{
                      this.setState({min:value}),
                      lesMin=value
                    }}
                    >
                    {this.pickerMin()}
                  </Picker>
                </View>
              </View>
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
            <Text style={styles.creerTrajetText}>Ajouter un trajet ?</Text>
          </TouchableHighlight>
        </View>
      );
    }
}