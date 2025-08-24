import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import Colors from '../constants/Colors';
const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const goToFarmer = () => {
    router.push({
      pathname: '/farmerDetails',
      params: { role: 'farmer' }
    });
  };

  const goToBuyer = () => {
    router.push({
      pathname: '/buyerDetails',
      params: { role: 'buyer' }
    });
  };


  return (
      <View style={styles.container}>
        

        {/* Text Section */}
        <View style={styles.textSection}>
          
          <Pressable style={styles.backPosition} onPress={() => router.push('/App')}>
          <Image
            style={styles.backIcon}
            source={require('../assets/STARTer/back-icon.png')}
          />
          </Pressable>

          <Text style={styles.signupText}>Sign Up</Text>
          <Text style={styles.questionText}>Ano ang iyong tungkulin?</Text>
        </View>

        {/* Role Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonScale}>
            <LinearGradient
              colors={[Colors.primaryGreen, Colors.gradientGreenStart, Colors.gradientGreenMid, Colors.gradientGreenEnd]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Pressable style={styles.buttonContent} onPress={goToFarmer}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../assets/STARTer/Sign Up/magsasaka-icon.png')}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Magsasaka</Text>
              </Pressable>
            </LinearGradient>
          </View>
          
          <View style={styles.buttonScale}>
            <LinearGradient
              colors={[Colors.primaryGreen, Colors.gradientGreenStart, Colors.gradientGreenMid, Colors.gradientGreenEnd]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Pressable style={styles.buttonContent} onPress={goToBuyer}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../assets/STARTer/Sign Up/cart-icon.png')}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Mamimili</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  backPosition: {
    position: 'absolute',
    width: height * 0.03,
    height: height * 0.03,
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.04
  },
  backIcon: {
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',


  },
  signupText: {
    fontSize: RFValue(25),
    fontFamily: 'Roboto-Bold',
    textAlign: 'center'
  },
  questionText: {
    fontSize: RFValue(17),
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: height * 0.05,

  },
  button: {
    width: height * 0.3,
    height: height * 0.3,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2.3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonIcon: {
    width: width * 0.4,
    height: width * 0.4,

  },
  buttonText: {
    fontSize: RFValue(30),
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },

  buttonScale:{
    
  }
});