import { useNavigation } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');
export default function ConfirmationScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/images/Checkmark.png")}
          style={styles.checkmark}
          resizeMode="contain"
        />
        <Text style={styles.success}>Success!</Text>
        <Text style={styles.message}>
          Salamat sa pagpuna ng mga hinihinging detalye. Maghintay ng
          kumpirmasyon sa iyong phone number upang malaman kung puwede nang
          buksan ang iyong account.
        </Text>
      </View>

      <Pressable
        style={styles.jumpToLogin}
        onPress={() => navigation.navigate('signIn')}
      >
        <Text style={styles.loginText}>Pumunta sa Log-in Page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
         
  },
  contentContainer: {
    flex: 1,                  
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.8,
  },
  checkmark: {
    width: width * 0.5,
    height: width * 0.5,
  },
  success: {
    fontSize: RFValue(48),
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    width: '100%',
  },
  message: {
    fontSize: RFValue(16),
    fontFamily: 'Roboto',
    textAlign: 'center',
    height: 'fit-content',
    width: '100%',
  },
  jumpToLogin: {
    position: 'absolute',
    bottom: height * 0.05,
    alignSelf: 'center',
    backgroundColor: '#10AF7C',
    width: width * 0.7,
    height: height * 0.07,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  loginText: {
    fontSize: RFValue(15),
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: 'rgb(255,255,255)'
  },
});
