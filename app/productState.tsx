import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import BuyItem from "../components/BuyItem";
import GradientBtn from "../components/GradientBtn";
 
const { width, height } = Dimensions.get('window');


export default function Signin() {
  const [searchLeft, setSearchLeft] = useState(0);
  const [searchText, onChangeSearchText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2/database/fetchproducts.php')
      .then(response => {
        console.log('Products:', response.data);
        setProducts(response.data);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
        style={{ flex: 1.2 }}
        dither={true}
      >
        
        <SafeAreaView style={styles.header}>
          <Pressable onPress={() => router.push("/home-buyer")}>
            <Image source={require("../assets/images/Back-w.png")} style={styles.back}></Image>
          </Pressable>
          <View style={[styles.logoMiddle]}>
         <Image source={require("../assets/images/pamilihan-logo.png")} style={styles.pamilihanLogo}></Image>
         <Text style={styles.pamilihanText}>Pamilihan</Text>

          </View>
        </SafeAreaView>
      </LinearGradient>


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
        
      </View>

      <View style={styles.bodySection}>
        <FlatList
         data={products}
         keyExtractor={(item, index) => item.id?.toString() || index.toString()}
         renderItem={({ item }) => <BuyItem item={item} />}
         ListEmptyComponent={<Text>No products available</Text>}
         showsVerticalScrollIndicator={false}
         />
         
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer:{
    verticalAlign: 'middle',
    marginTop: 10,
  },

  filterButton:{
    height: height * 0.04,
    width: width * 0.3,
  },

  back:{
    position: 'absolute',
    right: 15,
    bottom: -17,
  },

  pamilihanText: {
    left: 8,
    color: 'rgb(255,255,255)',
    fontWeight: '700',
    fontSize: RFValue(30),
    alignSelf: 'stretch',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pamilihanLogo: {
    aspectRatio: 1/1,
    resizeMode: 'contain',
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
    backgroundColor: 'transparent',
  },

  logoMiddle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent',
    
  },

  searchSection: {
    marginVertical: 5,
  },

  bodySection: {
    flex: 8,
  },

  logoTitle: {

  },

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
});