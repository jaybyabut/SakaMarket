import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";

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
      <Text>Sign In</Text>
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
