import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FarmerVerificationScreen() {
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
  const [success, setSuccess] = useState('');

  const isButtonDisabled =
    !nameFirst ||
    !nameLast ||
    !address ||
    !number ||
    !verify ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  const handleSubmit = () => {
    if (isButtonDisabled) return;

    if (password === '' || confirmPassword === '') {
      setError('Both fields are required.');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('Success!');
      router.push('/farmer-verification');
    }
  };

  const pickImage = async (setImage) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backIconWithHeader}>
        <Pressable style={styles.backButton} onPress={() => router.push("/signUp")}>
          <Image style={styles.backIcon} source={require("../assets/STARTer/back-icon.png")} />
        </Pressable>

        <View style={styles.upperText}>
          <Text style={styles.header}>Gumawa ng Account</Text>
          <Text style={styles.instruction}>
            Punan ang mga detalye sa ibaba upang makagawa ng iyong account.
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778', 'rgba(134,199,120,0.87)']}
        style={styles.greenContainer}
      >
        <View style={styles.inputAndLabel}>
          <Text style={styles.uploadLabel}>Personal Details</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={nameFirst}
            onChangeText={setNameFirst}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Middle Name"
            value={nameMiddle}
            onChangeText={setNameMiddle}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={nameLast}
            onChangeText={setNameLast}
            multiline
          />
        </View>

        <View style={styles.inputAndLabel}>
          <Text style={styles.uploadLabel}>Address ng Sakahan</Text>
          <TextInput
            style={styles.input}
            placeholder="Buong Address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        <View style={styles.inputAndLabel}>
          <Text style={styles.uploadLabel}>Contact Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Numero ng Telepono"
            value={number}
            onChangeText={setNumber}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            value={verify}
            onChangeText={setVerify}
            multiline
          />
        </View>

        <View style={styles.inputAndLabel}>
          <Text style={styles.uploadLabel}>Personal Identification Number (PIN)</Text>
          <TextInput
            style={styles.input}
            placeholder="Gumawa ng PIN"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Kumpirmahin ang PIN"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
        </View>

        <View style={styles.buttons}>
          <ButtonWithText
            icon={require('../assets/STARTer/Farmer Verification/next-page.png')}
            label="NEXT"
            onPress={handleSubmit}
            disabled={isButtonDisabled}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

function ButtonWithText({ icon, label, reverse, onPress, disabled }) {
  return (
    <Pressable
      style={[styles.buttonWithText, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {reverse && <Image source={icon} style={styles.buttonIcon} />}
      <Text style={[styles.buttonText, disabled && styles.textDisabled]}>{label}</Text>
      {!reverse && <Image source={icon} style={styles.buttonIcon} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
    position: 'relative',
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
    paddingTop: 25,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.51,
    shadowRadius: 8.7,
    shadowOffset: { width: 17, height: 4 },
    elevation: 4,
  },
  inputAndLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadLabel: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'flex-start',
    marginLeft: '7.5%',
  },
  input: {
    height: 44,
    width: '85%',
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#FFFDEB',
    fontFamily: 'Roboto-Regular',
    marginTop: 7,
    verticalAlign: 'center',
    fontSize: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 8.7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 346,
    height: 47,
    marginTop: 20,
    alignSelf: 'center',
    bottom: 25,
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
  buttonDisabled: {
    opacity: 0.5,
  },
  textDisabled: {
    color: '#ccc',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  success: {
    color: 'green',
    marginTop: 5,
  },
});
