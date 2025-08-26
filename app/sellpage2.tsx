import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
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
function UploadField({ label = "", image, onPick, invalid }: UploadFieldProps) {
  return (
    <View>
      <Text style={[styles.label, invalid && { color: "red" }]}>{label}</Text>
      <Pressable
        style={[
          styles.dropArea,
          invalid && { borderColor: "red", borderWidth: 2 },
        ]}
        onPress={onPick}
      >
        {image ? (
          <Image
            source={{ uri: image }}
          />
        ) : (
          <Text style={styles.uploadText}>Pindutin Upang Makapili</Text>
        )}
      </Pressable>
    </View>
  );
}

// ----- Main Component -----
export default function Magsasakaregister() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [touched, setTouched] = useState(false);

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
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const isFormValid = name && price && amount && description && image;

  const handleNext = () => {
    setTouched(true); // show validation borders
    if (!isFormValid) return; // block navigation if invalid

    const data = { name, price, amount, description, image };
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
          <KeyboardAwareScrollView 
          showsVerticalScrollIndicator={true}>
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
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>

      {/* Bottom Buttons */}
      <View style={styles.buttons}>
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
    </View>
  );
}

// ----- Styles -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F5EC",
    //alignItems: "center",
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
    paddingBottom: height * 0.160,
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
    width: width * 0.9, // same as FarmerVerificationScreen
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
    fontFamily: "Roboto-Regular",
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  dropArea: {
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDEB",
    elevation: 4,
    marginBottom: 12,
  },
  uploadText: {
    color: "#808080",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },

  // ==== Bottom Buttons ====
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
