import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './AppLogo.styles';

export default function AppLogo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/STARTer/Images/Landing Page/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.nameContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.saka}>SAKA</Text>
          <Text style={styles.market}>MARKET</Text>
        </Text>
      </View>
    </View>
  );
}
