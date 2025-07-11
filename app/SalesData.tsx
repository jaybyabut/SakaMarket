import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backImg = require('../assets/images/Back.png');
const salesStatsImg = require('../assets/images/SalesStats.png');
const order1Img = require('../assets/images/Order1.png');
const order2Img = require('../assets/images/Order2.png');
const order3Img = require('../assets/images/Order3.png');
const order4Img = require('../assets/images/Order4.png');
const order5Img = require('../assets/images/Order5.png');

const SalesData: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={backImg} style={styles.backImage} />
      </TouchableOpacity>

      {/* Palay Title */}
      <Text style={styles.palayTitle}>Palay</Text>

      {/* Market History */}
      <Text style={styles.marketHistory}>Market History</Text>

      {/* Sales Stats Image */}
      <Image source={salesStatsImg} style={styles.salesStatsImage} />

      {/* Average and Recent Price */}
      <Text style={styles.avgPrice}>Average Price: P 20 /kilo</Text>
      <Text style={styles.recentPrice}>Recent Price: P 22 /kilo</Text>

      {/* Active Transactions Label */}
      <Text style={styles.activeLabel}>Mga aktibong transaksyon ng palay:</Text>

      {/* Order Images */}
      <Image source={order1Img} style={styles.order1Image} />
      <Image source={order2Img} style={styles.order2Image} />
      <Image source={order3Img} style={styles.order3Image} />
      <Image source={order4Img} style={styles.order4Image} />
      <Image source={order5Img} style={styles.order5Image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 8,
    top: 4,
    width: 30,
    height: 30,
    zIndex: 10,
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  palayTitle: {
    position: 'absolute',
    left: 16,
    top: 31,
    width: 99,
    height: 47,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 47,
    color: '#000',
  },
  marketHistory: {
    position: 'absolute',
    left: 31,
    top: 83,
    width: 131,
    height: 23,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    color: '#000',
  },
  salesStatsImage: {
    position: 'absolute',
    left: 30,
    top: 112,
    width: 354,
    height: 263,
    resizeMode: 'contain',
  },
  avgPrice: {
    position: 'absolute',
    left: 31,
    top: 388,
    width: 217,
    height: 23,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    color: '#000',
  },
  recentPrice: {
    position: 'absolute',
    left: 31,
    top: 413,
    width: 207,
    height: 23,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    color: '#000',
  },
  activeLabel: {
    position: 'absolute',
    left: 30,
    top: 459,
    width: 260,
    height: 19,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#000',
  },
  order1Image: {
    position: 'absolute',
    left: 30,
    top: 485,
    width: 352,
    height: 65,
    resizeMode: 'contain',
  },
  order2Image: {
    position: 'absolute',
    left: 30,
    top: 557,
    width: 352,
    height: 65,
    resizeMode: 'contain',
  },
  order3Image: {
    position: 'absolute',
    left: 30,
    top: 635,
    width: 352,
    height: 65,
    resizeMode: 'contain',
  },
  order4Image: {
    position: 'absolute',
    left: 30,
    top: 713,
    width: 352,
    height: 65,
    resizeMode: 'contain',
  },
  order5Image: {
    position: 'absolute',
    left: 30,
    top: 791,
    width: 352,
    height: 65,
    resizeMode: 'contain',
  },
});

export default SalesData;