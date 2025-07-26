import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import CheckBox from 'expo-checkbox';
import { router, useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Magsasakaregister() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const navBack = () => {
    router.push("/sellpage2") 
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Sell page 3" });
  }, [navigation]);

  const handleConfirm = async () => {
    if (!isChecked) {
      Alert.alert('Paalala', 'Pakisigurado na lahat ng detalye ay tama.');
      return;
    }

    try {
      const response = await axios.post( 
        "http://10.0.2.2/sakamarket/sellProduct.php",
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      Alert.alert("Tagumpay", response.data.message || "Product stored!");
      router.push('/sellpage4'); // or another page after success
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hindi na-save ang produkto.");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {/* Background Shape */}
        <View style={styles.backgroundShape} />

        {/* Foreground Content */}
        <View style={styles.top}>
          <Text style={styles.header}>Magbenta ng Tanim</Text>
          <Text style={styles.subtitle}>Kumpirmahin ang mga detalye</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>Ikaw ay magbebenta ng:</Text>

          <View style={styles.box}>
            <Text style={styles.boxText}>Pangalan ng Produkto: {params.name}</Text>
            <Text style={styles.boxText}>Presyo: ₱{params.price}</Text>
            <Text style={styles.boxText}>Dami: {params.amount} kilo</Text>
          </View>

          {/* Checkbox row */}
          <View style={styles.checkboxRow}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? '#10AF7C' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.subtitle2}>
              Lahat ng detalye na aking inilagay ay tama
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleConfirm}
            >
            <Text style={{ color: 'white', fontFamily: 'Roboto-Bold', fontSize: 30 }}>
              IBENTA
            </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 190, marginLeft: 20 }}>
                <TouchableOpacity onPress={navBack} activeOpacity={0.7}>
                    <Image
                        source={require("../assets/images/backtoblack.png")}
                        style={styles.imageButton2} 
                    />
                    </TouchableOpacity>
                <Text style={styles.navText2}>BUMALIK</Text>
            </View>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#10AF7C',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundShape: {
    position: 'absolute',
    width: 450,
    height: 830,
    backgroundColor: 'white',
    borderRadius: 70,
    bottom: -100,
    zIndex: 1,
    left: -20,
  },
  top: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    top: 50,
    left: 40,
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Roboto-Regular',
    top: 49,
    left: 40,
  },
  content: {
    flex: 7,
    padding: 20,
    marginTop: 40,
    zIndex: 2,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#10AF7C',
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  boxText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginTop: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    marginLeft: 30,
  },
  checkbox: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  subtitle2: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: '#10AF7C',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
    marginTop: 70,
  },
  imageButton2: {
    width: 30,
    height: 30,
    zIndex: 2,
  },
  navText2: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    marginRight: 105,
    zIndex: 2,
  }
});
