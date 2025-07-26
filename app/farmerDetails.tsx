import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function Magsasakaregister() {
  const [nameFirst, setNameFirst] = useState('');
  const [nameMiddle, setNameMiddle] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [verify, setVerify] = useState('');
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = () => {
    if (password === '' || confirmPassword === '') {
      setError('Both fields are required.');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
    } else {
      router.push('/farmer-verification')
    }
  };
  const navBack = () => {
    router.back() 
  };



  useLayoutEffect(() => {
    navigation.setOptions({ title: "Magsasaka Register Page" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background Shape */}
      <LinearGradient
      colors={['#10AF7C', '#86C778']} // your gradient colors
      start={{ x: 0, y: 0 }}  // optional: control direction
      end={{ x: 1, y: 1 }}
      style={styles.backgroundShape}
      />
      {/* Foreground Content */}
      <View style={styles.top}>
        <Text style={styles.header}>Gumawa ng Account</Text>
        <Text style={styles.subtitle}>Punan ang mga detalye sa ibaba upang makagawa ng iyong account.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Personal na Detalye</Text>
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
        <Text style={styles.label}>Address ng Sakahan</Text>
        <TextInput
          style={styles.input}
          placeholder="Buong Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <Text style={styles.label}>Contact Detils</Text>
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
        <Text style={styles.label}>Personal Identification Number (PIN)</Text>
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
        <View style={styles.nav}>
            <TouchableOpacity onPress={navBack} activeOpacity={0.7}>
            <Image
                source={require("../assets/images/Back To.png")}
                style={styles.imageButton2}
            />
            </TouchableOpacity>
            <Text style={styles.navText2} onPress={navBack}>BUMALIK</Text>
            <Text style={styles.navText} onPress={handleSubmit}>SUNOD</Text>
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
            <Image
                source={require("../assets/images/Next Page.png")}
                style={styles.imageButton}
            />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundShape: {
    position: 'absolute',
    width: 450,
    height: 790,
    backgroundColor: '#10AF7C',
    borderRadius: 70, // circle
    bottom: -100,
    zIndex: -1, // Send behind other components
    left: -20
  },
  top: {
    flex: 1
    ,
  },
  header: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    top: 70,
    left: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    top: 74,
    left: 40,
    maxWidth: '85%',
  },
  content: {
    flex: 5,
    padding: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    left: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '85%',
    padding: 10,
    borderRadius: 7,
    marginLeft: 20,
    backgroundColor: '#FFFDEB',
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginBottom: 8,
    elevation: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  uploadButton: {
    backgroundColor: '#FFFDEB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
    marginLeft: 20,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  inputDesc: {
    height: 150,
    width: '85%',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    backgroundColor: '#FFFDEB',
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    marginBottom: 20
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
    marginRight: 25,
  },
  imageButton: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  imageButton2: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  navText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginRight: 5,
  },
  navText2: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginRight: 100,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  success: {
    color: 'green',
    fontSize: 14,
  },
});