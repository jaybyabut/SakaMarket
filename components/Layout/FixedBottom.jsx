import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FixedBottom({ children, top = 810, style = {} }) {
  return <View style={[styles.fixed, { top }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fixed: {
    position: 'absolute',
    width: 319,
    height: 55,
    backgroundColor: '#FEF5A6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
});
