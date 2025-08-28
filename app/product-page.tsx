import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageData } from "../assets/data/imageData";

const { width, height } = Dimensions.get("window");

export default function Productpage() {
  const item = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.everythingContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image source={require("../assets/images/Back-w.png")}></Image>
        </TouchableOpacity>
        <FlatList
          data={imageData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.carousel}>
              <Image source={item.imageSrc} style={styles.productImage} />
            </View>
          )}
          showsHorizontalScrollIndicator={true}
          horizontal={true}
          pagingEnabled={true}
          snapToAlignment="center"
          decelerationRate={"fast"}
          removeClippedSubviews={false}
          overScrollMode="never"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titleLine}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>{item.name}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={[styles.priceText, { color: "#48BA7A" }]}>
              ₱{item.price}
            </Text>
          </View>
        </View>

        <Text style={styles.additionalText}>{item.seller_name}</Text>
        <Text style={styles.additionalText}>Address: {item.seller_address}</Text>

        <Text style={styles.additionalText}>
          Description: {item.description}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: "/payment",
              params: {
                price: item.price,
              },
            });
          }}
        >
          <LinearGradient
            colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
            dither={true}
            style={{
              flex: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: RFValue(20) }}>
              BILHIN
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.7,
    height: height * 0.08,
    backgroundColor: "transparent",
  },

  additionalText: {
    color: "rgb(51, 51, 51)",
  },

  titleLine: {
    flexDirection: "row",
  },

  priceBox: {
    flex: 1,
  },

  priceText: {
    fontSize: 30,
    fontWeight: 700,
    alignItems: "flex-end",
    alignContent: "flex-end",
    textAlign: "right",
  },

  titleBox: {
    flex: 1,
  },

  titleText: {
    fontSize: 30,
    fontWeight: 700,
  },

  backButton: {
    position: "absolute",
    backgroundColor: "rgba(73, 73, 73, 0.8)",
    elevation: 15,
    borderRadius: 32,
    zIndex: 2,
    left: "5%",
    top: "5%",
  },

  carousel: {
    width: width,
    height: height * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },

  everythingContainer: {
    flex: 1,
    backgroundColor: '#E6F5EC'
  },

  imageContainer: {
    height: height * 0.3,
    elevation: 10,
    backgroundColor: '#E6F5EC',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
  },

  infoContainer: {
    flex: 2,
    marginTop: "10%",
    marginHorizontal: "5%",
    gap: 10,
  },

  productImage: {
    borderRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.24)",
    resizeMode: 'contain',
    maxWidth: '100%',
  },
});