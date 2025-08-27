import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
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

export default function Magsasakaregister() {
  const [productId, setProductId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [products] = useState<Product[]>([
    { id: "palay", name: "Palay" },
    { id: "sibuyas", name: "Sibuyas" },
    { id: "kamatis", name: "Kamatis" },
    { id: "sili", name: "Sili" },
    { id: "talong", name: "Talong" },
  ]);
  const [touched, setTouched] = useState<boolean>(false);

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ fixed
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const isFormValid = productId && price && amount && description && image;

  const handleNext = () => {
    setTouched(true);
    if (!isFormValid) return;

    const data = { productId, price, amount, description, image };
    router.push({ pathname: "/sellpage3", params: data });
  };

  return (
    <View style={styles.container}>
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
          <KeyboardAwareScrollView showsVerticalScrollIndicator>
            {/* Product Picker */}
            <Text
              style={[
                styles.label,
                touched && !productId && { color: "red" },
              ]}
            >
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
                  <Picker.Item
                    key={prod.id}
                    label={prod.name}
                    value={prod.id}
                  />
                ))}
              </Picker>
            </View>

            {/* Price */}
            <Text
              style={[styles.label, touched && !price && { color: "red" }]}
            >
              Presyo (Per Kilo in PHP)
            </Text>
            <TextInput
              style={[
                styles.input,
                touched && !price && { borderColor: "red", borderWidth: 2 },
              ]}
              placeholder="Halimbawa: 30, 40, 50"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            {/* Amount */}
            <Text
              style={[styles.label, touched && !amount && { color: "red" }]}
            >
              Dami (Per Kilo)
            </Text>
            <TextInput
              style={[
                styles.input,
                touched && !amount && { borderColor: "red", borderWidth: 2 },
              ]}
              placeholder="Halimbawa: 10, 20, 30"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            {/* Image Upload */}
            <Text
              style={[styles.label, touched && !image && { color: "red" }]}
            >
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
            <Text
              style={[
                styles.label,
                touched && !description && { color: "red" },
              ]}
            >
              Deskripsyon
            </Text>
            <TextInput
              style={[
                styles.inputDesc,
                touched &&
                  !description && { borderColor: "red", borderWidth: 2 },
              ]}
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
    </View>
  );
}

const MAX_WIDTH = 338;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F5EC",
  },
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
  },
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
  backPosition: {
    position: "absolute",
    width: height * 0.03,
    height: height * 0.03,
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.04,
  },
  backIcon: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: RFValue(13),
    fontFamily: "Roboto-Medium",
    marginBottom: 10,
    color: "#FFF",
  },
  input: {
    backgroundColor: "#FFFDEB",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginBottom: 12,
    width: MAX_WIDTH,
  },
  inputDesc: {
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
  uploadText: {
    color: "#8F8E8E",
    fontSize: RFValue(12),
    fontFamily: "Roboto-Regular",
  },
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
  buttonWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonIcon: {
    width: 29,
    height: 29,
    resizeMode: "contain",
  },
  buttonText: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: "Roboto-Bold",
  },
  leftButton: { flex: 1, alignItems: "flex-start" },
  rightButton: { flex: 1, alignItems: "flex-end" },
});