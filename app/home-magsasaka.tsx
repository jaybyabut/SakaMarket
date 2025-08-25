import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');

const logoImg: ImageSourcePropType = require('../assets/images/home-title.png');
const homeTextImg: ImageSourcePropType = require('../assets/images/mamili-ng-gagawin.png');
const magbentaImg: ImageSourcePropType = require('../assets/images/Magbenta.png');
const marketImg: ImageSourcePropType = require('../assets/images/Market.png');
const settingsImg: ImageSourcePropType = require('../assets/images/Settings.png');
const accountImg: ImageSourcePropType = require('../assets/images/Account.png');
const languageImg: ImageSourcePropType = require('../assets/images/language.png');
const logoutImg: ImageSourcePropType = require('../assets/images/open-pane.png');


export default function HomeBuyer() {

  return (
    <View style={styles.container}>
      {/* Logo at top left */}
        <LinearGradient
                    colors={['#10AF7C', '#86C778']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1.2 }}
                    style={styles.logoContainer}
                  >
          <Image source={logoImg} style={styles.logoImage} />
        </LinearGradient>

        <View style={styles.mamiliContainer}>
          {/* Home text banner */}
          <Image source={homeTextImg} style={styles.homeTextImage} />
        </View>
      






      {/* Button grid */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/buy-page')}
          >
              <Image source={magbentaImg} style={styles.buttonImg}/>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/StatsPage')}
          >
              <Image source={marketImg} style={styles.buttonImg}/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <Image source={settingsImg} style={styles.buttonImg}/>
            <Image source={accountImg} style={styles.buttonImg}/>
        </View>
      </View>

      {/* Language row */}
      <View style={styles.languageRow}>
        <Text style={styles.languageLabel}>Language:</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageButtonText}>Tagalog</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out button at bottom left */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/signIn')}>
        <Image source={logoutImg} style={styles.logoutImage} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  logoContainer: {
    height: height * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  logoImage: {
    resizeMode: 'contain',
    width: height * 0.3,
    
  },
  logoText: {
    fontFamily: 'Secular One', // Make sure to link this font in your project
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 31,
    letterSpacing: 0.012,
    color: '#FFCA43',

  },
  mamiliContainer: {
    height: height * 0.1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  homeTextImage: {
    transform: [{ scale: width * 0.0025 }],
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: height * 0.015,

  },
  row: {
    flexDirection: 'row',
  },
  buttonImg: {
    width: width * 0.45,
    height: width * 0.45,

  },
  languageRow: {
    flexDirection: 'row',
    gap: width * 0.05,
    paddingVertical: height * 0.01,
    
  },
  languageLabel: {
    left: width * 0.05,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: RFValue(18),
    lineHeight: 23,
    color: '#000',
    marginRight: 10,
    textAlignVertical: 'center',

  },
  languageButton: {
    width: width * 0.3,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10AF7C',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8.7,
    elevation: 2,
  },
  languageButtonText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: RFValue(17),
    lineHeight: 23,
    color: '#FFF',
  },
  logoutButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
    bottom: height * 0.02,
    left: width * 0.05,
    backgroundColor: '#d32f2f',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 24,
  },
  logoutImage: {
    width: height * 0.03,
    height: height * 0.03,
  },
  logoutButtonText: {
    fontSize: RFValue(16),
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});

// Note: For gradients, install react-native-linear-gradient and link it properly.
// For custom fonts (Roboto, Secular One), make sure to add and link them in your project.
