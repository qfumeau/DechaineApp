import React from 'react';
import { StyleSheet,Slider,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const valeurSlider=3

export default class VolumeSlider extends React.Component{
    state={
        sonCoupe:false
    }
    render(){
        return(
            <View style={this.props.style}>
                <View style={styles.volumeView}>
                {!this.state.sonCoupe&&
                    <Icon name="volume-down" size={40} color='black'/>
                    ||
                    <Icon name="volume-off" size={40} color='black'/>
                }
                
                <Slider
                step={1}
                style={{width:'75%'}}
                value={3}
                maximumValue={6}
                onValueChange={(value)=>{
                    valeurSlider=value
                    if(value==0){
                        this.setState({sonCoupe:true})
                    }
                    else{
                        this.setState({sonCoupe:false})
                    }
                }}
                //value={value}
                />
                {!this.state.sonCoupe&&<Icon name="volume-up" size={40} color='black'/>}
                </View>
            </View>
        )
    }
}

styles=StyleSheet.create({
    volumeView:{
        flexDirection:'row'
    }
})