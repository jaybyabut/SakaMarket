import React from 'react';
import { Text } from 'react-native';
import styles from './Typography.styles';

export default function HeadingText({ children, style = {} }) {
  return <Text style={[styles.heading, style]}>{children}</Text>;
}
