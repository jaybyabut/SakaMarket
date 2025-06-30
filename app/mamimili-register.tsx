import { Text, View, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useLayoutEffect } from "react";



export default function Magsasakaregister() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Mamimili Register Page" });
  }, [navigation]);

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Gumawa ng Account</Text>
    </View>
  );
}
