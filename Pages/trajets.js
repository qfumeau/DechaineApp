import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  Button,
  StatusBar,
  ImageBackground
} from 'react-native';
import Header from '../Composants/header';
import styles from '../Styles/style.js';
import ModalTrajet from '../Composants/Modaux/modalTrajet.js';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

require('../ConnexionBD.js');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
const listKey = [];
const listTrajets = [];
const id="";
const trajets = [];
class trajetsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cadenasOuvertVisible: true,
      cadenasFermeVisible: false,
      bdcharge: false
    };
  }
  componentWillMount = async () => {
    this.setState({bdcharge:false})
    listKey = [];
    listTrajets = [];
    try {
      id = firebase.auth().currentUser.uid;
      console.log(id);
      let ref = firebase.database().ref(id + '/Trajets');
      ref.on('child_added', data => {
        listKey.push(data.key);
      });
      ref.on('value', data => {
        listTrajets = data.val();
        this.setState({ bdcharge: true });
      });
    } catch (error) {
      alert(error.toString());
    }
    for(let i =0;i<listKey.length;i++){
      console.log(listKey[i])
    }
  };
  maFonction() {
    if (this.state.bdcharge) {
      console.log('\n\n\n listekey ' + listKey.length);
      //console.log("\n"+listTrajets[listKey[0]].time)
      trajets = [];
      for (let i = 0; i < listKey.length; i++) {
        trajets.push(
          <TouchableHighlight style={styles.touchableHighlight} key={i}>
            <View>
              <View style={{alignItems:'center',flexDirection:'row'}}>
              <View style={{width:'90%'}}>
              <Text
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: 20
                }}
              >
                Trajet {i + 1}
                {'\n'}
              </Text>
              </View>
              <TouchableHighlight
                onPress={()=>{this.deleteTrip(listKey[i])}}
              >
              <Icon name="trash-o" size={25} color="red" />
              </TouchableHighlight>
              </View>
              <Text style={{ marginLeft: '5%' }}>
                Distance : {listTrajets[listKey[i]].dist}
              </Text>
              <Text style={{ marginLeft: '5%' }}>
                Durée : {listTrajets[listKey[i]].time}
              </Text>
              <Text style={{ marginLeft: '5%' }}>
                Date : {listTrajets[listKey[i]].day}
              </Text>
            </View>
          </TouchableHighlight>
        );
      }
      return trajets;
    } else {
      console.log('waiting');
    }
  }
  deleteTrip(val){
    try{
    firebase.database().ref(id+"/Trajets/"+val).remove();
      this.componentWillMount() 
  }
  catch(error){
    console.log(error.toString())
  }
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ImageBackground
        source={require('../img/lockScreen2.png')}
        style={{
          width: viewportWidth,
          height: viewportHeight
        }}
      >
        <StatusBar hidden={true} />
        <Header page="Trajets" />
        <ScrollView style={{ marginBottom: '20%' }}>
          <ModalTrajet ferme={()=>this.componentWillMount()}/>
          {(this.state.bdcharge && this.maFonction()) || (
            <View
              style={{
                marginTop: '30%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" color="green" />
              <Text>Chargement</Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    );
  }
}
module.exports = trajetsScreen;
