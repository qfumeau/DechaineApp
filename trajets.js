import React from 'react';
import { StyleSheet, Text,Image, View,TouchableHighlight,Button,StatusBar, ImageBackground } from 'react-native';
import PopupDialog, {DialogTitle,SlideAnimation} from 'react-native-popup-dialog';

const slideAnimation=new SlideAnimation({
  slideFrom:'bottom'
})

class trajetsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cadenasOuvertVisible:true,
      cadenasFermeVisible:false
    }
  }
    static navigationOptions = {
      header:null,
    };
    render() {
      return (
        <View>
          <StatusBar hidden={true}/>
          <ImageBackground source={require('./img/lockScreen.png')} style={{position:'absolute',}}>
            <View style={styles.conatiner3}>
              <View style={styles.container}>
              </View>
              <View style={{width:'61%',height:50,backgroundColor:'#A5D6A7'}}>
                  <Text style={{backgroundColor:'#A5D6A7',marginTop:7,marginLeft:20,fontSize:25,fontWeight:'bold',color:'white'}}>Tarjets</Text>
              </View>
              <View style={styles.container4}>
                <TouchableHighlight onPress={()=>this.popupDialog.show()}
                  underlayColor={null}
                  >
                  <Image source={require('./img/aide.png')} style={{marginLeft:1,marginTop:3,width:'90%',height:'90%'}}/>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.cadenasView}>
              {this.state.cadenasOuvertVisible && 
                <TouchableHighlight style={{marginTop:50}} 
                  onPress={()=>{this.setState({
                    cadenasFermeVisible:true})
                    this.setState({cadenasOuvertVisible:false})
                    }}
                    underlayColor={null}
                    >
                  <Image source={require('./img/cadenasOuvert.png')} style={{width:200,height:220,}}/>
                </TouchableHighlight> ||
                <TouchableHighlight style={{marginTop:50}}
                  onPress={()=>{this.setState({
                  cadenasFermeVisible:false})
                  this.setState({cadenasOuvertVisible:true})
                  }}
                  underlayColor={null}>
                  <Image source={require('./img/cadenasFerme.png')} style={{width:200,height:220}}/>
                </TouchableHighlight>
              }
              <Text style={{fontSize:30,fontWeight:'bold',marginTop:30}}>Vélo déverrouillé</Text>
            </View>
          </ImageBackground>
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
        </View>
      );
    }
}

const styles=StyleSheet.create({
  container:{
    height:50,
    width:'25%',
    backgroundColor:'#A5D6A7'
  },
  conatiner3:{
    flex:1,
    flexDirection:'row',
  },
  container4:{
    height:50,
    width:50,
    backgroundColor:'#A5D6A7'
  },
  popupView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  cadenasView:{
    alignItems:'center',
    height:520
  }
})
module.exports = trajetsScreen;