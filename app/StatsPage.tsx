import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';

// Image assets
const backImg = require('../assets/images/Back.png');
const searchImg = require('../assets/images/Search.png');
const palayImg = require('../assets/images/Palay.png');
const sibuyasImg = require('../assets/images/Sibuyas.png');
const kamatisImg = require('../assets/images/Kamatis.png');
const siliImg = require('../assets/images/Sili.png');
const talongImg = require('../assets/images/Talong.png');

type RootStackParamList = {
  StatsPage: undefined;
  SalesData: { product: string };
};

const products = [
  { name: 'Palay', image: palayImg },
  { name: 'Sibuyas', image: sibuyasImg },
  { name: 'Kamatis', image: kamatisImg },
  { name: 'Sili', image: siliImg },
  { name: 'Talong', image: talongImg },
];

const StatsPage: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image source={backImg} style={styles.backImage} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Market Transactions</Text>

      {/* Search Bar */}
      <View style={styles.searchGroup}>
        <View style={styles.searchBar} />
        <Image source={searchImg} style={styles.searchIcon} />
      </View>

      {/* Product Cards */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {products.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/SalesData', params: { product: item.name } })}
          >
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
              style={styles.card}
            >
              <Image source={item.image} style={styles.cardIcon} />
              <Text style={styles.cardLabel}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 50 },
  backButton: { position: 'absolute', left: 9, top: 18, zIndex: 10 },
  backImage: { width: 30, height: 30, resizeMode: 'contain' },
  title: { fontFamily: 'Roboto-Bold', fontSize: 22, color: '#000', marginBottom: 20, marginLeft: 10 },
  searchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 32,
    height: 49,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  searchBar: { flex: 1 },
  searchIcon: { width: 23, height: 23, resizeMode: 'contain' },
  scrollContent: { paddingBottom: 30 },
  card: {
    width: screenWidth - 40,
    height: 110,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardIcon: { width: 85, height: 85, resizeMode: 'contain' },
  cardLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    color: '#FFFDEB',
    marginLeft: 20,
  },
});

export default StatsPage;