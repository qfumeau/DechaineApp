import React from 'react';
import { StyleSheet, Text, View,TextInput, } from 'react-native';
import styles from '../Styles/style.js';

export default class TextCarte extends React.Component {
    textJ(){
        let chaine1="";
        if(this.props.carte=='Distance'){
            chaine1 = "8km";
        }
        else{
            if(this.props.carte=='Calories'){
                chaine1 = "10kcal";
            }
            else{
                if(this.props.carte=="Economies"){
                    chaine1 = "10€";
                }
                else{
                    if(this.props.carte=="Co2 évité"){
                        chaine1 = "10kg";
                    }
                    else{
                        return("My bad");
                    }
                }
            }
        }
        return(chaine1)
    }
    textS(){
        let chaine1="";
        if(this.props.carte=='Distance'){
            chaine1 = "8km";
        }
        else{
            if(this.props.carte=='Calories'){
                chaine1 = "10kcal";
            }
            else{
                if(this.props.carte=="Economies"){
                    chaine1 = "10€";
                }
                else{
                    if(this.props.carte=="Co2 évité"){
                        chaine1 = "10kg";
                    }
                    else{
                        return("My bad");
                    }
                }
            }
        }
        return(chaine1)
    }
    textM(){
        let chaine1="";
        if(this.props.carte=='Distance'){
            chaine1 = "8km";
        }
        else{
            if(this.props.carte=='Calories'){
                chaine1 = "10kcal";
            }
            else{
                if(this.props.carte=="Economies"){
                    chaine1 = "10€";
                }
                else{
                    if(this.props.carte=="Co2 évité"){
                        chaine1 = "10kg";
                    }
                    else{
                        return("My bad");
                    }
                }
            }
        }
        return(chaine1)
    }
    textA(){
        let chaine1="";
        if(this.props.carte=='Distance'){
            chaine1 = "8km";
        }
        else{
            if(this.props.carte=='Calories'){
                chaine1 = "10kcal";
            }
            else{
                if(this.props.carte=="Economies"){
                    chaine1 = "10€";
                }
                else{
                    if(this.props.carte=="Co2 évité"){
                        chaine1 = "10kg";
                    }
                    else{
                        return("My bad");
                    }
                }
            }
        }
        return(chaine1)
    }
    render() {
        return(  
            <View style={styles.vueTextCard}>
                <Text style={styles.titreTextCard}>{this.props.carte}</Text>
                <Text style={styles.sousTitreCarte}>Journée :  
                    <Text style={styles.infoTextCarte}>
                        {this.textJ()}
                    </Text>
                </Text>
                <Text style={styles.sousTitreCarte}>Semaine :  
                    <Text style={styles.infoTextCarte}>{this.textS()}</Text>
                </Text>
                <Text style={styles.sousTitreCarte}>Mois :  
                    <Text style={styles.infoTextCarte}>{this.textM()}</Text>
                </Text>
                <Text style={styles.sousTitreCarte}>Tout :  
                    <Text style={styles.infoTextCarte}>{this.textA()}</Text>
                </Text>
            </View>
        );
    }
}
