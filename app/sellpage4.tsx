import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PRODUCTS = [
  { id: "palay", name: "Palay" },
  { id: "sibuyas", name: "Sibuyas" },
  { id: "kamatis", name: "Kamatis" },
  { id: "sili", name: "Sili" },
  { id: "talong", name: "Talong" },
];

export default function SellSuccess() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const navBack = () => {
    router.push("/sellpage1");
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Sell page 4" });
  }, [navigation]);

  const product = PRODUCTS.find((p) => p.id === params.productId);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Checkmark.png")}
        style={styles.logo}
      />
      <Text style={styles.header}>Tagumpay!</Text>

      <View style={styles.box}>
        <Text style={styles.contentHeader}>NAIBENTA NA ANG PRODUKTO</Text>
        <Text style={styles.content}>
          Pangalan: {product?.name || "Hindi Natukoy"}
        </Text>
        <Text style={styles.content}>Presyo: ₱{params.price}</Text>
        <Text style={styles.content}>Dami: {params.amount} kilo/s</Text>
        <Text style={styles.content}>
          Deskripsyon: {params.description || "Wala"}
        </Text>
      </View>

      <View style={styles.backRow}>
        <TouchableOpacity onPress={navBack} activeOpacity={0.7}>
          <Image
            source={require("../assets/images/backtoblack.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <Text style={styles.navText}>BUMALIK SA MAIN PAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 100,
  },
  header: {
    fontSize: 40,
    color: "black",
    fontFamily: "Roboto-Bold",
    marginTop: 10,
  },
  box: {
    width: "85%",
    backgroundColor: "#10AF7C",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  contentHeader: {
    fontSize: 20,
    color: "white",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto-Regular",
    marginBottom: 5,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  imageButton: {
    width: 30,
    height: 30,
  },
  navText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto-Bold",
    marginLeft: 5,
  },
});