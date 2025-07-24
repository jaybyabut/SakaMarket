import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const logoImg: ImageSourcePropType = require('../../Assets/Images/Logo-Home.png');
const homeTextImg: ImageSourcePropType = require('../../Assets/Images/Mamili ng Gawain.png');
const bumiliImg: ImageSourcePropType = require('../SakaMarket/Assets/Images/Bumili.png');
const marketImg: ImageSourcePropType = require('../SakaMarket/Assets/Images/market.png');
const settingsImg: ImageSourcePropType = require('../SakaMarket/Assets/Images/settings.png');
const accountImg: ImageSourcePropType = require('../SakaMarket/Assets/Images/account.png');
const languageImg: ImageSourcePropType = require('../../Assets/Images/Language.png');
const logoutImg: ImageSourcePropType = require('../../Assets/Images/LogOut.png');

type RootStackParamList = {
  HomeBuyer: undefined;
  BuyPage: undefined;
  StatsPage: undefined;
};

export default function HomeBuyer() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logoImage} />
        <Text style={styles.logoText}>SAKA MARKET</Text>
      </View>

      <Image source={homeTextImg} style={styles.homeTextImage} />

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('BuyPage')}
          >
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.squareButton}
            >
              <Image source={bumiliImg} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Bumili</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('StatsPage')}
          >
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
              start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
              style={styles.squareButton}
            >
              <Image source={marketImg} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Market</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <LinearGradient
            colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
            style={styles.squareButton}
          >
            <Image source={settingsImg} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Settings</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
            start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}
            style={styles.squareButton}
          >
            <Image source={accountImg} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Account</Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.languageRow}>
        <Image source={languageImg} style={styles.languageIcon} />
        <Text style={styles.languageLabel}>Language:</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageButtonText}>Tagalog</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Image source={logoutImg} style={styles.logoutImage} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 63,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    left: 20,
    width: 222.87,
    height: 77,
    zIndex: 10,
  },
  logoImage: {
    width: 61.87,
    height: 77,
    resizeMode: 'contain',
  },
  logoText: {
    fontFamily: 'Secular One', 
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 31,
    letterSpacing: 0.012,
    color: '#FFCA43',
    marginLeft: 8,
  },
  homeTextImage: {
    width: 258,
    height: 35,
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  gridContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  squareButton: {
    width: 176,
    height: 181,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
    paddingVertical: 5,
    paddingHorizontal: 19,
  },
  buttonImage: {
    width: 124,
    height: 124,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: 'Roboto', 
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 35,
    color: '#FFFDEB',
    textAlign: 'center',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    height: 55,
    paddingVertical: 2,
  },
  languageIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 10,
  },
  languageLabel: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    color: '#000',
    marginRight: 10,
  },
  languageButton: {
    backgroundColor: '#10AF7C',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8.7,
    elevation: 2,
  },
  languageButtonText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    color: '#FFF',
  },
  logoutButton: {
    position: 'absolute',
    left: 20,
    bottom: 30,
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutImage: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: 'contain',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

