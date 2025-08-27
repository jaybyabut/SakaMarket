import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Payment() {
  const item = useLocalSearchParams();
  const [paymentMode, setPaymentMode] = useState('');
  const [pickup, setPickup] = useState('');

  const handlePayment = async () => {
    if (!paymentMode) {
      Alert.alert('Paalala', 'Pumili ng paraan ng pagbabayad.');
      return;
    }
    if (!pickup.trim()) {
      Alert.alert('Paalala', 'Ilagay ang lugar ng pagkuha.');
      return;
    }

    try {
      // Call backend (optional)
      await axios.post('http://10.0.2.2/database/buyProduct.php', {
        product_id: item.id,
        amount: item.amount || 1,
        payment_mode: paymentMode,
        pickup_location: pickup,
      });

      router.push({
        pathname: '/buy-confirmation',
        params: { ...item, paymentMode, pickup },
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hindi makakonekta sa server.');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image source={require('../assets/images/Back-w.png')} />
      </TouchableOpacity>

      <LinearGradient colors={['#10AF7C', '#86C778', '#FFFFFF']} style={{ flex: 1 }}>
        <View style={styles.titleAreaContainer}>
          <Text style={styles.mainTitle}>Pagbabayad</Text>
        </View>

        <View style={styles.whiteContainer}>
          <Text style={styles.paraan}>Paraan ng Pagbabayad:</Text>
          <LinearGradient colors={['#10AF7C', '#86C778']} style={styles.card}>
            <RadioButton.Group onValueChange={setPaymentMode} value={paymentMode}>
              <RadioButton.Item label="Card" value="card" labelStyle={{ color: 'white' }} />
              <RadioButton.Item label="Maya" value="maya" labelStyle={{ color: 'white' }} />
              <RadioButton.Item label="GCash" value="gcash" labelStyle={{ color: 'white' }} />
            </RadioButton.Group>
          </LinearGradient>

          <Text style={styles.lugar}>Lugar ng Pagkuha:</Text>
          <TextInput
            placeholder="123 Main St, City"
            style={styles.input}
            value={pickup}
            onChangeText={setPickup}
          />

          <View style={styles.totalLine}>
            <Text style={styles.txtTotal}>Total:</Text>
            <Text style={styles.txtTotalPrice}>₱{item.price}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <LinearGradient
              colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778', '#86C778']}
              style={styles.gradientBtn}
            >
              <Text style={styles.btnText}>Magbayad Na</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  backButton: { position: 'absolute', zIndex: 2, left: '5%', top: '5%' },
  mainTitle: { color: '#FFF', fontSize: RFValue(25), fontWeight: '700' },
  titleAreaContainer: { flex: 1, justifyContent: 'center', alignSelf: 'center' },
  whiteContainer: {
    flex: 3,
    backgroundColor: '#FFF',
    borderRadius: 40,
    marginHorizontal: 20,
    padding: 20,
  },
  paraan: { fontWeight: '700', fontSize: RFValue(15), marginTop: 10 },
  card: { borderRadius: 20, padding: 10, marginVertical: 10 },
  lugar: { fontWeight: '700', fontSize: RFValue(15), marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 20, padding: 10, marginTop: 5 },
  totalLine: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  txtTotal: { fontWeight: '700', fontSize: RFValue(18) },
  txtTotalPrice: { fontWeight: '700', fontSize: RFValue(18), color: '#10AF7C' },
  button: { height: height * 0.07, borderRadius: 20 },
  gradientBtn: { flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: RFValue(18), fontWeight: '700' },
});