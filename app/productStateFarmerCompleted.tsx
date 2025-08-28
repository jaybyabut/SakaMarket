import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import CompletedFarmer from "../components/CompletedFarmer";
 
const { width, height } = Dimensions.get('window');


export default function Signin() {
  const [searchLeft, setSearchLeft] = useState(0);
  const [searchText, onChangeSearchText] = useState("");
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchLedger = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      if (!user) return;

      const response = await axios.get(
        `http://10.0.2.2/database/fetchLedgerFarmer.php?seller_id=${user.user_id}`
      );

      console.log("Ledger Products:", response.data);

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        console.log("API error:", response.data.error);
      }
    } catch (error) {
      console.error("Fetch ledger products error:", error);
    }
  };

  fetchLedger();
}, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
        style={{ flex: 1.2 }}
        dither={true}
      >
        
        <SafeAreaView style={styles.header}>
          <Pressable onPress={() => router.push("/home-magsasaka")}>
            <Image source={require("../assets/images/Back-w.png")} style={styles.back}></Image>
          </Pressable>
          <View style={[styles.logoMiddle]}>
         <Image source={require("../assets/images/pamilihan-logo.png")} style={styles.pamilihanLogo}></Image>
         <Text style={styles.pamilihanText}>Mga Produkto</Text>

          </View>
        </SafeAreaView>
      </LinearGradient>


      <View style={styles.searchSection}>

      {/* Nakumpleto (Outlined Button) */}
      <Pressable style={styles.halfButton} onPress={() => router.push('/productStateFarmerReceive')}>
        <View style={styles.outlinedButton}>
          <Text style={styles.outlinedText}>Tatanggapin</Text>
        </View>
      </Pressable>

      {/* Tatanggapin (Gradient Button) */}
      <Pressable style={styles.halfButton}>
        <LinearGradient
          colors={['#10AF7C', '#86C778']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.gradientText}>Nakumpleto</Text>
        </LinearGradient>
      </Pressable>
        
      </View>

      <View style={styles.bodySection}>
        <FlatList
         data={products}
         keyExtractor={(item, index) => item.id?.toString() || index.toString()}
         renderItem={({ item }) => <CompletedFarmer item={item} />}
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
    flexDirection: 'row',
    marginVertical: 10,
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
    halfButton: {
    flex: 1,
    marginHorizontal: 15,
  },
  gradientButton: {
    height: 45,
    borderRadius: 22.5, // 👈 pill shape
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  outlinedButton: {
    height: 45,
    borderRadius: 22.5, // 👈 pill shape
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10AF7C',
    backgroundColor: 'white',
  },
  outlinedText: {
    color: '#10AF7C',
    fontSize: 16,
    fontWeight: '600',
  },
});