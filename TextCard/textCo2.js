import React from 'react';
import { StyleSheet, Text, View,TextInput, } from 'react-native';
import styles from '../Styles/style.js';

export default class TextCo2 extends React.Component {
    render() {
        return(  
            <View style={styles.vueTextCard}>
                <Text style={styles.titreTextCard}>Co2 évité :</Text>
            </View>
        );
    }
}
