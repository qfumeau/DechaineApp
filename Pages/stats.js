import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Dimensions,
  Button,
  StatusBar,
  ImageBackground
} from 'react-native';
import Header from '../Composants/header';
import FlipCard from 'react-native-flip-card';
import styles from '../Styles/style.js';
import TextCarte from '../Composants/textCartes.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

class StatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cadenasOuvertVisible: true,
      cadenasFermeVisible: false
    };
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
        <Header page="Mes stats" />
        <View style={styles.monContainer}>
          <FlipCard
            style={styles.card}
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
          >
            <View>
              <Image
                source={require('../img/logoChemin.png')}
                style={styles.logos}
              />
            </View>
            <View style={styles.backChemin}>
              <TextCarte carte="Distance" code="Distance" />
            </View>
          </FlipCard>
          <FlipCard
            style={styles.card}
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
          >
            <View>
              <Image
                source={require('../img/logoCoeur.png')}
                style={styles.logos}
              />
            </View>
            <View style={styles.backCoeur}>
              <TextCarte carte="Calories" code="Cal" />
            </View>
          </FlipCard>
        </View>
        <View style={styles.monContainer}>
          <FlipCard
            style={styles.card}
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
          >
            <View>
              <Image
                source={require('../img/logoDollar2.png')}
                style={styles.logos}
              />
            </View>
            <View style={styles.backEco}>
              <TextCarte carte="Economies" code="Eco" />
            </View>
          </FlipCard>
          <FlipCard
            style={styles.card}
            friction={10}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
          >
            <View>
              <Image
                source={require('../img/logoCo2.png')}
                style={styles.logos}
              />
            </View>
            <View style={styles.backCo2}>
              <TextCarte carte="Co2 évité" code="Co2" />
            </View>
          </FlipCard>
        </View>
      </ImageBackground>
    );
  }
}
module.exports = StatScreen;
