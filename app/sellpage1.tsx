import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ButtonWithBackground from "../components/ButtonWithBackground";
const { width, height } = Dimensions.get("window");

export default function SellPage1() {
  const navBack = () => {
    router.push("/home-magsasaka"); // Go to the main page
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          padding: 20,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <View style={styles.backRow}>
            <TouchableOpacity onPress={navBack} style={styles.backButton}>
              <Image
                style={styles.backIcon}
                source={require("../assets/STARTer/back-icon.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={navBack} style={styles.textButton}>
              <Text style={styles.navText}>HOME PAGE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.top}>
          <ButtonWithBackground
            text="Bagong Transaksyon"
            colors={["#10AF7C", "#5ABE7A", "#65C17A"]}
            onPress={() => {
              router.push("/sellpage2");
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.9, 1]}
            image={require("../assets/images/peso-symbol.png")}
          />

          <ButtonWithBackground
            text="Ipakita ang Sariling Benta"
            colors={["#10AF7C", "#5ABE7A", "#65C17A"]}
            onPress={() => {
              router.push("/seller-listings");
            }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            locations={[0, 0.9, 1]}
            image={require("../assets/images/Edit.png")}
          />
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  // ==== Layout ====
  container: {
    flex: 1,
    backgroundColor: "#E6F5EC",
  },

  // ==== Header Row ====
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.04,
    marginLeft: width * 0.04,
    gap: 0, // spacing between back icon and text
  },

  backButton: {
    width: height * 0.03,
    height: height * 0.03,
  },
  backIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  textButton: {
    // optional: expand touchable area for text
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  navText: {
    fontSize: RFValue(18),
    color: "black",
    fontFamily: "Roboto-Bold",
  },

  // ==== Top Section (Buttons) ====
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    transform: [{ scale: 0.755 }],
  },
});
