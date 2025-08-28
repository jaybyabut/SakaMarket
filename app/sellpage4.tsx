import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
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

type ButtonWithTextProps = {
  icon: any;
  label: string;
  reverse?: boolean;
  onPress: () => void;
};

export default function SellPage4() {
  const navigation = useNavigation();
  const navBack = () => {
    router.push("/sellpage1");
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Mamimili Register Page" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Checkmark.png")}
        style={styles.logo}
      />
      <Text style={styles.header}>Success!</Text>
      <View style={styles.box}>
        <Text style={styles.contentHeader}>ORDER #1</Text>
        <Text style={styles.content}>Pangalan: Palay</Text>
        <Text style={styles.content}>Presyo: P20 /kilo</Text>
        <Text style={styles.content}>Dami: 50kg</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.leftButton}>
          <ButtonWithText
            icon={require("../assets/images/BlackBackIcon.png")}
            label="BUMALIK SA HOME PAGE"
            reverse
            onPress={() => router.push("/home-magsasaka")}
          />
        </View>
      </View>
    </View>
  );
}

function ButtonWithText({ icon, label, reverse, onPress }: ButtonWithTextProps) {
  return (
    <Pressable
      style={[styles.buttonWithText]}
      onPress={onPress}   // make the whole thing clickable
    >
      {reverse && <Image source={icon} style={styles.buttonIcon} />}
      <Text style={styles.buttonText}>{label}</Text>
      {!reverse && <Image source={icon} style={styles.buttonIcon} />}
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E6F5EC"
  },
  logo: {
    width: width * 0.45,
    height: width * 0.45,
    marginTop: height * 0.12, // instead of 200
    resizeMode: "contain",
  },
  header: {
    fontSize: RFValue(36), // was 48
    color: "black",
    fontFamily: "Roboto-Bold",
    marginTop: height * 0.01,
  },
  box: {
    width: width * 0.8,
    height: height * 0.25,
    backgroundColor: "#10AF7C",
    borderRadius: 20,
    padding: width * 0.05,
    justifyContent: "center",
    marginTop: height * 0.015,
  },
  contentHeader: {
    fontSize: RFValue(20),
    color: "white",
    fontFamily: "Roboto-Bold",
    marginBottom: 5,
    top: -10,
  },
  content: {
    fontSize: RFValue(18),
    color: "white",
    fontFamily: "Roboto-Regular",
    marginBottom: 5,
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
  leftButton: {
    flex: 1,
    alignItems: "flex-start",
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
    fontSize: RFValue(15),
    fontFamily: "Roboto-Bold",
    color: "black",
  },
});