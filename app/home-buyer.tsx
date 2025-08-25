import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";
const { width, height } = Dimensions.get("window");

const logoImg: ImageSourcePropType = require("../assets/images/home-title.png");
const accountImg: ImageSourcePropType = require("../assets/images/Account.png");
const produktoImg: ImageSourcePropType = require("../assets/images/Produkto.png");
const logoutImg: ImageSourcePropType = require("../assets/images/open-pane.png");

export default function HomeBuyer() {
  return (
    <View style={styles.container}>
      {/* Logo at top left */}
      <LinearGradient
        colors={["#10AF7C", "#86C778"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.2 }}
        style={styles.logoContainer}
      >
        <Image source={logoImg} style={styles.logoImage} />
      </LinearGradient>

      <View style={styles.mamiliContainer}>
        {/* Home text banner */}
        <Text style={styles.mainText}>Mamili ng Gagawin</Text>
      </View>

      {/* Button grid */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <View style={styles.gridItem}>
            <Pressable style={styles.button} onPress={() => router.push("/buy-page")}>
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
                    style={styles.buttonIcon}
                    source={require("../assets/images/Hay.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Bumili</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
          
          <View style={styles.gridItem}>
            <Pressable style={styles.button} onPress={() => router.push("/StatsPage")}>
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
                    style={styles.buttonIcon}
                    source={require("../assets/STARTer/Sign Up/cart-icon.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Market</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.gridItem}>
            <Pressable style={styles.button}>
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
                    style={styles.produkto}
                    source={require("../assets/images/icons8-location-100(1) 1.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Produkto</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
          
          <View style={styles.gridItem}>
            <Pressable style={styles.button}>
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
                    style={styles.buttonIcon}
                    source={require("../assets/images/User.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Account</Text>
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
        onPress={() => router.replace("/signIn")}
      >
        <Image source={logoutImg} style={styles.logoutImage} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // ---------- Main Containers ----------
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RFValue(20),
  },
  gridItem: {
    margin: width * 0.015, // half the desired gap
  },
  row: {
    flexDirection: "row",
  },

  iconAndLabel: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },

  // ---------- Logo Section ----------
  logoContainer: {
    height: height * 0.12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginBottom: height * 0.01,
  },
  logoImage: {
    resizeMode: "contain",
    width: height * 0.3,
  },
  logoText: {
    fontFamily: "Secular One", // Ensure this font is linked in your project
    fontWeight: "400",
    fontSize: 25,
    lineHeight: 31,
    letterSpacing: 0.012,
    color: "#FFCA43",
  },

  // ---------- Main Text ----------
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

  // ---------- Buttons ----------
  button: {
    width: height * 0.2,
    height: height * 0.2,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2.3,
    elevation: 3,
    overflow: "hidden", // ensures gradient respects borderRadius
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFValue(23),
    fontFamily: "Roboto-Bold",
    color: "white",
    marginTop: RFValue(5),
  },
  buttonIcon: {
    width: width * 0.28,
    height: width * 0.28,
  },
  produkto: {
    marginTop: width * 0.015,
    height: width * 0.23,
    marginBottom: width * 0.035,
  },

  // ---------- Language Selection ----------
  languageRow: {
    flexDirection: "row",
    gap: width * 0.05,
  },
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

  // ---------- Logout Button ----------
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
  logoutImage: {
    width: height * 0.03,
    height: height * 0.03,
  },
  logoutButtonText: {
    fontSize: RFValue(16),
    color: "white",
    fontFamily: "Roboto-Bold",
  },
});