import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

export default function FarmerVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selfie, setSelfie] = useState(null);
  const [govID, setGovID] = useState(null);
  const [farmDoc, setFarmDoc] = useState(null);
  const [invalidFields, setInvalidFields] = useState([]);

  const pickImage = async (setImage) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const missing = [];
    if (!selfie) missing.push('selfie');
    if (!govID) missing.push('govID');
    if (!farmDoc) missing.push('farmDoc');
    setInvalidFields(missing);
    if (missing.length > 0) return;

    const formData = new FormData();
    formData.append('first_name', params.first_name);
    formData.append('middle_name', params.middle_name);
    formData.append('last_name', params.last_name);
    formData.append('address', params.address);
    formData.append('phone', params.phone);
    formData.append('code', params.code);
    formData.append('pin', params.pin);
    formData.append('role', 'farmer');

    formData.append('selfie', {
      uri: selfie,
      name: 'selfie.jpg',
      type: 'image/jpeg',
    });
    formData.append('gov_id', {
      uri: govID,
      name: 'gov_id.jpg',
      type: 'image/jpeg',
    });
    formData.append('farm_doc', {
      uri: farmDoc,
      name: 'farm_doc.jpg',
      type: 'image/jpeg',
    });

try {
  const response = await fetch('http://10.0.2.2/database/farmerRegister.php', {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();
  console.log('Server Response:', text);

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    Alert.alert('Error', 'Server did not return JSON. Check PHP logs.');
    return;
  }

  if (json.success) {
    router.push('/confirm-registration');
  } else {
    Alert.alert('Error', json.error || 'Verification failed. Try again.');
  }
} catch (error) {
  console.error(error);
  Alert.alert('Error', 'Network or server issue.');
}
  };

  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
                    
            <Pressable style={styles.backPosition} onPress={() => router.back()}>
              <Image
                style={styles.backIcon}
                source={require('../assets/STARTer/back-icon.png')}
                    />
            </Pressable>
          
            <Text style={styles.mainText}>I-verify ang Account</Text>
            <Text style={styles.subText}>Ipasa ang mga sumusunod na dokumento upang makagawa ng iyong account</Text>
          
          </View>

      <LinearGradient
        colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778', 'rgba(134,199,120,0.87)']}
        style={styles.greenContainer}
      >
        <View style={styles.uploadSection}>
          <UploadField
            label="Selfie with Valid ID"
            image={selfie}
            onPick={() => pickImage(setSelfie)}
            invalid={invalidFields.includes('selfie')}
          />
          <UploadField
            label="Government-Issued ID"
            image={govID}
            onPick={() => pickImage(setGovID)}
            invalid={invalidFields.includes('govID')}
          />
          <UploadField
            label="Farm Registration Document"
            image={farmDoc}
            onPick={() => pickImage(setFarmDoc)}
            invalid={invalidFields.includes('farmDoc')}
          />
        </View>

        <View style={styles.buttons}>
          <View style={styles.leftButton}>
          <ButtonWithText
            icon={require('../assets/STARTer/Farmer Verification/back-page.png')}
            label="NAKARAAN"
            reverse
            onPress={() => router.back()}
          />
          </View>
          <View style={styles.rightButton}>
          <ButtonWithText
            icon={require('../assets/STARTer/Farmer Verification/next-page.png')}
            label="ISUBMITE"
            onPress={handleSubmit}
            disabled={!selfie || !govID || !farmDoc}
          />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function UploadField({ label, image, onPick, invalid }) {
  return (
    <View style={styles.labelAndUpload}>
      <Text style={styles.uploadLabel}>{label}</Text>
      <Pressable
        style={[styles.dropArea, invalid && { borderColor: 'red', borderWidth: 2 }]}
        onPress={onPick}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
      </Pressable>
    </View>
  );
}

function ButtonWithText({ icon, label, reverse, onPress, disabled }) {
  return (
    <Pressable
      style={[styles.buttonWithText, { opacity: disabled ? 0.5 : 1 }]}
      onPress={!disabled ? onPress : null}
    >
      {reverse && <Image source={icon} style={styles.buttonIcon} />}
      <Text style={styles.buttonText}>{label}</Text>
      {!reverse && <Image source={icon} style={styles.buttonIcon} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF'
    },
    backPosition: {
      position: 'absolute',
      width: height * 0.03,
      height: height * 0.03,
      zIndex: 1,
      left: width * 0.04,
      top: height * 0.032
    },
    backIcon: {
      height: '100%',
      width: '100%'
    },
  
    textSection: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
  
  
    },
    mainText: {
      textAlign: 'center',
      fontSize: RFValue(25),
      fontFamily: 'Roboto-Bold'
    },
    subText: {
      textAlign: 'center',
      fontSize: RFValue(17),
      width: width * 0.8,
  
    },
    greenContainer: {
      flex: 5,
      width: width * 1.16,
      borderTopLeftRadius: 80,
      borderTopRightRadius: 80,
      shadowColor: '#000',
      shadowOpacity: 0.51,
      shadowRadius: 8.7,
      shadowOffset: { width: 17, height: 4 },
      elevation: 4,
      zIndex: 2,
      alignSelf: 'center',
    },
    uploadSection: {
      top: '5%',
      height: height * 0.59,
      width: width * 0.80,
      alignSelf: 'center',
    },
    labelAndUpload: {
      marginBottom: 10,

    },
    uploadLabel: {
      fontSize: RFValue(16),
      fontFamily: 'Roboto-Medium',
      marginBottom: 10,
      color: '#FFF'
    },
    dropArea: {
      height: height * 0.12,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFDEB',
      elevation: 4,
    },
    uploadText: {
      color: '#8F8E8E',
      fontSize: RFValue(12),
      fontFamily: 'Roboto-Regular',
    },
    buttons: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: width * 0.80,
      height: 47,
      bottom: 25,
      alignSelf: 'center',
    },
    buttonWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    },
    buttonIcon: {
      width: 29,
      height: 29,
      resizeMode: 'contain',
    },
    buttonText: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      color: 'white',
    },
    leftButton:{
      flex: 1,
      alignItems: 'flex-start',
    },
    rightButton:{
      alignItems: 'flex-end',
    },
});
