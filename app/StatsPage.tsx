import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

// Image assets
const palayImg = require("../assets/images/Carbohydrates.png");
const sibuyasImg = require("../assets/images/Onion.png");
const kamatisImg = require("../assets/images/Tomato.png");
const siliImg = require("../assets/images/ChiliPepper.png");
const talongImg = require("../assets/images/Eggplant.png");

const products = [
  { name: "Palay", image: palayImg },
  { name: "Sibuyas", image: sibuyasImg },
  { name: "Kamatis", image: kamatisImg },
  { name: "Sili", image: siliImg },
  { name: "Talong", image: talongImg },
];

const StatsPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backPosition} onPress={() => router.back()}>
        <Image
          style={styles.backIcon}
          source={require("../assets/STARTer/back-icon.png")}
        />
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>Market Transactions</Text>

      {/* Search Bar */}
      <View style={styles.searchGroup}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Product Cards */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/SalesData",
                params: { product: item.name },
              })
            }
          >
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
              style={styles.card}
            >
              <Image source={item.image} style={styles.cardIcon} />
              <Text style={styles.cardLabel}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(27),
    color: "#000",
    marginBottom: 20,
    marginLeft: 10,
  },
  searchGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 12,
    height: 49,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  searchBar: {
    flex: 1,
    fontSize: RFValue(14),
  },
  scrollContent: { paddingBottom: 30 },
  card: {
    width: screenWidth - 40,
    height: height * 0.12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardIcon: {
    height: height * 0.08,
    width: height * 0.08,
    resizeMode: "contain",
  },
  cardLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(22),
    color: "#FFFDEB",
    marginLeft: 20,
  },
  backPosition: {
    position: "absolute",
    width: height * 0.03,
    height: height * 0.03,
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.04,
  },
  backIcon: {
    height: "100%",
    width: "100%",
  },
});

export default StatsPage;