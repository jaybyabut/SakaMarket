import { Text, View, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useLayoutEffect, useEffect } from "react";
import { router } from "expo-router";

export default function Signin() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "sign in page" });
  }, [navigation]);



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Magsasaka"
        onPress={() => {
          // goes to register page
          router.push("/magsasaka-register");
        }}
      />
  

      <Button
        title="Mamimili"
        onPress={() => {
          // goes to register page
          router.push("/mamimili-register");
        }}
      />
    </View>
  );
}
