import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type BtnTextProps = {
  btnText: string;
  style?: StyleProp<ViewStyle>;
}


export default function GradientBtn({btnText, style}: BtnTextProps) {
  return (
    
    <TouchableOpacity style={[styles.gradientBtn, style]}>
      <LinearGradient
        colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778", "#86C778"]}
        dither={true}
        style={{ flex: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 3 }}
      >
      <Text style={styles.textArea}>{btnText}   <FontAwesome name="sliders" size={17} color="white" /></Text>
      </LinearGradient>
    </TouchableOpacity>
   
  )
}

const styles = StyleSheet.create({
  gradientBtn: {
    borderRadius: 20,
    padding: 0,
    width: '25%',
    alignContent: 'center',
    left: '50%',
    height: '35%',
    elevation: 0
  },

  textArea: {
    color: "#FFFFFF",
    paddingLeft: 20,
    paddingRight: 20,
  },

});