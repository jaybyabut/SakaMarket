import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function Magsasakaregister() {
  const navigation = useNavigation();
  const navBack = () => {
    router.push("/sellpage1") 
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Mamimili Register Page" });
  }, [navigation]);

  return (

    <View style={styles.container}>
        <Image
            source={require("../assets/images/Checkmark.png")}
            style={styles.logo} 
        />
        <Text style={styles.header}>Success!</Text>
        <View style={styles.box}>
            <Text style={styles.contentHeader}>ORDER #1</Text>
            <Text style={styles.content}>Pangalan: Palay</Text>
            <Text style={styles.content}>Presyo: P20 /kilo</Text>
            <Text style={styles.content}>Dami: 50kg</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 150, marginLeft: 0 }}>
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
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 200,
    },
    header: {
        fontSize: 48,
        color: 'black',
        fontFamily: 'Roboto-Bold',
        marginTop: 0,
    },
    box: {
        width: '80%',
        height: 200,
        backgroundColor: '#10AF7C',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        marginTop: 10,
    },
    contentHeader: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Roboto-Bold',
        marginBottom: 5,
        top: -10,
    },
    content: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        marginBottom: 5,
    },
    imageButton: {
    width: 30,
    height: 30,
    left: -40,
   
  },
  navText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    left: -40,
    marginLeft: 5,
  }
});