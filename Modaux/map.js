import React,{PropTypes} from 'react';
import { StyleSheet, Text,StatusBar,Modal, TouchableHighlight,Alert,AsyncStorage ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import MapView from 'react-native-maps';
import LockScreen from '../Pages/lock.js';

export default class Map extends React.Component {
  constructor(props){
    super(props);
  }
  state={
    modalVisible:this.props.ouvert
  }
  
  closeModal(){
    this.setState({modalVisible:false});
    this.props.activeModal();
  }
  test(){
    console.log('coucou');
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
            <MapView style={{width:'80%',height:'80%'}}
              initialRegion={this.props.myPosition}
              >
              <MapView.Marker
                        coordinate={this.props.positionMarker}
                        image={require('../img/markerBike.png')}
                        title={"title"}
                        description={"description"}
                    />
            </MapView>
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