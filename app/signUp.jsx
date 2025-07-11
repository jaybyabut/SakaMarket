import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <Image
        style={styles.backIcon}
        source={require('../assets/STARTer/back-icon.png')}
      />

      <View style={styles.container}>
        {/* Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.signupText}>Sign Up</Text>
          <Text style={styles.questionText}>Ano ang iyong tungkulin?</Text>
        </View>

        {/* Role Buttons */}
        <View style={styles.buttonsContainer}>
          <LinearGradient
            colors={[Colors.primaryGreen, Colors.gradientGreenStart, Colors.gradientGreenMid, Colors.gradientGreenEnd]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Pressable style={styles.buttonContent} onPress={() => router.push('/magsasaka-register')}>
              <Image
                style={styles.buttonIcon}
                source={require('@/assets/STARTer/Sign Up/magsasaka-icon.png')}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Magsasaka</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={[Colors.primaryGreen, Colors.gradientGreenStart, Colors.gradientGreenMid, Colors.gradientGreenEnd]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Pressable style={styles.buttonContent} onPress={() => router.push('/mamimili-register')}>
              <Image
                style={styles.buttonIcon}
                source={require('@/assets/STARTer/Sign Up/cart-icon.png')}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Mamimili</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 30,
    height: 30,
    zIndex: 1,
  },
  container: {
    width: 364,
    height: 723,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    width: 229,
    height: 91,
    marginBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 48,
    fontFamily: 'Roboto-Bold',
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  buttonsContainer: {
    gap: 40,
  },
  button: {
    width: 280,
    height: 276,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2.3,
    elevation: 3,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 212,
    height: 212,
  },
  buttonText: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    color: 'white',
    marginTop: 8,
  },
});