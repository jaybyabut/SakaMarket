import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Image assets (update paths as needed)
const backImg = require('../assets/images/Back.png');
const filter1Img = require('../assets/images/Filter-1.png'); // The filter pop-up button
const palayImg = require('../assets/images/Palay.png');
const sibuyasImg = require('../assets/images/Sibuyas.png');
const kamatisImg = require('../assets/images/Kamatis.png');
const searchImg = require('../assets/images/Search.png');
const siliImg = require('../assets/images/Sili.png');
const talongImg = require('../assets/images/Talong.png');
// For the pop-up arrow

type RootStackParamList = {
  StatsPage: undefined;
  SalesData: undefined;
  // ...other screens
};

const StatsPage: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image source={backImg} style={styles.backImage} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Market Transactions</Text>

      {/* Search Bar Group */}
      <View style={styles.searchGroup}>
        <View style={styles.searchBar} />
        <Image source={searchImg} style={styles.searchIcon} />
      </View>

      {/* Filter Group */}
      <View style={styles.filterGroup}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Image source={filter1Img} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Palay Card (Touchable) */}
      <View style={styles.cardGroup1}>
        <TouchableOpacity style={{flex: 1}} activeOpacity={0.8} onPress={() => router.push('/SalesData')}>
          <LinearGradient colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]} style={styles.card}>
            <Image source={palayImg} style={styles.cardIcon1} />
            <Text style={styles.cardLabel1}>Palay</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* Sibuyas Card */}
      <View style={styles.cardGroup2}>
        <LinearGradient colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]} style={styles.card}>
          <Image source={sibuyasImg} style={styles.cardIcon2} />
          <Text style={styles.cardLabel2}>Sibuyas</Text>
        </LinearGradient>
      </View>
      {/* Kamatis Card */}
      <View style={styles.cardGroup3}>
        <LinearGradient colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]} style={styles.card}>
          <Image source={kamatisImg} style={styles.cardIcon3} />
          <Text style={styles.cardLabel3}>Kamatis</Text>
        </LinearGradient>
      </View>
      {/* Sili Card */}
      <View style={styles.cardGroup4}>
        <LinearGradient colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]} style={styles.card}>
          <Image source={siliImg} style={styles.cardIcon4} />
          <Text style={styles.cardLabel4}>Sili</Text>
        </LinearGradient>
      </View>
      {/* Talong Card */}
      <View style={styles.cardGroup5}>
        <LinearGradient colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]} style={styles.card}>
          <Image source={talongImg} style={styles.cardIcon5} />
          <Text style={styles.cardLabel5}>Talong</Text>
        </LinearGradient>
      </View>

      {/* Filter Pop-up Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterPopupContainer}>
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
              style={styles.filterPopupGradient}
            >
              <Text style={styles.filterPopupTitle}>Filter</Text>
              <Text style={styles.filterPopupOption}>Most Sold</Text>
              <Text style={styles.filterPopupOption}>Least Sold</Text>
              <Text style={styles.filterPopupOption}>Highest Price</Text>
              <Text style={styles.filterPopupOption}>Lowest Price</Text>
            </LinearGradient>
          </View>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setFilterVisible(false)} />
        </View>
      </Modal>
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
    left: 9,
    top: 18,
    width: 30,
    height: 30,
    zIndex: 10,
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    left: 24,
    top: 62,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 23,
    color: '#000',
  },
  searchGroup: {
    position: 'absolute',
    left: 34,
    top: 104,
    width: 344,
    height: 49,
  },
  searchBar: {
    position: 'absolute',
    width: 344,
    height: 49,
    backgroundColor: '#FFFFFE',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 32,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    top: 13,
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
  filterGroup: {
    position: 'absolute',
    left: 34,
    top: 166,
    width: 104,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    width: 45,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 45,
    height: 23,
    resizeMode: 'contain',
  },
  polygon: {
    width: 24,
    height: 17,
    marginLeft: 8,
    resizeMode: 'contain',
  },
  // Card Groups
  cardGroup1: {
    position: 'absolute',
    left: 44,
    top: 208,
    width: 324,
    height: 104,
  },
  cardGroup2: {
    position: 'absolute',
    left: 44,
    top: 332,
    width: 324,
    height: 104,
  },
  cardGroup3: {
    position: 'absolute',
    left: 44,
    top: 461,
    width: 324,
    height: 104,
  },
  cardGroup4: {
    position: 'absolute',
    left: 44,
    top: 585,
    width: 324,
    height: 104,
  },
  cardGroup5: {
    position: 'absolute',
    left: 44,
    top: 722,
    width: 324,
    height: 104,
  },
  card: {
    width: 324,
    height: 104,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  // Card icons and labels (positioned absolutely within the card group)
  cardIcon1: {
    position: 'absolute',
    left: 6,
    top: 7,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  cardLabel1: {
    position: 'absolute',
    left: 109,
    top: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 50,
    lineHeight: 59,
    color: '#FFFDEB',
  },
  cardIcon2: {
    position: 'absolute',
    left: 6,
    top: 7,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  cardLabel2: {
    position: 'absolute',
    left: 109,
    top: 19,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 50,
    lineHeight: 59,
    color: '#FFFDEB',
  },
  cardIcon3: {
    position: 'absolute',
    left: 6,
    top: 7,
    width: 77,
    height: 82,
    resizeMode: 'contain',
  },
  cardLabel3: {
    position: 'absolute',
    left: 109,
    top: 22,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 50,
    lineHeight: 59,
    color: '#FFFDEB',
  },
  cardIcon4: {
    position: 'absolute',
    left: 6,
    top: 7,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  cardLabel4: {
    position: 'absolute',
    left: 109,
    top: 22,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 50,
    lineHeight: 59,
    color: '#FFFDEB',
  },
  cardIcon5: {
    position: 'absolute',
    left: 6,
    top: 7,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  cardLabel5: {
    position: 'absolute',
    left: 109,
    top: 22,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 50,
    lineHeight: 59,
    color: '#FFFDEB',
  },
  // Filter Pop-up Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPopupContainer: {
    position: 'absolute',
    top: 180,
    left: 60,
    width: 158,
    height: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPopupGradient: {
    width: 112,
    height: 126,
    borderRadius: 32,
    position: 'absolute',
    left: 23,
    top: 14,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 13,
    paddingLeft: 11,
  },
  filterPopupTitle: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    color: '#FFF',
    marginBottom: 7,
    marginLeft: 23,
  },
  filterPopupOption: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
    marginBottom: 4,
    marginLeft: 11,
  },
  filterPopupPolygon: {
    position: 'absolute',
    width: 20.78,
    height: 12.75,
    left: 77,
    top: 16,
    resizeMode: 'contain',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default StatsPage; 