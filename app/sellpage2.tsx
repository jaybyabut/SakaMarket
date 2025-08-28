<<<<<<< HEAD
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
<<<<<<< HEAD
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
=======
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
>>>>>>> andreaFinal
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
<<<<<<< HEAD
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
=======
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

type ButtonWithTextProps = {
  icon: any;
  label: string;
  reverse?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

type UploadFieldProps = {
  label?: string;
  image: string | null;
  onPick: () => void;
  invalid?: boolean;
  imageSize: { width: number; height: number } | null;
};

// ----- ButtonWithText Component -----
function ButtonWithText({ icon, label, reverse, onPress, disabled = false }: ButtonWithTextProps) {
  return (
    <Pressable
      style={[styles.buttonWithText, { opacity: disabled ? 0.5 : 1 }]}
      onPress={!disabled ? onPress : null}
    >
      {reverse && <Image source={icon} style={styles.buttonIcon} />}
      <Text style={styles.buttonText}>{label}</Text>
      {!reverse && <Image source={icon} style={styles.buttonIcon} />}
    </Pressable>
  );
}

// ----- UploadField Component -----
function UploadField({ label = "", image, onPick, invalid, imageSize }: UploadFieldProps) {
  return (
    <View>
      <Text style={[styles.label, invalid && { color: "red" }]}>{label}</Text>
      <Pressable
        style={[
          styles.dropArea,
          { width: width * 0.8 },
          imageSize ? { height: imageSize.height } : { minHeight: 120 },
          invalid && { borderColor: "red", borderWidth: 2 },
        ]}
        onPress={onPick}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        ) : (
          <Text style={styles.uploadText}>Pindutin Upang Makapili</Text>
        )}
      </Pressable>
    </View>
  );
}

// ----- Main Component -----
export default function SellPage2() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [touched, setTouched] = useState(false);
>>>>>>> andreaFinal

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
<<<<<<< HEAD
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
=======
      allowsEditing: false, // keep natural aspect ratio
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      // compute scaled height based on fixed width
      Image.getSize(uri, (w, h) => {
        const fixedWidth = width * 0.8;
        const scale = fixedWidth / w;
        setImageSize({ width: fixedWidth, height: h * scale });
      });
    }
  };

  const isFormValid = name && price && amount && description && image;

  const handleNext = () => {
    setTouched(true); // show validation borders
    if (!isFormValid) return; // block navigation if invalid

    const data = { name, price, amount, description, image };
>>>>>>> andreaFinal
    router.push({ pathname: "/sellpage3", params: data });
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> andreaFinal
      {/* Header */}
      <View style={styles.textSection}>
        <Pressable style={styles.backPosition} onPress={() => router.back()}>
          <Image
            style={styles.backIcon}
            source={require("../assets/STARTer/back-icon.png")}
          />
        </Pressable>
<<<<<<< HEAD
=======

>>>>>>> andreaFinal
        <View style={styles.headerTextSection}>
          <Text style={styles.mainText}>Magbenta ng Tanim</Text>
          <Text style={styles.subText}>Pakilagay ang mga detalye</Text>
        </View>
      </View>

      {/* Green Form Container */}
      <LinearGradient
<<<<<<< HEAD
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
=======
        colors={[
          "#10AF7C",
          "#28B47B",
          "#5ABE7A",
          "#86C778",
          "rgba(134,199,120,0.87)",
        ]}
        style={styles.greenContainer}
      >
        <View style={styles.scrollViewContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.uploadSection}>
              {/* Name */}
              <Text style={[styles.label, touched && !name && { color: "red" }]}>
                Pangalan ng Produkto
              </Text>
              <TextInput
                style={[
                  styles.input,
                  touched && !name && { borderColor: "red", borderWidth: 2 },
                ]}
                placeholder="(hal. Bigas, Mais, Talong)"
                value={name}
                onChangeText={setName}
              />

              {/* Price */}
              <Text style={[styles.label, touched && !price && { color: "red" }]}>
                Presyo ng Produkto (Per Kilo)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  touched && !price && { borderColor: "red", borderWidth: 2 },
                ]}
                placeholder="(hal. P20, P30, P40)"
                value={price}
                onChangeText={setPrice}
              />

              {/* Amount */}
              <Text
                style={[styles.label, touched && !amount && { color: "red" }]}
              >
                Dami ng Produkto (Kilo)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  touched && !amount && { borderColor: "red", borderWidth: 2 },
                ]}
                placeholder="(hal. 10kg, 20kg, 30kg)"
                value={amount}
                onChangeText={setAmount}
              />

              {/* Image Upload */}
              <UploadField
                label="Imahe ng Produkto"
                image={image}
                onPick={pickImage}
                invalid={touched && !image}
                imageSize={imageSize}
              />

              {/* Description */}
              <Text
                style={[
                  styles.label,
                  touched && !description && { color: "red" },
                ]}
              >
                Deskripsyon ng Produkto
              </Text>
              <TextInput
                style={[
                  styles.inputDesc,
                  touched &&
                    !description && { borderColor: "red", borderWidth: 2 },
                ]}
                placeholder="Ilagay ang detalyadong impormasyon tungkol sa produkto"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
>>>>>>> andreaFinal
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>

      {/* Bottom Buttons */}
      <View style={styles.buttons}>
<<<<<<< HEAD
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
=======
        <View>
          <Pressable style={styles.buttonWithText} onPress={handleNext}>
            <Text style={styles.buttonText}>SUNOD</Text>
            <Image
              source={require("../assets/STARTer/Farmer Verification/next-page.png")}
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
      </View>
>>>>>>> andreaFinal
    </View>
  );
}

<<<<<<< HEAD
const MAX_WIDTH = 338;
const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: "#E6F5EC" },
=======
// ----- Styles -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F5EC",
  },
>>>>>>> andreaFinal
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
<<<<<<< HEAD
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
=======
    paddingBottom: height * 0.16,
    width: 338,
    alignSelf: "center",
  },
  uploadSection: {
    width: width * 0.8,
    alignSelf: "center",
  },

  // ==== Header & Back Button ====
  textSection: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  headerTextSection: {
    position: "relative",
    top: height * 0.04,
  },
  mainText: {
    textAlign: "center",
    fontSize: RFValue(27),
    fontFamily: "Roboto-Bold",
  },
  subText: {
    textAlign: "center",
    fontSize: RFValue(14),
    width: width * 0.9,
  },

>>>>>>> andreaFinal
  backPosition: {
    position: "absolute",
    width: height * 0.03,
    height: height * 0.03,
<<<<<<< HEAD
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
=======
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.04,
  },
  backIcon: {
    width: "100%",
    height: "100%",
  },

  // ==== Form Inputs ====
  label: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    marginBottom: 10,
    color: "#FFF",
  },
  input: {
    backgroundColor: "#FFFDEB",
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    marginBottom: 12,
  },
  inputDesc: {
    backgroundColor: "#FFFDEB",
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
>>>>>>> andreaFinal
    fontFamily: "Roboto-Regular",
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
<<<<<<< HEAD
    width: MAX_WIDTH,
  },
  dropArea: {
    height: 120,
    width: MAX_WIDTH,
=======
  },
  dropArea: {
>>>>>>> andreaFinal
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDEB",
    elevation: 4,
    marginBottom: 12,
  },
<<<<<<< HEAD
  uploadText: { color: "#8F8E8E", fontSize: RFValue(12), fontFamily: "Roboto-Regular" },
=======
  uploadText: {
    color: "#808080",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },

  // ==== Bottom Buttons ====
>>>>>>> andreaFinal
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
<<<<<<< HEAD
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
=======
  buttonWithText: {
    flexDirection: "row",
    alignItems: "center",
>>>>>>> andreaFinal
    gap: 5,
  },
  buttonIcon: {
    width: 29,
    height: 29,
<<<<<<< HEAD
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },


>>>>>>> 653c4610c8dca1ace73d48e1c81adb0c347cb30a
});
=======
    resizeMode: "contain",
  },
  buttonText: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: "Roboto-Bold",
  },
});
>>>>>>> andreaFinal
