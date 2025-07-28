import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function LogoHeader({ style }) {
  return (
    <View style={[styles.logoWrapper, style]}>
      <Image
        source={require('../../assets/STARTer/Images/Landing Page/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.nameDiv}>
        <Text style={styles.logoText}>
          <Text style={styles.saka}>SAKA</Text>
          <Text style={styles.market}>MARKET</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 77,
  },
  logoImage: {
    width: 61.87,
    height: '100%',
    marginRight: 10,
  },
  nameDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logoText: {
    fontFamily: 'Secular One',
    fontSize: 32,
  },
  saka: {
    color: '#FFCA43',
  },
  market: {
    color: '#088423',
  },
});
