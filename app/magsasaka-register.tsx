import React from 'react';
import { useRouter } from 'expo-router';
import { useLayoutEffect } from "react";
import { Text, View, Button } from "react-native";

export default function Magsasakaregister() {
  const router = useRouter();

  useLayoutEffect(() => {
  
  }, []);

  const handleRegister = () => {
    // Registration logic here...
    router.replace('/home-magsasaka');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Gumawa ng Account</Text>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
} 