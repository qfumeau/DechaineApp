import React from 'react';
import { StyleSheet, Text,Image, View,TouchableHighlight,Button,StatusBar } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

class LockScreen extends React.Component {
    static navigationOptions = {
      header:null,
      
    };
    render() {
      return (
        <View>
          <StatusBar hidden={true}/>
          <View style={styles.conatiner3}>
            <View style={styles.container}>
            </View>
              <View style={{width:'61%',height:50,backgroundColor:'#A5D6A7'}}>
                <Text style={{marginTop:7,marginLeft:20,fontSize:25,fontWeight:'bold',color:'white'}}>Verrouillage</Text>
              </View>
              <View style={styles.container4}>
                <TouchableHighlight onPress={()=>this.popupDialog.show()}>
                  <Image source={require('./img/aide.png')} style={{marginLeft:1,marginTop:3,width:'90%',height:'90%'}}/>
                </TouchableHighlight>
              </View>
          </View>
          <PopupDialog
            ref={(popupDialog)=>this.popupDialog=popupDialog}
            >
            <View>
              <Text>Hello</Text>
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
})
module.exports = LockScreen;