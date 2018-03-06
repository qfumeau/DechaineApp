import React,{PropTypes} from 'react';
import { StyleSheet, Text,StatusBar,Modal, TouchableHighlight,Alert,AsyncStorage ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
  state={
    modalVisible:this.props.ouvert
  }
  closeModal(){
    this.setState({modalVisible:false});
  }
    render() {
      return (
        
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={this.state.modalVisible}
          onRequestClose={() => this.closeModal()}
          >
          <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(25,25,25,0.5)'}}>
            <MapView style={{width:'80%',height:'80%'}}/>
            <TouchableHighlight 
              onPress={()=>this.closeModal()} 
              style={{width:'50%',backgroundColor:'grey',alignItems:'center',marginTop:'10%',borderRadius:20}}
              >
              <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Fermer la carte</Text>
          </TouchableHighlight> 
          </View>
              
        </Modal>
      );
    }
}