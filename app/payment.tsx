import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('window');


export default function payment() {
    const item = useLocalSearchParams();

    const [value, setValue] = React.useState('option1');

  return (
    <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity style={styles.backButton} 
        onPress={() => router.back()}>
            <Image source={require('../assets/images/Back-w.png')}></Image>
        </TouchableOpacity>
        <LinearGradient
        colors={["#10AF7C", "#86C778", "#FFFFFF"]}
        locations={[0.1, 0.2, 0.6]}
        style={{flex: 1}}
        dither={true}
        >
            <View style={styles.titleAreaContainer}>
                <Text style={styles.mainTitle}>Pagbabayad</Text>
            </View>
            <View style={styles.whiteContainer}>
                <View style={styles.details}>
                    <Text style={styles.paraan}>Paraan ng Pagbabayad:</Text>
                    <LinearGradient
                    colors={["#10AF7C", "#86C778"]}
                    style={styles.card}
                    dither={true}
                    >

                        <View style={{flex: 1}}>
                            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label="Card" value="card" labelStyle={{color: 'white'}} style={{marginVertical: 0, marginHorizontal: 4}} position="leading"/>
                                <RadioButton.Item label="Maya" value="maya" labelStyle={{color: 'white'}} style={{marginVertical: 0, marginHorizontal: 4}} position="leading"/>
                                <RadioButton.Item label="GCash" value="gcash" labelStyle={{color: 'white'}} style={{marginVertical: 0, marginHorizontal: 4}} position="leading"/>
                            </RadioButton.Group>
                        </View>
                    </LinearGradient>

                    <Text style={styles.lugar}>Lugar ng Pagkuha:</Text>
                    <TextInput placeholder='123 Main St, City, ZIP' style={styles.input}></TextInput>
                </View>

                <View style={styles.conclusion}>
                    <View style={styles.totalLine}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.txtTotal}>Total:</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.txtTotalPrice}>{item.price}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/buy-confirmation')}>
                        <LinearGradient
                        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
                        dither={true}
                        style={{ flex: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                    
                                    <Text style={{color: '#FFFFFF', fontSize: RFValue(20)}}>Magbayad Na</Text>
                                    
                                
                                </LinearGradient>
                            </TouchableOpacity>
            </View>
        </LinearGradient>
        
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: '2%', // distance from bottom of screen
        left: '50%',
        transform: [{ translateX: -(width * 0.6) / 2 }],
        width: width * 0.6,
        height: '10%',

    },
    totalLine:{
        flex: 1,
        flexDirection: 'row',

    },

    txtTotalPrice: {
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        textAlign: 'right',
        fontSize: RFValue(20),
        fontWeight: '700',
        top: '12%',
        right: '30%',
    },
    txtTotal:{
        top: '12%',
        left: '30%',
        fontSize: RFValue(20),
        fontWeight: '700',
    },

    leftContainer: {
        flex: 1,
    },

    rightContainer: {
        flex: 1,

    },

    lugar:{
        left: '15%',
        top: '14%',
        fontSize: RFValue(15),
    },

    input:{
        left: '15%',
        top: '16%',
        borderColor: "#D9D9D9",
        borderWidth: 1,
        width: '70%',
        borderRadius: 32,
        paddingLeft: 20,
        
    },

    card:{
        height: '32%',
        width: '70%',    
        left: '15%',
        top: '10%',
    },

    paraan:{
        left: '15%',
        top: '8%',
        fontWeight: '700',
        fontSize: RFValue(15)
    },

    details: {
        flex: 2,
    },

    conclusion: {
        position: 'absolute',
        elevation: 20,
        borderRadius: 90,
        backgroundColor: 'rgb(255, 255, 255)', 
        width: width * 1.2,
        height: height * 0.4,
        top: height - (height / 2.2),
        left: '50%',
        transform: [{ translateX: -(width * 1.2) / 2 }],
        justifyContent: 'flex-start'

    },

    mainTitle:{
        color: '#FFFFFF',
        fontSize: RFValue(25),
        fontWeight: '700',
    },

    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    titleAreaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },


    gradientContainer:{
        flex: 1,

    },

    whiteContainer: {
        height: height * 0.75,
        width: width * 1.1,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 90,
        alignSelf: 'center',
    },

    backButton: {
        position: 'absolute',
        zIndex: 2,
        left: '5%',
        top: '5%',
    },
})


/*
<LinearGradient
                        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
                        dither={true}
                        style={{ height: '30%', width: '80%'}}>
                                    <Text style={{color: '#FFFFFF', fontSize: RFValue(20)}}>BILHIN</Text>
                        </LinearGradient> */