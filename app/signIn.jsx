import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';



export default function SignInScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    'Email/Phone Number': '',
    Password: ''
  });

  const handleSubmit = () => {
    if (form['Email/Phone Number'].trim().toLowerCase() === 'magsasaka') {
      router.push('/home-magsasaka')
    } else {
      router.push('/home-buyer')
    }
  };


  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* Logo & Name */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/STARTer/Images/Landing Page/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.nameDiv}>
            <Image
              source={require('../assets/STARTer/Images/Landing Page/logo-name.png')}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Form */}
        <View style={styles.signInSection}>
          <Text style={styles.signInTitle}>Sign In</Text>

          {['Email/Phone Number', 'Password'].map((label, index) => (
            <View key={label} style={styles.labelAndInput}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.inputBar}
                placeholder=""
                secureTextEntry={label === 'Password'}
                onChangeText={(text) =>
                setForm((prev) => ({ ...prev, [label]: text }))}
              />
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <LinearGradient
            colors={['#10AF7C', '#86C778']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInGradient}
          >
            <Pressable style={styles.fullButton} onPress={handleSubmit}>
              <Text style={styles.signInText}>Mag-sign in sa Account</Text>
            </Pressable>
          </LinearGradient>

          <Pressable onPress={() => router.push('/signUp')}>
            <Text style={styles.noAccText}>Wala pa akong Account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    width: 364,
    height: 723,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    flexDirection: 'row',
    width: 287,
    height: 77,
    alignItems: 'center',
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
  saka: {
    color: '#FFCA43',
  },
  market: {
    color: '#088423',
  },
  signInSection: {
    alignItems: 'center',
  },
  signInTitle: {
    fontSize: 60,
    width: 198,
    height: 'fit-content',
    marginBottom: 31,
    textAlign: 'center',
    fontFamily: 'Roboto-SemiBold',
  },
  labelAndInput: {
    marginBottom: 15,
    width: 364,
    height: 88,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
  },
  inputBar: {
    width: 358,
    height: 59,
    borderColor: '#6E6565',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    shadowColor: '#9F9F9F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  buttons: {
    height: 93,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signInGradient: {
    width: 279,
    height: 63,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fullButton: {
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
  noAccText: {
    marginTop: 10,
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
});
