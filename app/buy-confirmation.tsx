import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');


export default function Magsasakaregister() {
  const navigation = useNavigation();

  const navBack = () => {
    router.push("/buy-page") 
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Mamimili Register Page" });
  }, [navigation]);


  return (

    <View style={styles.container}>

        <View style={styles.contentContainer}>
            <Image
                source={require("../assets/images/Checkmark.png")}
                style={styles.logo} 
            />
            <Text style={styles.header}>Success!</Text>
            <View style={styles.greenBox}>
                <View style={styles.contentBox}>
                <Text style={styles.contentHeader}>ORDER #1</Text>
                <View style={styles.content}>
                    <Text style={styles.contentText}>Pangalan: Palay</Text>
                    <Text style={styles.contentText}>Presyo: P20 /kilo</Text>
                    <Text style={styles.contentText}>Dami: 50kg</Text>
                </View>
                </View>
            </View>
        </View>





        
            <TouchableOpacity style={styles.navContainer} onPress={navBack} activeOpacity={0.7}>
                <Image
                    source={require("../assets/images/backtoblack.png")}
                    style={styles.imageButton}/>
                <Text style={styles.navText}> 
                    
                    
                        BUMALIK
                
                </Text>
                
                </TouchableOpacity>
            
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#FFF",
    },
    contentContainer:{
        flex: 1,                  
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width * 0.8,
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
    },
    header: {
        fontSize: RFValue(48),
        color: 'black',
        fontFamily: 'Roboto-Bold',
        marginBottom: height * 0.04,
    },
    greenBox: {
        backgroundColor: '#10AF7C',
        borderRadius: 20,
        height: height * 0.25,
        width: width * 0.8,
        
    },
    contentBox:{
        top: height * 0.02,
        left: width * 0.05,
    },
    contentHeader: {
        color: 'white',
        fontSize: RFValue(24),
    },
    content: {
        
    },
    contentText: {
        color: 'white',
        fontSize: RFValue(18),
        marginTop: height * 0.01,
    },
    imageButton: {
        width: width * 0.06,
        height: width * 0.06,
    },
    navText: {
        fontSize: RFValue(20),
        color: 'black',
        fontFamily: 'Roboto-Bold',
    },
    navContainer:{
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.02,
        bottom: height * 0.02,
        left: width * 0.11,
    }
});