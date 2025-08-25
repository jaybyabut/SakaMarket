import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Button.styles';

export default function LargeIconButton({ text, iconSource, onPress }) {
  return (
    <LinearGradient
      colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.largeButton}
    >
      <Pressable style={styles.largeButtonInner} onPress={onPress}>
        <Image source={iconSource} style={styles.largeButtonIcon} resizeMode="contain" />
        <Text style={styles.largeButtonText}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
}
