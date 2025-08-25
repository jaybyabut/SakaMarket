import React from 'react';
import { Text } from 'react-native';
import styles from './Typography.styles';

export default function SubText({ children, style = {} }) {
  return <Text style={[styles.sub, style]}>{children}</Text>;
}
