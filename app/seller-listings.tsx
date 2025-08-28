<<<<<<< HEAD
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
=======
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
>>>>>>> andreaFinal
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../assets/data/itemData";
import GradientBtn from "../components/GradientBtn";
import ListingItem from "../components/listingItem";
<<<<<<< HEAD
 
const { width, height } = Dimensions.get('window');

=======

const { width, height } = Dimensions.get("window");
>>>>>>> andreaFinal

export default function Signin() {
  const [searchLeft, setSearchLeft] = useState(0);
  const [searchText, onChangeSearchText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    axios.get('http://10.0.2.2/database/fetchproducts.php')
      .then(response => {
        console.log('Products:', response.data);
        setProducts(response.data);
      })
      .catch(error => console.log('Error:', error));
=======
    axios
      .get("http://10.0.2.2/database/fetchproducts.php")
      .then((response) => {
        console.log("Products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log("Error:", error));
>>>>>>> andreaFinal
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
        style={{ flex: 1.2 }}
        dither={true}
      >
<<<<<<< HEAD
        
        <SafeAreaView style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image source={require("../assets/images/Back-w.png")} style={styles.back}></Image>
          </Pressable>
          <View style={[styles.logoMiddle]}>
         <Text style={styles.pamilihanText}>Mga Sariling Produkto</Text>

=======
        <SafeAreaView style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../assets/images/Back-w.png")}
              style={styles.back}
            ></Image>
          </Pressable>
          <View style={[styles.logoMiddle]}>
            <Text style={styles.pamilihanText}>Mga Sariling Produkto</Text>
>>>>>>> andreaFinal
          </View>
        </SafeAreaView>
      </LinearGradient>

<<<<<<< HEAD

      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar}
        onLayout={e => setSearchLeft(e.nativeEvent.layout.x)}
        onChangeText={onChangeSearchText}
        placeholder="Search">

        </TextInput>
        </View>
        <View style={styles.filterContainer}>
        <GradientBtn btnText="Filter" style={[styles.filterButton, {left: searchLeft}]}/>
        </View>
        
=======
      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            onLayout={(e) => setSearchLeft(e.nativeEvent.layout.x)}
            onChangeText={onChangeSearchText}
            placeholder="Search"
          ></TextInput>
        </View>
        <View style={styles.filterContainer}>
          <GradientBtn
            btnText="Filter"
            style={[styles.filterButton, { left: searchLeft }]}
          />
        </View>
>>>>>>> andreaFinal
      </View>

      <View style={styles.bodySection}>
        <FlatList
<<<<<<< HEAD
         data={data}
         keyExtractor={(item) => item.id?.toString() || index.toString()}
         renderItem={({ item }) => <ListingItem item={item} />}
         ListEmptyComponent={<Text>No products available</Text>}
         showsVerticalScrollIndicator={false}
         />
         
      </View>



=======
          data={data}
          keyExtractor={(item) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => <ListingItem item={item} />}
          ListEmptyComponent={<Text>No products available</Text>}
          showsVerticalScrollIndicator={false}
        />
      </View>
>>>>>>> andreaFinal
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  filterContainer:{
    verticalAlign: 'middle',
    marginTop: 10,
  },

  filterButton:{
=======
  filterContainer: {
    verticalAlign: "middle",
    marginTop: 10,
  },

  filterButton: {
>>>>>>> andreaFinal
    height: height * 0.04,
    width: width * 0.3,
  },

<<<<<<< HEAD
  back:{
    position: 'absolute',
=======
  back: {
    position: "absolute",
>>>>>>> andreaFinal
    right: 15,
    bottom: -17,
  },

  pamilihanText: {
    left: 8,
<<<<<<< HEAD
    color: 'rgb(255,255,255)',
    fontWeight: '700',
    fontSize: RFValue(22),
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  pamilihanLogo: {
    aspectRatio: 1/1,
    resizeMode: 'contain',
=======
    color: "rgb(255,255,255)",
    fontWeight: "700",
    fontSize: RFValue(22),
    alignSelf: "stretch",
    verticalAlign: "middle",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  pamilihanLogo: {
    aspectRatio: 1 / 1,
    resizeMode: "contain",
>>>>>>> andreaFinal
    width: width * 0.125,
  },

  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    backgroundColor: 'transparent',
=======
    backgroundColor: "transparent",
>>>>>>> andreaFinal
  },

  logoMiddle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    backgroundColor: 'transparent',
    
=======
    backgroundColor: "transparent",
>>>>>>> andreaFinal
  },

  searchSection: {
    marginVertical: 10,
  },

  bodySection: {
    flex: 8,
  },

<<<<<<< HEAD
  logoTitle: {

  },
=======
  logoTitle: {},
>>>>>>> andreaFinal

  searchBarContainer: {
    alignItems: "center",

    height: undefined,
    margin: 0,
  },

  itemCard: {
    elevation: 3,
    marginVertical: 5,
  },

  searchBar: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    height: undefined,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    elevation: 3,
    borderColor: "#D9D9D9",
    fontSize: 12,
    margin: 0,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> andreaFinal
