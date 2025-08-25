import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

function SplashScreen() {
  return (
    <View style={styles.centered}>
      <Image source={require('../assets/logo.png')} />
      <ActivityIndicator size="large" />
    </View>
  );
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});