import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function Magsasakaregister() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

const handleNext = () => {
    const data = { name, price, description, amount, image };
    // go to confirm page with params
    router.push({ pathname: "/sellpage3", params: data });
  };

  const navBack = () => {
    router.push("/sellpage1") 
  };
  /*const navNext = () => {
    router.push("/sellpage3") 
  };*/

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your photos!');
      return;
    }
    
    // Launch picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Store image URI
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Magsasaka Register Page" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background Shape */}
      <View style={styles.backgroundShape} />
      {/* Foreground Content */}
      <View style={styles.top}>
        <Text style={styles.header}>Magbenta ng Tanim</Text>
        <Text style={styles.subtitle}>Pakilagay ang mga detalye</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Pangalan ng Produkto</Text>
        <TextInput
          style={styles.input}
          placeholder="(hal. Bigas, Mais, Talong)"
          value={name}
          onChangeText={setName}
          multiline
        />
        <Text style={styles.label}>Presyo ng Produkto (Per Kilo)</Text>
        <TextInput
          style={styles.input}
          placeholder="(hal. P20, P30, P40)"
          value={price}
          onChangeText={setPrice}
          multiline
        />
        <Text style={styles.label}>Dami ng Produkto (Kilo)</Text>
        <TextInput
          style={styles.input}
          placeholder="(hal. 10kg, 20kg, 30kg)"
          value={amount}
          onChangeText={setAmount}
          multiline
        />
        <Text style={styles.label}>Imahe ng Produkto</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Pindutin Upang Makapili</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Deskripsyon ng Produkto (Kilo)</Text>
        <TextInput
          style={styles.inputDesc}
          placeholder="Ilagay ang detalyadong impormasyon tungkol sa produkto"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.nav}>
          <TouchableOpacity onPress={navBack} activeOpacity={0.7}>
            <Image
              source={require("../assets/images/Back To.png")}
              style={styles.imageButton2}
            />
          </TouchableOpacity>
          <Text style={styles.navText2}>BUMALIK</Text>
          <Text style={styles.navText}>SUNOD</Text>
          <TouchableOpacity onPress={handleNext} activeOpacity={0.7}>
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
    height: 830,
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
    top: 60,
    left: 40
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    top: 59,
    left: 40
  },
  content: {
    flex: 7,
    padding: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: 'white',
    fontFamily: 'Roboto-Regular',
    left: 20,
  },
  input: {
    height: 50,
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
    marginTop: 20,
    marginRight: 20,
  },
  imageButton: {
    width: 30,
    height: 30,
    marginRight: 10,
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
    marginRight: 105,
  }
});