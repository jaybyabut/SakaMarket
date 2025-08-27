import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { RadioButton } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

export default function payment() {
  const item = useLocalSearchParams();
  /*console.log("Received item:", item);*/
  const [value, setValue] = React.useState("option1");

  const API_URL = "http://10.0.2.2/database/buyProduct.php";

  const handlePayment = async () => {
    console.log("Sending to backend:", { product_id: item.id });
    if (!item.id) {
      Alert.alert("Error", "No product selected.");
      return;
    }
    try {
      const response = await axios.post(API_URL, {
        product_id: item.id,
        amount: item.amount,
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        Alert.alert(
          "Success",
          response.data.message || "Transaction completed successfully.",
          [{ text: "OK", onPress: () => router.push("/buy-confirmation") }]
        );
      } else {
        // This now shows ledger validation or any failure messages
        Alert.alert(
          "Ledger Warning",
          response.data.message || "Transaction failed due to ledger issue."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
      
      <LinearGradient
        colors={["#10AF7C", "#86C778", "#FFFFFF"]}
        locations={[0.1, 0.2, 0.6]}
        style={{ flex: 1 }}
        dither={true}>

        <View style={styles.titleAreaContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require("../assets/images/Back-w.png")}></Image>
          </TouchableOpacity>
          <Text style={styles.mainTitle}>Pagbabayad</Text>
        </View>


        <View style={styles.whiteContainer}>
          <View style={styles.content}>
            <Text style={styles.paraan}>Paraan ng Pagbabayad:</Text>


            <LinearGradient
              colors={["#10AF7C", "#86C778"]}
              style={styles.card}
              dither={true}>
                
              <View>
                <RadioButton.Group
                  onValueChange={(value) => setValue(value)}
                  value={value}>

                  <RadioButton.Item
                    label="Card"
                    value="card"
                    labelStyle={{ color: "white" }}
                    style={{ marginVertical: 0, marginHorizontal: 4 }}
                    position="leading"
                  />
                  <RadioButton.Item
                    label="Maya"
                    value="maya"
                    labelStyle={{ color: "white" }}
                    style={{ marginVertical: 0, marginHorizontal: 4 }}
                    position="leading"
                  />
                  <RadioButton.Item
                    label="GCash"
                    value="gcash"
                    labelStyle={{ color: "white" }}
                    style={{ marginVertical: 0, marginHorizontal: 4 }}
                    position="leading"
                  />
                </RadioButton.Group>
              </View>
            </LinearGradient>

            <Text style={styles.lugar}>Lugar ng Pagkuha:</Text>
            <TextInput
              placeholder="123 Main St, City, ZIP"
              style={styles.input}
            ></TextInput>
          </View>

          <View style={styles.conclusion}>
            <View style={styles.totalLine}>
              <View style={styles.leftContainer}>
                <Text style={styles.txtTotal}>Total:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.txtTotalPrice}>P{item.price}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePayment}>
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
              dither={true}
              style={styles.button}
            >
              <Text style={{ color: "#FFFFFF", fontSize: RFValue(20)}}>
                Magbayad Na
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
          </View>


          
        </View>
      </LinearGradient>

  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 70,
    paddingVertical: '3%'
  },
  totalLine: {
    flex: 1,
    width: '60%',
    flexDirection: "row",
    alignSelf: 'center',
  },

  txtTotalPrice: {
    fontSize: RFValue(40),
    fontWeight: "700",
    top: "12%",
    alignSelf: 'flex-end',

  },
  txtTotal: {
    top: "12%",
    fontSize: RFValue(40),
    fontWeight: "700",
  },

  leftContainer: {
    flex: 1,
  },

  rightContainer: {
    flex: 1,
  },

  lugar: {
    paddingTop: '10%',
    fontSize: RFValue(15),
    paddingBottom: '5%',
  },

  input: {
    borderColor: "#adadadff",
    borderWidth: 1,
    width: "100%",
    borderRadius: 32,
    paddingLeft: 20,
  },

  card: {
    width: "100%",
    borderRadius: 12,
  },

  paraan: {
    fontSize: RFValue(15),  
    paddingBottom: '5%',
  },

  content: {
    flex: 1,
    width: '70%',
    alignSelf: 'center',
    paddingTop: '10%',
  },

  conclusion: {
    position: "absolute",
    elevation: 20,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: "#f0faf4ff",
    width: width * 1.2,
    height: height * 0.2,
    bottom: '0%',
    alignSelf: 'center',
    
  },

  mainTitle: {
    color: "#FFFFFF",
    fontSize: RFValue(25),
    fontWeight: "700",
  },

  mainContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  titleAreaContainer: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignSelf: "center",
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
  },

  gradientContainer: {
    flex: 1,
  },

  whiteContainer: {
    flex: 7,
    width: width * 1.2,
    backgroundColor: "#E6F5EC",
    borderRadius: 90,
    alignSelf: "center",
  },

  backButton: {
    position: 'absolute',
    left: '7%'
  },
});

/*
<RadioButton.Group
                  onValueChange={(value) => setValue(value)}
                  value={value}
                >
                  <RadioButton.Item
                    label="Card"
                    value="card"
                    labelStyle={{ color: "white" }}
                    style={{ marginVertical: 0, marginHorizontal: 4 }}
                    position="leading"
                  />
                  <RadioButton.Item
                    label="Maya"
                    value="maya"
                    labelStyle={{ color: "white" }}
                    style={{ marginVertical: 0, marginHorizontal: 4 }}
                    position="leading"
                  />
                  <RadioButton.Item
                    label="GCash"
                    value="gcash"
                    labelStyle={{ color: "white" }}
                    style={{ marginVertical: 0, marginHorizontal: 4 }}
                    position="leading"
                  />
                </RadioButton.Group> */
