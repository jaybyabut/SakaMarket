import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ProductPage() {
  const item = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.everythingContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/images/Back-w.png')} />
        </TouchableOpacity>
        <Image
          // source={require('../assets/images/sample-product.png')} // fallback placeholder
          style={styles.productImage}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titleLine}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>{item.name}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={[styles.priceText, { color: '#48BA7A' }]}>₱{item.price}</Text>
          </View>
        </View>

        <Text style={styles.additionalText}>Magsasaka: {item.farmer_name}</Text>
        <Text style={styles.additionalText}>Address: {item.farmer_address}</Text>
        <Text style={styles.additionalText}>Description: {item.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/payment',
              params: { ...item }, // pass all product details
            })
          }
        >
          <LinearGradient
            colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778', '#86C778']}
            style={styles.gradientBtn}
          >
            <Text style={styles.btnText}>BILHIN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  everythingContainer: { flex: 1 },
  imageContainer: { flex: 1.2, borderRadius: 32, elevation: 10, paddingBottom: 10 },
  productImage: { width: width, height: '100%', borderRadius: 32 },
  backButton: {
    position: 'absolute',
    backgroundColor: 'rgba(73, 73, 73, 0.8)',
    borderRadius: 32,
    left: '5%',
    top: '5%',
    zIndex: 2,
  },
  infoContainer: { flex: 2, marginTop: '10%', marginHorizontal: '5%', gap: 10 },
  titleLine: { flexDirection: 'row' },
  titleBox: { flex: 1 },
  priceBox: { flex: 1 },
  titleText: { fontSize: RFValue(22), fontWeight: '700' },
  priceText: { fontSize: RFValue(22), fontWeight: '700', textAlign: 'right' },
  additionalText: { color: '#333', fontSize: RFValue(14) },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { width: width * 0.7, height: height * 0.08 },
  gradientBtn: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#FFF', fontSize: RFValue(18), fontWeight: '700' },
});