import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './Button.styles';

export default function OutlineButton({ text, onPress, style = {}, textStyle = {} }) {
  return (
    <Pressable style={[styles.outlineButton, style]} onPress={onPress}>
      <Text style={[styles.outlineText, textStyle]}>{text}</Text>
    </Pressable>
  );
}
