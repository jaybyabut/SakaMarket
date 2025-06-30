import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";



export default function Magsasakaregister() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Magsasaka Register Page" });
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
