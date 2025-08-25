import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import removeConfirmation from '../components/removeConfirmation';


type itemCardProps = {
    item: {
        id: number,
        image?: string;
        date: number;
        name: string;
        price: number;
        amount: number;
        description: string;
        title: string;
    };
};

export default function listingItem({item}: itemCardProps) {
  return (
    <Pressable style={styles.container} onPress={/*changing of details to be implemented: () => router.push({
        pathname: '/product-page',
        params: { ...item }})*/
        () => console.log('changing of data page')}>
        
        <View style = {styles.flexContainer}>
            <View style = {styles.imageContainer}>
                <Image source={item.image ? { uri: item.image } : require('../assets/images/missing.png')}
                style = {styles.itemImage}/>
            </View>


            <View style = {styles.dataContainer}>
                <Text style = {{fontWeight: 700, fontSize: RFValue(15)}}>{item.title}</Text>
                <Text>{item.amount} kg</Text>
                <Text style = {{color: '#48BA7A', fontWeight: 700}}>₱{item.price}</Text>
                <Text>{item.description}</Text>
            </View>

            <View style = {styles.removeContainer}>
                <TouchableOpacity onPress={() => removeConfirmation(item)}>
                    <Image source={require("../assets/images/Close.png")}/>
                </TouchableOpacity>
            </View>
        </View>


        
    </Pressable>
      
  )
}



const styles = StyleSheet.create({
    removeContainer: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'rgb(255,255,255)',
        
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
        margin: 10,
        marginBottom: 5,
        backgroundColor: 'rgb(255,255,255)',
        paddingVertical: 10,
        
    },

    flexContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'rgb(255,255,255)',
    },

    imageContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },

    itemImage: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '80%',
        resizeMode: 'cover'

    },


    dataContainer: {
        flex:2,
        backgroundColor: "rgb(255,255,255)"
    }, 

    massText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: -8

    },

    dayPosted: {
        alignContent: 'flex-end',
        textAlign: 'right',
        paddingRight: 10,
        fontWeight: '100',
    },

    orderNumber: {
        fontWeight: '600',
        fontSize: 15,
        marginTop: 0,
        padding: 0,
    },

    mainText: {
        fontWeight: '800',
        fontSize: 25,
        padding: 0,
        marginTop: -5,
        flex: 1,
    },

    price: {
        color: '#48BA7A',
        alignContent: 'flex-end',
        textAlign: 'right',
        alignItems: 'flex-end',
        flex: 1,
        fontSize: 30,
        fontWeight: '900',
        paddingRight: 10,
    },

    farmerName: {
        color: '#565656'
    },
    
    address: {
        flex: 1,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: '#565656',

    },


    buttonArea: {
        
    },

});