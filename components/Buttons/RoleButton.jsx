import React from 'react';
import { Pressable, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

export default function RoleButton({ label, icon, onPress }) {
  return (
    <LinearGradient
      colors={[
        Colors.primaryGreen,
        Colors.gradientGreenStart,
        Colors.gradientGreenMid,
        Colors.gradientGreenEnd,
      ]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 280,
        height: 276,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 2.3,
        elevation: 3,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Image source={icon} style={{ width: 212, height: 212 }} resizeMode="contain" />
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            fontFamily: 'Roboto-Bold',
            color: 'white',
            marginTop: 8,
          }}
        >
          {label}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}
