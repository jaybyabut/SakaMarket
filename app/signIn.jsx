import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SignInScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ phone: '', pin: '' });
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState({ phone: false, pin: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { phone, pin } = form;
    const newInputErrors = {
      phone: phone.trim() === '',
      pin: pin.trim() === '',
    };
    setInputErrors(newInputErrors);

    if (newInputErrors.phone || newInputErrors.pin) {
      setError('Pakitapos ang lahat ng fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://10.0.2.2/database/login.php', {
        phone,
        pin,
      });

      const data = response.data;

      if (data.error) {
        setError(data.error);
      } else if (data.role === 'farmer') {
        router.push('/home-magsasaka');
      } else if (data.role === 'buyer') {
        router.push('/home-buyer');
      } else {
        setError('Hindi matukoy ang user role.');
      }
    } catch (e) {
      console.error(e);
      setError('May problema sa server. Subukan muli.');
    } finally {
      setLoading(false);
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

          <View style={styles.labelAndInput}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.inputBar, inputErrors.phone && { borderColor: 'red' }]}
              keyboardType="phone-pad"
              onChangeText={(text) => setForm((prev) => ({ ...prev, phone: text }))}
            />
          </View>

          <View style={styles.labelAndInput}>
            <Text style={styles.label}>PIN</Text>
            <TextInput
              style={[styles.inputBar, inputErrors.pin && { borderColor: 'red' }]}
              secureTextEntry
              keyboardType="numeric"
              onChangeText={(text) => setForm((prev) => ({ ...prev, pin: text }))}
            />
          </View>
        </View>

        {/* Error Text */}
        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>
        ) : null}

        {/* Buttons */}
        <View style={styles.buttons}>
          <LinearGradient
            colors={['#10AF7C', '#86C778']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInGradient}
          >
            <Pressable style={styles.fullButton} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInText}>Mag-sign in sa Account</Text>
              )}
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
  signInSection: {
    alignItems: 'center',
  },
  signInTitle: {
    fontSize: 60,
    width: 198,
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
