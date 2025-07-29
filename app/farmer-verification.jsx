import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

export default function FarmerVerificationScreen() {
  const router = useRouter();
  const [selfie, setSelfie] = useState(null);
  const [govID, setGovID] = useState(null);
  const [farmDoc, setFarmDoc] = useState(null);
  const [invalidFields, setInvalidFields] = useState([]);

  const allValid = selfie && govID && farmDoc;

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
      const response = await fetch('http://your-ip-address/backend/farmer_verification.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.text();
      if (result.includes('success')) {
        router.push('/confirm-registration');
      } else {
        Alert.alert('Error', 'Verification failed. Try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backIconWithHeader}>
        <Pressable style={styles.backButton} onPress={() => router.push("/signUp")}>
          <Image style={styles.backIcon} source={require("../assets/STARTer/back-icon.png")} />
        </Pressable>

        <View style={styles.upperText}>
          <Text style={styles.header}>I-verify ang Account</Text>
          <Text style={styles.instruction}>
            Ipasa ang mga sumusunod na dokumento upang makagawa ng iyong account
          </Text>
        </View>
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
          <ButtonWithText
            icon={require('../assets/STARTer/Farmer Verification/back-page.png')}
            label="PREVIOUS"
            reverse
            onPress={() => router.back()}
          />
          <ButtonWithText
            icon={require('../assets/STARTer/Farmer Verification/next-page.png')}
            label="SUBMIT"
            onPress={handleSubmit}
            disabled={!allValid}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

function UploadField({ label, image, onPick, invalid }) {
  return (
    <View style={styles.labelAndUpload}>
      <Text style={styles.uploadLabel}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropArea, invalid && { borderColor: 'red', borderWidth: 2 }]}
        onPress={onPick}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
      </TouchableOpacity>
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
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: -45,
    left: -5,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  backIconWithHeader: {
    position: "relative",
  },
  upperText: {
    width: 366,
    height: 86,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    marginBottom: 6.5,
  },
  instruction: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  greenContainer: {
    marginTop: 3,
    width: 464,
    flex: 1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingHorizontal: 44,
    paddingTop: 25,
    paddingBottom: 28,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.51,
    shadowRadius: 8.7,
    shadowOffset: { width: 17, height: 4 },
    elevation: 4, //for android
  },
  uploadSection: {
    gap: 16,
    alignItems: 'center',
  },
  labelAndUpload: {
    width: 338,
    height: 139,
    justifyContent: 'space-between',
  },
  uploadLabel: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
  },
  dropArea: {
    width: '100%',
    height: 112,
    backgroundColor: '#FFFDEB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8.7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4, //for android
  },
  uploadText: {
    fontSize: 14,
    color: '#8F8E8E',
    fontFamily: 'Roboto',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 346,
    height: 47,
    marginTop: 20,
    alignSelf: 'center', 
    bottom: 25,
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
});
