import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("../assets/fonts/Roboto.ttf"),
      "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
      "SecularOne-Regular": require("../assets/fonts/SecularOne-Regular.ttf"),
      "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
