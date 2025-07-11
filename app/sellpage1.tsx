import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonWithBackground from "../components/ButtonWithBackground";

export default function SellPage1() {
  const navBack = () => {
    router.push('home-magsasaka') // Go to the main page
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 40,
        marginTop: 100,
      }}
    >
      <ButtonWithBackground
        text="Bagong Transaksyon"
        colors={["#10AF7C", "#5ABE7A", "#65C17A"]}
        onPress={() => {
          router.push("/sellpage2");
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.9, 1]}
        image={require("../assets/images/Peso Symbol.png")}
      />

      <ButtonWithBackground
        text="Palitan ang Detalye ng Transaksyon"
        colors={["#10AF7C", "#5ABE7A", "#65C17A"]}
        onPress={() => {
          console.log('palitan');
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[0, 0.9, 1]}
        image={require("../assets/images/Edit.png")}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, left: -85 }}>
        <TouchableOpacity onPress={navBack} activeOpacity={0.7}>
          <Image
            source={require("../assets/images/backtoblack.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <Text style={styles.navText}>HOME PAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  navText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
});
