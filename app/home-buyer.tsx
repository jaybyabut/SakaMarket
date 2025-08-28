import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";


const { width, height } = Dimensions.get("window");

const logoImg: ImageSourcePropType = require('../assets/images/home-title.png');
const homeTextImg: ImageSourcePropType = require('../assets/images/mamili-ng-gagawin.png');
const bumiliImg: ImageSourcePropType = require('../assets/images/Bumili.png');
const marketImg: ImageSourcePropType = require('../assets/images/Market.png');
const accountImg: ImageSourcePropType = require('../assets/images/Account.png');
const produktoImg: ImageSourcePropType = require('../assets/images/Produkto.png');
const logoutImg: ImageSourcePropType = require('../assets/images/open-pane.png');


export default function HomeBuyer() {
  // Dynamic sizing for buttons
  const buttonSize = Math.min(height * 0.2, width * 0.42);
  const iconSize = buttonSize * 0.6;
  const fontSize = buttonSize * 0.17;

  return (
    <View style={styles.container}>
      {/* Logo at top */}
      <LinearGradient
        colors={["#10AF7C", "#86C778"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.2 }}
        style={styles.logoContainer}
      >
        <Image source={logoImg} style={styles.logoImage} />
      </LinearGradient>

      {/* Home text banner */}
      <View style={styles.mamiliContainer}>
        <Text style={styles.mainText}>Mamili ng Gagawin</Text>
      </View>

      {/* Button grid */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <View style={styles.gridItem}>
            <Pressable
              style={[styles.button, { width: buttonSize, height: buttonSize }]}
              onPress={() => router.push("/buy-page")}
            >
              <LinearGradient
                colors={[
                  Colors.primaryGreen,
                  Colors.gradientGreenStart,
                  Colors.gradientGreenMid,
                  Colors.gradientGreenEnd,
                ]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.iconAndLabel}>
                  <Image
                    style={{ width: iconSize, height: iconSize }}
                    source={require("../assets/images/Hay.png")}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, { fontSize }]}>Bumili</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.gridItem}>
            <Pressable
              style={[styles.button, { width: buttonSize, height: buttonSize }]}
              onPress={() => router.push("/seller-listings")}
            >
              <LinearGradient
                colors={[
                  Colors.primaryGreen,
                  Colors.gradientGreenStart,
                  Colors.gradientGreenMid,
                  Colors.gradientGreenEnd,
                ]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.iconAndLabel}>
                  <Image
                    style={{ width: iconSize, height: iconSize }}
                    source={require("../assets/STARTer/Sign Up/cart-icon.png")}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, { fontSize }]}>Market</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.gridItem}>
            <Pressable
              style={[styles.button, { width: buttonSize, height: buttonSize }]}
              onPress={() => router.push('/productStateBuyerReceive')}
            >
              <LinearGradient
                colors={[
                  Colors.primaryGreen,
                  Colors.gradientGreenStart,
                  Colors.gradientGreenMid,
                  Colors.gradientGreenEnd,
                ]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View
                  style={[
                    styles.iconAndLabel,
                    {
                      paddingTop: buttonSize * 0.1,
                      paddingBottom: buttonSize * 0.05,
                    },
                  ]}
                >
                  <Image
                    style={{ width: iconSize, height: iconSize }}
                    source={require("../assets/images/icons8-location-100(1) 1.png")}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, { fontSize }]}>
                    Produkto
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.gridItem}>
            <Pressable
              style={[styles.button, { width: buttonSize, height: buttonSize }]}
              onPress={() => router.push("/account-buyer")}
            >
              <LinearGradient
                colors={[
                  Colors.primaryGreen,
                  Colors.gradientGreenStart,
                  Colors.gradientGreenMid,
                  Colors.gradientGreenEnd,
                ]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.iconAndLabel}>
                  <Image
                    style={{ width: iconSize, height: iconSize }}
                    source={require("../assets/images/User.png")}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, { fontSize }]}>Account</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Language row */}
      <View style={styles.languageRow}>
        <Text style={styles.languageLabel}>Language:</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageButtonText}>Tagalog</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out button at bottom left */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await AsyncStorage.multiRemove(['user', 'user_id']); // Remove both keys
            router.replace('/signIn'); // Redirect to sign in screen
          } catch (error) {
            console.error("Error logging out:", error);
          }
        }}
      >
        <Image source={logoutImg} style={styles.logoutImage} />

        <Text style={styles.logoutButtonText}>Log Out</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6F5EC" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RFValue(20),
  },
  gridItem: { margin: width * 0.015 },
  row: { flexDirection: "row" },
  iconAndLabel: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    height: height * 0.12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginBottom: height * 0.01,
  },
  logoImage: { resizeMode: "contain", width: height * 0.3 },
  mamiliContainer: {
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  mainText: {
    textAlign: "center",
    fontSize: RFValue(27),
    fontFamily: "Roboto-Bold",
  },
  button: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2.3,
    elevation: 3,
    overflow: "hidden",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Bold",
    color: "white",
    marginTop: RFValue(5),
    textAlign: "center",
  },
  languageRow: { flexDirection: "row", gap: width * 0.05 },
  languageLabel: {
    left: width * 0.05,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: RFValue(18),
    lineHeight: 23,
    color: "#000",
    marginRight: 10,
    textAlignVertical: "center",
  },
  languageButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10AF7C",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8.7,
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  languageButtonText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: RFValue(17),
    lineHeight: 23,
    color: "#FFF",
  },
  logoutButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02,
    bottom: height * 0.02,
    left: width * 0.05,
    backgroundColor: "#d32f2f",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 24,
  },
  logoutImage: { width: height * 0.03, height: height * 0.03 },
  logoutButtonText: {
    fontSize: RFValue(16),
    color: "white",
    fontFamily: "Roboto-Bold",
  },
});
