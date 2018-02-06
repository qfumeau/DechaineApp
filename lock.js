import React from 'react';
import { StyleSheet, Text,Image, View,TouchableHighlight,Button,StatusBar, ImageBackground } from 'react-native';
import PopupDialog, {DialogTitle,SlideAnimation} from 'react-native-popup-dialog';

const slideAnimation=new SlideAnimation({
  slideFrom:'bottom'
})

class LockScreen extends React.Component {
    static navigationOptions = {
      header:null,
    };
    render() {
      return (
        <View>
          <StatusBar hidden={true}/>
          <ImageBackground source={require('./img/lockScreen.png')} style={{width:'100%',height:'100%'}}>
            <View style={styles.conatiner3}>
              <View style={styles.container}>
              </View>
              <View style={{width:'61%',height:50,backgroundColor:'#A5D6A7'}}>
                  <Text style={{marginTop:7,marginLeft:20,fontSize:25,fontWeight:'bold',color:'white'}}>Verrouillage</Text>
              </View>
              <View style={styles.container4}>
                <TouchableHighlight onPress={()=>this.popupDialog.show()}
                  underlayColor={null}
                  >
                  <Image source={require('./img/aide.png')} style={{marginLeft:1,marginTop:3,width:'90%',height:'90%'}}/>
                </TouchableHighlight>
              </View>
            </View>
            <Image source={require('./img/cf.png')} style={{width:'100%',height:'100%'}}/>
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
  container2:{
    height:50,
    width:50,
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
  }
})
module.exports = LockScreen;