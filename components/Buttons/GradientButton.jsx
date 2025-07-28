import React from 'react';
import { Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Button.styles';

export default function GradientButton({ text, onPress, style = {} }) {
  return (
    <LinearGradient
      colors={['#10AF7C', '#86C778']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientWrapper, style]}
    >
      <Pressable style={styles.fullSize} onPress={onPress}>
        <Text style={styles.gradientText}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
}
