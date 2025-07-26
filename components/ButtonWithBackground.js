import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const buttonWithBackground = props => {
  const content = (
    <LinearGradient
      colors={props.colors || ['#4c669f', '#3b5998', '#192f6a']}
      start={props.start || { x: 0, y: 0 }}
      end={props.end || { x: 1, y: 0 }}
      locations={props.locations}
      style={[styles.button, props.style]}
    >
      <View style={styles.innerContent}>
        {props.image && (
          <Image source={props.image} style={styles.icon} />
        )}
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: 300,
    height: 300,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    backgroundColor: '#fff',
  },
  text:{
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  innerContent: {
    flexDirection: 'column',       
    alignItems: 'center',       
    justifyContent: 'center',
                  
  },
  icon: {
    width: 200,
    height: 200,
    marginRight: 8, 
  },
});

export default buttonWithBackground;