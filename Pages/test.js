import React from 'react';
import { StyleSheet, Text, StatusBar,Modal,TouchableHighlight ,KeyboardAvoidingView ,View,Button,TextInput, Image,ImageBackground } from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';

class Test extends React.Component {
    state = {
        modalVisible: false,
      };
    
      openModal() {
        this.setState({modalVisible:true});
      }
    
      closeModal() {
        this.setState({modalVisible:false});
      }
    
    static navigationOptions = {
      header:null
    };
    render() {
      return (
        <View style={styles.container}>
        <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>This is content inside of modal component</Text>
              <Button
                  onPress={() => this.closeModal()}
                  title="Close modal"
              >
              </Button>
            </View>
          </View>
        </Modal>
        <Button
            onPress={() => this.openModal()}
            title="Open modal"
        />
      </View>
      );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    container2:{
        width: '100%',
        height:'110%',
        alignItems: 'center',
        flex:1,
    }
});
module.exports = Test;
  