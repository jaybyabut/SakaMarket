import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const LandingPage = ({ navigation = { navigate: () => {} } }) => {
  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/STARTer/Landing Page/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.nameContainer}>
          <Image
            source={require('../assets/STARTer/Landing Page/logo-name.png')}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        {/* Sign In Button with Gradient */}
        <LinearGradient
          colors={['#10AF7C', '#86C778']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.signInButton}
        >
          <Pressable style={styles.fullSize} onPress={() => router.push('/signIn')}>
            <Text style={styles.signInText}>Mag-sign in sa Account</Text>
          </Pressable>
        </LinearGradient>

        {/* Create Account Button */}
        <Pressable style={styles.createButton} onPress={() => router.push('/signUp')}>
          <Text style={styles.createText}>Gumawa ng Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Page Layout
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffffff',
  },

  // Logo & Title
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 215,
    height: 307,
    marginBottom: 186,
  },
  logo: {
    width: 192,
    height: 238,
    marginBottom: 22,
  },
  nameContainer: {
    width: 215,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Secular One',
    fontSize: 32,
    fontWeight: '400',
  },
  saka: {
    color: '#FFCA43',
  },
  market: {
    color: '#088423',
  },

  // Buttons Container
  buttonGroup: {
    width: 280,
    height: 149,
    justifyContent: 'space-between',
  },

  // Sign In Button (with gradient)
  signInButton: {
    width: 279,
    height: 63,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fullSize: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
  },

  // Create Account Button
  createButton: {
    borderRadius: 12,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#10AF7C',
    borderWidth: 1,
  },
  createText: {
    color: '#10AF7C',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
});

export default LandingPage;
