import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonWithBackground from "../components/ButtonWithBackground";

export default function SellPage1() {
  const navBack = () => {
    router.push('/home-magsasaka') // Go to the main page
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        padding: 20,
        gap: 20,
        backgroundColor: 'white',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20, }}>
          <TouchableOpacity onPress={navBack} activeOpacity={0.8}>
          <Image
              source={require("../assets/images/Back.png")}
              style={styles.imageButton}
            />
            </TouchableOpacity>
          <TouchableOpacity onPress={navBack} activeOpacity={0.8}>
            <Text style={styles.navText}>HOME PAGE</Text>
          </TouchableOpacity>
          
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
            router.push("/seller-listings")
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.9, 1]}
          image={require("../assets/images/Edit.png")}
        />

        
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
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    transform: 'scale(0.8)',
  }
});
