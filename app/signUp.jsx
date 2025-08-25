import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";
const { width, height } = Dimensions.get("window");

export default function SignupScreen() {
  const router = useRouter();
  const goToFarmer = () => {
    router.push({
      pathname: "/farmerDetails",
      params: { role: "farmer" },
    });
  };

  const goToBuyer = () => {
    router.push({
      pathname: "/buyerDetails",
      params: { role: "buyer" },
    });
  };

  return (
    <View style={styles.container}>
      {/* Text Section */}
      <View style={styles.textSection}>
        <Pressable
          style={styles.backPosition}
          onPress={() => router.push("/App")}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/STARTer/back-icon.png")}
          />
        </Pressable>

        <View style={styles.headerTextSection}>
          <Text style={styles.signupText}>Sign Up</Text>
          <Text style={styles.questionText}>Ano ang iyong tungkulin?</Text>
        </View>
      </View>

      {/* Role Buttons */}
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={goToFarmer}>
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
                source={require("../assets/STARTer/Sign Up/magsasaka-icon.png")}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Magsasaka</Text>
            </View>
          </LinearGradient>
        </Pressable>

        <Pressable style={styles.button} onPress={goToFarmer}>
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
              <Text style={styles.buttonText}>Mamimili</Text>
            </View>
          </LinearGradient>
        </Pressable>
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
  textSection: {
    flex: 1,
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: height * 0.05,
  },

  // ==== Back Button ====
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

  // ==== Text ====
  headerTextSection: {
    position: "relative",
    top: height * 0.04,
  },
  signupText: {
    fontSize: RFValue(35),
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  questionText: {
    fontSize: RFValue(17),
    fontFamily: "Roboto",
    textAlign: "center",
  },
  buttonText: {
    fontSize: RFValue(25),
    fontFamily: "Roboto-Bold",
    color: "white",
    marginTop: RFValue(5),
  },

  // ==== Buttons ====
  button: {
    width: height * 0.28,
    height: height * 0.28,
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
  iconAndLabel: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
  },

  // ==== Icons ====
  buttonIcon: {
    width: width * 0.4,
    height: width * 0.4,
  },
});
