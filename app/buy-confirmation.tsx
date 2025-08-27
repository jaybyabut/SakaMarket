import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useLayoutEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

export default function BuyConfirmation() {
  const navigation = useNavigation();
  const item = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Buy Confirmation" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require("../assets/images/Checkmark.png")} style={styles.logo} />
        <Text style={styles.header}>Success!</Text>
        <View style={styles.greenBox}>
          <View style={styles.contentBox}>
            <Text style={styles.contentHeader}>ORDER #{item.id}</Text>
            <Text style={styles.contentText}>Pangalan: {item.name}</Text>
            <Text style={styles.contentText}>Presyo: ₱{item.price}</Text>
            <Text style={styles.contentText}>Dami: {item.amount} kilo</Text>
            <Text style={styles.contentText}>Magsasaka: {item.farmer_name}</Text>
            <Text style={styles.contentText}>Lugar ng Pagkuha: {item.pickup}</Text>
            <Text style={styles.contentText}>Paraan ng Bayad: {item.paymentMode}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.navContainer} onPress={() => router.push("/home-buyer")}>
        <Image source={require("../assets/images/backtoblack.png")} style={styles.imageButton} />
        <Text style={styles.navText}>BUMALIK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  contentContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: width * 0.4, height: width * 0.4 },
  header: { fontSize: RFValue(36), fontFamily: "Roboto-Bold", marginBottom: 20 },
  greenBox: { backgroundColor: "#10AF7C", borderRadius: 20, padding: 20, width: width * 0.85 },
  contentBox: {},
  contentHeader: { color: "white", fontSize: RFValue(20), fontWeight: "700", marginBottom: 10 },
  contentText: { color: "white", fontSize: RFValue(16), marginTop: 5 },
  navContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: height * 0.03,
    left: width * 0.1,
  },
  navText: { fontSize: RFValue(18), fontFamily: "Roboto-Bold", marginLeft: 10 },
  imageButton: { width: 25, height: 25 },
});