import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const LandingPage = ({ navigation = { navigate: () => {} } }) => {
  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <View style={styles.logoContainer}>
      <Image
        source={require("../assets/STARTer/LandingPage/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.nameContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.saka}>SAKA</Text>
          {" "}
          <Text style={styles.market}>MARKET</Text>
        </Text>
      </View>
    </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        {/* Sign In Button with Gradient */}
        <LinearGradient
          colors={["#10AF7C", "#86C778"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.signInButton}
        >
          <Pressable onPress={() => router.push("/signIn")}>
            <Text style={styles.signInText}>Mag-sign in sa Account</Text>
          </Pressable>
        </LinearGradient>

        {/* Create Account Button */}
        <Pressable
          style={styles.createButton}
          onPress={() => router.push("/signUp")}
        >
          <Text style={styles.createText}>Gumawa ng Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Page Layout
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6F5EC",
  },

  // Logo & Title
  logoContainer: {
    height: "70%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "50%",
    
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'SecularOne-Regular',
    fontSize: RFValue(30),
    fontWeight: '400',
  },
  saka: {
    color: '#FFCA43',
  },
  market: {
    color: '#088423',
  },

  // Buttons Container
  buttonGroup: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    gap: height * 0.02,
  },

  // Sign In Button (with gradient)
  signInButton: {
    height: "25%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  signInText: {
    color: "white",
    fontSize: RFValue(16),
    fontFamily: "Roboto-Medium",
  },

  // Create Account Button
  createButton: {
    height: "25%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F5EC",
    borderColor: "#10AF7C",
    borderWidth: 1,
  },
  createText: {
    color: "#10AF7C",
    fontSize: RFValue(16),
    fontFamily: "Roboto-Medium",
  },
});

export default LandingPage;
