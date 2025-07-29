import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextStyle } from 'react-native';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';

export default function Magsasakaregister() {
  const router = useRouter();

  const [nameFirst, setNameFirst] = useState('');
  const [nameMiddle, setNameMiddle] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [verify, setVerify] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  const isFormComplete =
    nameFirst &&
    nameMiddle &&
    nameLast &&
    address &&
    number &&
    verify &&
    password &&
    confirmPassword;

  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const validateFields = () => {
    const errors: string[] = [];

    if (!nameFirst || !nameMiddle || !nameLast) {
      errors.push('Pakilagay ang buong pangalan.');
    }

    if (!address) {
      errors.push('Pakilagay ang address.');
    }

    if (!number || number.length < 11) {
      errors.push('Di-wastong numero ng telepono.');
    }

    if (!verify || verify.length !== 6) {
      errors.push('Di-wastong verification code.');
    }

    if (!password || !confirmPassword) {
      errors.push('Parehong PIN ay kinakailangan.');
    } else if (password !== confirmPassword) {
      errors.push('Hindi magkatugma ang PIN.');
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const inputStyle = (
  type: 'number' | 'verify' | 'password' | 'default' = 'default',
  invalid = false
): TextStyle => ({
    width: '100%',
    maxWidth: 338,
    height: 45,
    backgroundColor: '#FFFDEB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: invalid ? 'red' : '#ccc',
  });


  const handleSubmit = async () => {
    setSuccess('');
    setError('');
    setErrorMessages([]);
    setInvalidFields([]);

    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch('https://10.0.2.2/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: nameFirst,
          middleName: nameMiddle,
          lastName: nameLast,
          address,
          phone: number,
          code: verify,
          pin: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setSuccess('Matagumpay ang pagrehistro!');
      router.push('/farmer-verification');
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <View style={styles.screen}>
      <View style={styles.backIconWithHeader}>
        <Pressable style={styles.backButton} onPress={() => router.push('/signUp')}>
          <Image style={styles.backIcon} source={require('../assets/STARTer/back-icon.png')} />
        </Pressable>

        <View style={styles.upperText}>
          <Text style={styles.header}>Gumawa ng Account</Text>
          <Text style={styles.instruction}>
            Ilagay ang iyong personal na impormasyon upang magpatuloy
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778', 'rgba(134,199,120,0.87)']}
        style={styles.greenContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.content}>
              <Text style={styles.label}>Personal na Detalye</Text>
              <TextInput
                style={inputStyle('default', invalidFields.includes('nameFirst'))}
                placeholder="Pangalan (Hal. Juan)"
                value={nameFirst}
                onChangeText={setNameFirst}
              />
              <TextInput
                style={inputStyle('default')}
                placeholder="Gitnang Pangalan (Hal. Reyes)"
                value={nameMiddle}
                onChangeText={setNameMiddle}
              />
              <TextInput
                style={inputStyle('default')}
                placeholder="Apelyido (Hal. Dela Cruz)"
                value={nameLast}
                onChangeText={setNameLast}
              />
              <TextInput
                style={inputStyle('default', invalidFields.includes('address'))}
                placeholder="Address ng Sakahan (Hal. Brgy. Masagana)"
                value={address}
                onChangeText={setAddress}
              />

              <Text style={styles.label}>Contact Details</Text>
              <TextInput style={inputStyle('number')} placeholder="Numero ng Telepono (Hal. 09123456789)" value={number} onChangeText={setNumber} keyboardType="phone-pad" />
              <TextInput style={inputStyle('verify')} placeholder="Verification Code (Hal. 123456)" value={verify} onChangeText={setVerify} keyboardType="numeric" />

              <Text style={styles.label}>PIN</Text>
              <TextInput style={inputStyle('password')} placeholder="Gumawa ng PIN" secureTextEntry value={password} onChangeText={setPassword} />
              <TextInput style={inputStyle('password')} placeholder="Kumpirmahin ang PIN" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

              <View style={styles.alertContainer}>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {success ? <Text style={styles.success}>{success}</Text> : null}
                {errorMessages.length > 0 && (
                <View>
                  {errorMessages.map((msg, index) => (
                    <Text key={index} style={{color: 'red', marginBottom: 3 }}>
                      {msg}
                    </Text>
                  ))}
                </View>
              )}
              </View>
            </View>

            
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.buttons}>
          <Pressable style={styles.buttonWithText} onPress={() => router.back()}>
            <Image source={require('../assets/STARTer/Farmer Verification/back-page.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>NAKARAAN</Text>
          </Pressable>
          <Pressable style={styles.buttonWithText} onPress={handleSubmit} disabled={!isFormComplete}>
            <Text style={[styles.buttonText, { opacity: isFormComplete ? 1 : 0.5 }]}>SUNOD</Text>
            <Image source={require('../assets/STARTer/Farmer Verification/next-page.png')} style={styles.buttonIcon} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: -45,
    left: -5,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  backIconWithHeader: {
    position: "relative",
  },
  upperText: {
    width: 366,
    height: 86,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    marginBottom: 6.5,
  },
  instruction: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  greenContainer: {
    marginTop: 3,
    width: 464,
    flex: 1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingHorizontal: 44,
    paddingTop: 9,
    paddingBottom: 28,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.51,
    shadowRadius: 8.7,
    shadowOffset: { width: 17, height: 4 },
    elevation: 4,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 80,
    width: '100%',
    gap: 16,
  },
  inputField: {
    width: '100%',
    maxWidth: 338,
    alignSelf: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 346,
    height: 47,
    bottom: 25,
    alignSelf: 'center',
  },
  buttonWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonIcon: {
    width: 29,
    height: 29,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
  backgroundShape: {
    position: 'absolute', width: 460, height: 800,
    backgroundColor: '#10AF7C', borderRadius: 80,
    bottom: -100, zIndex: -1, left: -20,
  },
  top: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
    maxWidth: '85%',
  },
  imageButton: {
    width: 30, height: 30,
    marginBottom: 10,
  },
  content: {
    width: '100%',
    maxWidth: 338,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    height: 42,
    width: '90%',
    backgroundColor: '#FFFDEB',
    borderRadius: 7,
    paddingHorizontal: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30,
    marginRight: 15,
  },
  navText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginRight: 10,
  },
  imageButton2: {
    width: 30, height: 30,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
  },
  success: {
    color: 'green',
    fontSize: 14,
    marginLeft: 10,
  },
  alertContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
});