import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CenteredView({ children, style = {} }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
