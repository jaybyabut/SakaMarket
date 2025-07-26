import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/STARTer/Confirmation Page/checkmark.png')}
          style={styles.checkmark}
          resizeMode="contain"
        />
        <Text style={styles.success}>Success!</Text>
        <Text style={styles.message}>
          Salamat sa pagpuna ng mga hinihinging detalye. Maghintay ng
          kumpirmasyon sa iyong phone number upang malaman kung puwede nang
          buksan ang iyong account.
        </Text>
      </View>

      <Pressable
        style={styles.jumpToLogin}
        onPress={() => navigation.navigate('signIn')}
      >
        <Text style={styles.loginText}>Pumunta sa Log-in Page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 40,             
  },
  contentContainer: {
    flexGrow: 1,                    
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
  },
  checkmark: {
    width: 216,
    height: 216,
  },
  success: {
    fontSize: 48,
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    width: '100%',
  },
  message: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginBottom: 40,
    textAlign: 'center',
    height: 'fit-content',
    width: '100%',
  },
  jumpToLogin: {
    backgroundColor: '#FEF5A6',
    width: 319,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  loginText: {
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
});
