import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type itemCardProps = {
  item: {
    id: number;
    image?: string;
    date: number;
    name: string;
    price: number;
    amount: number;
  };
};

export default function BuyItem({ item }: itemCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/product-page",
          params: { ...item },
        })
      }
    >
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require("../assets/images/missing.png")
            }
            style={styles.itemImage}
          />
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dayPosted}>10 days ago</Text>
          <Text style={styles.orderNumber}>ORDER ID # {item.id} </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.mainText}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>
          </View>
          <Text style={styles.massText}>{item.amount}kg</Text>
          <Text style={styles.farmerName}>Jaren Javerto</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={styles.address}>Malolos Bulacan</Text>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/product-page",
                  params: { ...item },
                }),
                  router.push({
                    pathname: "/payment",
                    params: { id: item.id, price: item.price },
                  });
              }}
            >
              <LinearGradient
                colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
                dither={true}
                style={styles.gradientBtn}
              >
                <Text style={styles.btnText}>BILHIN</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "rgb(255,255,255)",
  },
  gradientBtn: {
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 30,
    borderRadius: 32,
    elevation: 10,
  },

  container: {
    elevation: 10,
    paddingBottom: 12,
    margin: 10,
    marginBottom: 5,
    backgroundColor: "rgb(255,255,255)",
  },

  flexContainer: {
    flex: 1,
    flexDirection: "row",
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  itemImage: {
    alignContent: "center",
    justifyContent: "center",
    width: "80%",
    height: "70%",
    resizeMode: "cover",
  },

  dataContainer: {
    flex: 2,
  },

  massText: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: -8,
  },

  dayPosted: {
    alignContent: "flex-end",
    textAlign: "right",
    paddingRight: 10,
    fontWeight: "100",
  },

  orderNumber: {
    fontWeight: "600",
    fontSize: 15,
    marginTop: 0,
    padding: 0,
  },

  mainText: {
    fontWeight: "800",
    fontSize: 25,
    padding: 0,
    marginTop: -5,
    flex: 1,
  },

  price: {
    color: "#48BA7A",
    alignContent: "flex-end",
    textAlign: "right",
    alignItems: "flex-end",
    flex: 1,
    fontSize: 30,
    fontWeight: "900",
    paddingRight: 10,
  },

  farmerName: {
    color: "#565656",
  },

  address: {
    flex: 1,
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: "#565656",
  },

  buttonArea: {},
});
