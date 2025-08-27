import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CheckBox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

export default function SellPage3() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const navBack = () => {
    router.push("/sellpage2");
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Sell page 3" });
  }, [navigation]);

  const handleConfirm = async () => {
    if (!isChecked) {
      Alert.alert("Paalala", "Pakisigurado na lahat ng detalye ay tama.");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.0.2.2/database/sellProduct.php",
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      Alert.alert("Tagumpay", response.data.message || "Product stored!");
      router.push("/sellpage4"); // or another page after success
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hindi na-save ang produkto.");
    }
  };

  return (
    
      <LinearGradient colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "rgba(134,199,120,0.87)",]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        {/* Background Shape */}
        

        {/* Foreground Content */}
        <Pressable style={styles.backPosition} onPress={() => router.back()}>
                  <Image
                    style={styles.backIcon}
                    source={require("../assets/images/Back-w.png")}
                  />
                </Pressable>
        <View style={styles.top}>
          <Text style={styles.header}>Magbenta ng Tanim</Text>
          <Text style={styles.subtitle}>Suriin ng mabuti ang mga detalye</Text>
        </View>
        <View style={styles.backgroundShape}>
        <View style={styles.content}>
          <Text style={styles.text}>Ikaw ay magbebenta ng:</Text>

          <View style={styles.box}>
            <Text style={styles.boxText}>
              Pangalan: {params.name}
            </Text>
            <Text style={styles.boxText}>Presyo: ₱{params.price}</Text>
            <Text style={styles.boxText}>Dami: {params.amount} kilo</Text>
          </View>

          {/* Checkbox row */}
          <View style={styles.checkboxRow}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "#10AF7C" : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.subtitle2}>
              Lahat ng detalye na aking inilagay ay tama
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleConfirm}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto-Bold",
                fontSize: 30,
              }}
            >
              IBENTA
            </Text>
          </TouchableOpacity>
          
        </View>
        </View>
      </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10AF7C",
  },
  backgroundShape: {
    flex: 4,
    backgroundColor: "#E6F5EC",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    width: width * 1.1,
    alignSelf: "center",
    zIndex: 1,
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  header: {
    fontSize: RFValue(26),
    fontFamily: "Roboto-Bold",
    color: '#E6F5EC',
  },
  subtitle: {
    fontSize: RFValue(14),
    fontFamily: "Roboto-Regular",
    color: '#E6F5EC',
  },
  content: {
    flex: 1,
    width: width * 0.8,
    paddingTop: height * 0.05,
    alignSelf: 'center',
  },
  text: {
    fontSize: RFValue(14),
    fontFamily: "Roboto-Regular",
    paddingLeft: '5%',
    marginBottom: '2%',
  },
  box: {
    backgroundColor: "#10AF7C",
    width: '100%',
    height: height * 0.3,
    alignSelf: 'center',
    borderRadius: 12,
    paddingLeft: '5%',
    justifyContent: 'space-around'
  },
  boxText: {
    fontSize: RFValue(18),
    color: '#E6F5EC',
    fontFamily: 'Roboto-Bold',
  },
  checkboxRow: {
    marginTop: '10%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: '4%',
  },
  checkbox: {
    width: width * 0.05,
    height: width * 0.05,
  },
  subtitle2: {
   fontSize: RFValue(11),
   fontFamily: 'Roboto-Bold'
  },
  button: {
    backgroundColor: "#10AF7C",
    width: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: '10%',
    paddingVertical: '3%'
  

  },
  imageButton2: {
    
  },
  navText2: {
    
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
});
