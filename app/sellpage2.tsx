import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');

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
      
      
      <View style={styles.top}>
        <Pressable style={styles.backPosition} onPress={() => router.back()}>
                  <Image
                    style={styles.backIcon}
                    source={require('../assets/STARTer/back-icon.png')}
                        />
                </Pressable>
        <Text style={styles.header}>Magbenta ng Tanim</Text>
        <Text style={styles.subtitle}>Punan ang mga sumusunod na detalye</Text>
      </View>
      
      
      {/* Background Shape */}
      <View style={styles.backgroundShape}>
      {/* Foreground Content */}
      
      <View style={styles.content}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={true} overScrollMode="never" contentContainerStyle={{ paddingBottom: 20 }}>
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
        </KeyboardAwareScrollView>
        
      </View>
      
      <View style={styles.buttons}>
                    <Pressable style={styles.buttonWithText} onPress={handleNext}>
                      <Text style={styles.buttonText}>SUNOD</Text>
                      <Image source={require('../assets/STARTer/Farmer Verification/next-page.png')} style={styles.buttonIcon} />
                    </Pressable>
                  </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.8,
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
  },
  backgroundShape: {
    flex: 4,
    backgroundColor: '#28B47B',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    width: width * 1.15,
    alignSelf: 'center',
  },
  content: {
    height: '87%',
    alignSelf: 'center',
    width: '80%',
    marginTop: '5%',
    paddingLeft: 10,

  },
  header: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: RFValue(14),
    color: 'black',

  },
  backPosition: {
    position: 'absolute',
    width: height * 0.03,
    height: height * 0.03,
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.05
  },
  backIcon: {
    height: '100%',
    width: '100%'
  },
  label: {
    fontSize: RFValue(14),
    color: 'white',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
    width: '95%',
    height: 45,
    backgroundColor: '#FFFDEB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 4,
  },
  inputDesc: {
    height: 80,
    width: '95%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFDEB',
    textAlignVertical: 'top', // For Android to align text at the top
  },
  uploadButton: {
    height: 80,
    width: '95%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFFDEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: RFValue(14),
    color: 'gray',
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width * 0.80,
    height: 47,
    bottom: '0.3%',
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


});