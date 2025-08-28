import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
<<<<<<< HEAD
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
}
=======
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
>>>>>>> 653c4610c8dca1ace73d48e1c81adb0c347cb30a

export default function Magsasakaregister() {
  const [productId, setProductId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  const [priceError, setPriceError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

  const [products] = useState<Product[]>([
    { id: "palay", name: "Palay" },
    { id: "sibuyas", name: "Sibuyas" },
    { id: "kamatis", name: "Kamatis" },
    { id: "sili", name: "Sili" },
    { id: "talong", name: "Talong" },
  ]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Magsasaka Register Page" });
  }, [navigation]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const validatePrice = (value: string) => {
    setPrice(value);
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      setPriceError("Pakilagay ng tamang presyo (numero lamang).");
    } else {
      setPriceError("");
    }
  };

  const validateAmount = (value: string) => {
    setAmount(value);
    if (!/^\d+$/.test(value)) {
      setAmountError("Pakilagay ng tamang dami (numero lamang).");
    } else {
      setAmountError("");
    }
  };

  const isFormValid =
    productId &&
    price &&
    amount &&
    description &&
    image &&
    !priceError &&
    !amountError;

  const handleNext = () => {
    setTouched(true);
    if (!isFormValid) return;

    const data = { productId, price, amount, description, image };
    router.push({ pathname: "/sellpage3", params: data });
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {/* Header */}
      <View style={styles.textSection}>
        <Pressable style={styles.backPosition} onPress={() => router.back()}>
          <Image
            style={styles.backIcon}
            source={require("../assets/STARTer/back-icon.png")}
          />
        </Pressable>
        <View style={styles.headerTextSection}>
          <Text style={styles.mainText}>Magbenta ng Tanim</Text>
          <Text style={styles.subText}>Pakilagay ang mga detalye</Text>
        </View>
      </View>

      {/* Green Form Container */}
      <LinearGradient
        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "rgba(134,199,120,0.87)"]}
        style={styles.greenContainer}
      >
        <View style={styles.scrollViewContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator>
            {/* Product Picker */}
            <Text style={[styles.label, touched && !productId && { color: "red" }]}>
              Piliin ang Produkto
            </Text>
            <View
              style={[
                styles.input,
                touched && !productId && { borderColor: "red", borderWidth: 2 },
              ]}
            >
              <Picker
                selectedValue={productId}
                onValueChange={(itemValue: string) => setProductId(itemValue)}
              >
                <Picker.Item label="Pumili ng Produkto" value="" />
                {products.map((prod) => (
                  <Picker.Item key={prod.id} label={prod.name} value={prod.id} />
                ))}
              </Picker>
            </View>

            {/* Price */}
            <Text style={[styles.label, touched && !price && { color: "red" }]}>
              Presyo (Per Kilo)
            </Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={styles.flexInput}
                placeholder="Halimbawa: 30, 40, 50"
                value={price}
                onChangeText={validatePrice}
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>PHP</Text>
            </View>
            {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}

            {/* Amount */}
            <Text style={[styles.label, touched && !amount && { color: "red" }]}>
              Dami
            </Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={styles.flexInput}
                placeholder="Halimbawa: 10, 20, 30"
                value={amount}
                onChangeText={validateAmount}
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>kilograms</Text>
            </View>
            {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}

            {/* Image Upload */}
            <Text style={[styles.label, touched && !image && { color: "red" }]}>
              Imahe ng Produkto
            </Text>
            <Pressable style={styles.dropArea} onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              ) : (
                <Text style={styles.uploadText}>Pindutin Upang Makapili</Text>
              )}
            </Pressable>

            {/* Description */}
            <Text style={[styles.label, touched && !description && { color: "red" }]}>
              Deskripsyon
            </Text>
            <TextInput
              style={[styles.inputDesc, touched && !description && { borderColor: "red", borderWidth: 2 }]}
              placeholder="Ilagay ang detalyadong impormasyon"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>

      {/* Bottom Buttons */}
      <View style={styles.buttons}>
        <Pressable style={styles.buttonWithText} onPress={handleNext}>
          <Text style={styles.buttonText}>SUNOD</Text>
          <Image
            source={require("../assets/STARTer/Farmer Verification/next-page.png")}
            style={styles.buttonIcon}
          />
        </Pressable>
      </View>
=======
      
      
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
      
>>>>>>> 653c4610c8dca1ace73d48e1c81adb0c347cb30a
    </View>
  );
}

const MAX_WIDTH = 338;
const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: "#E6F5EC" },
  greenContainer: {
    top: "4%",
    flex: 5,
    width: width * 1.16,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: "#000",
    shadowOpacity: 0.51,
    shadowRadius: 8.7,
    shadowOffset: { width: 17, height: 4 },
    elevation: 4,
    zIndex: 2,
    alignSelf: "center",
  },
  scrollViewContainer: {
    top: "4%",
    height: height * 0.652,
    width: MAX_WIDTH,
    alignSelf: "center",
=======
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
>>>>>>> 653c4610c8dca1ace73d48e1c81adb0c347cb30a
  },
  textSection: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTextSection: { top: height * 0.04 },
  mainText: { textAlign: "center", fontSize: RFValue(27), fontFamily: "Roboto-Bold" },
  subText: { textAlign: "center", fontSize: RFValue(14), width: width * 0.9 },
  backPosition: {
    position: "absolute",
    width: height * 0.03,
    height: height * 0.03,
    left: width * 0.04,
    top: height * 0.04,
  },
  backIcon: { width: "100%", height: "100%" },
  label: { fontSize: RFValue(13), fontFamily: "Roboto-Medium", marginBottom: 10, color: "#FFF" },
  input: {
<<<<<<< HEAD
    backgroundColor: "#FFFDEB",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginBottom: 12,
    width: MAX_WIDTH,
  },
  inputWithUnit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDEB",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    width: MAX_WIDTH,
=======
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
>>>>>>> 653c4610c8dca1ace73d48e1c81adb0c347cb30a
  },
  flexInput: { flex: 1, fontSize: 16, fontFamily: "Roboto-Regular", padding: 10 },
  unitText: { fontSize: 14, fontFamily: "Roboto-Bold", color: "black", marginLeft: 8 },
  errorText: { color: "red", fontSize: 12, marginBottom: 8 },
  inputDesc: {
<<<<<<< HEAD
    backgroundColor: "#FFFDEB",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
    width: MAX_WIDTH,
  },
  dropArea: {
    height: 120,
    width: MAX_WIDTH,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDEB",
    elevation: 4,
    marginBottom: 12,
  },
  uploadText: { color: "#8F8E8E", fontSize: RFValue(12), fontFamily: "Roboto-Regular" },
  buttons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: width * 0.8,
    height: 47,
    bottom: "2%",
    alignSelf: "center",
    zIndex: 3,
  },
  buttonWithText: { flexDirection: "row", alignItems: "center", gap: 5 },
  buttonIcon: { width: 29, height: 29, resizeMode: "contain" },
  buttonText: { color: "white", fontSize: RFValue(15), fontFamily: "Roboto-Bold" },
=======
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


>>>>>>> 653c4610c8dca1ace73d48e1c81adb0c347cb30a
});