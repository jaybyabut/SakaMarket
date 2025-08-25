import { LinearGradient } from "expo-linear-gradient"; // Gradient background styling
import { useRouter } from "expo-router"; // Navigation between screens
import { useState } from "react"; // React hook for state management
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

//Buyer registration page
export default function MamimiliRegister() {
  const router = useRouter();

  //INPUT FIELD STATES
  //State variables to store user's personal details (empty initially)
  // First name, Middle name, Last Name
  // Address
  // Phone number
  // Pin, Verify pin
  const [nameFirst, setNameFirst] = useState("");
  const [nameMiddle, setNameMiddle] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //VALIDATION AND STATUS STATES
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  //OTP (One-Time Password) STATES
  const [otpMessage, setOtpMessage] = useState(""); //feedback from backend (otpRequest.php)
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [verify, setVerify] = useState(""); // OTP input

  //Make sure all fields are filled up and
  //OTP is verified
  const isFormComplete =
    nameFirst &&
    nameMiddle &&
    nameLast &&
    number &&
    verify &&
    password &&
    confirmPassword &&
    otpSuccess;

  // Updated validation
  const validateFields = () => {
    const errors: string[] = [];
    const invalids: string[] = [];

    if (!nameFirst) invalids.push("nameFirst");
    if (!nameMiddle) invalids.push("nameMiddle");
    if (!nameLast) invalids.push("nameLast");

    if (!number || number.length < 11) {
      errors.push("Di-wastong numero ng telepono.");
      invalids.push("number");
    }

    if (!verify || verify.length !== 6) {
      errors.push("Di-wastong verification code.");
      invalids.push("verify");
    }

    if (!password || !confirmPassword) {
      errors.push("Parehong PIN ay kinakailangan.");
      invalids.push("password");
    } else if (password !== confirmPassword) {
      errors.push("Hindi magkatugma ang PIN.");
      invalids.push("password");
    } else if (!/^\d{4,6}$/.test(password)) {
      errors.push("Ang PIN ay dapat 4 hanggang 6 na numero.");
      invalids.push("password");
    }

    setErrorMessages(errors);
    setInvalidFields(invalids);

    return errors.length === 0;
  };

  const inputStyle = (
    type: "number" | "verify" | "password" | "default" = "default",
    invalid = false
  ): TextStyle => ({
    width: "100%",
    height: 45,
    backgroundColor: "#FFFDEB",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: invalid ? "red" : "#ccc",
    elevation: 4,
  });

  // Request OTP
  const requestOtp = async () => {
    try {
      const response = await fetch("http://10.0.2.2/database/otpRequest.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: number,
          pin: password,
        }),
      });
      const data = await response.json();
      console.log("OTP Request Response:", data);

      if (data.success) {
        setUserId(data.user_id); // save the user_id for verification
        alert(`OTP sent! (DEV: ${data.otp})`);
      } else {
        alert("Error requesting OTP: " + data.message);
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Failed to request OTP");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!userId) {
      alert("Missing user ID. Please request OTP first.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2/database/otpVerify.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          otp: verify, // OTP entered by user
        }),
      });

      const data = await response.json();
      console.log("OTP Verify Response:", data);
      console.log("OTP Request JSON:", data);
      console.log("Extracted user_id:", data.user_id);

      if (data.success) {
        setOtpSuccess(true); // allow SUNOD button
        setOtpMessage("OTP verified successfully!");
        alert("OTP verified! Phone number saved.");
      } else {
        setOtpSuccess(false);
        setOtpMessage("Verification failed: " + data.message);
      }
    } catch (error) {
      console.error("Verify error:", error);
      alert("Failed to verify OTP");
    }
  };

  const handleSubmit = async () => {
  if (!validateFields()) return;

  try {
    const response = await fetch("http://10.0.2.2/database/buyerRegister.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: nameFirst,
        middle_name: nameMiddle || "", // optional
        last_name: nameLast,
        phone: number,
        user_id: userId, // keep as number, not string
        pin: password,
      }),
    });

    const text = await response.text();
    console.log("Server Response:", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      Alert.alert("Error", "Server did not return JSON. Check PHP logs.");
      return;
    }

    if (json.success) {
      router.push("/confirm-registration");
    } else {
      Alert.alert("Error", json.error || "Verification failed. Try again.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Network or server issue.");
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Pressable style={styles.backPosition} onPress={() => router.back()}>
          <Image
            style={styles.backIcon}
            source={require("../assets/STARTer/back-icon.png")}
          />
        </Pressable>

        <Text style={styles.mainText}>Gumawa ng Account</Text>
        <Text style={styles.subText}>
          Ilagay ang iyong personal na impormasyon upang magpatuloy
        </Text>
      </View>

      <LinearGradient
        colors={[
          "#10AF7C",
          "#28B47B",
          "#5ABE7A",
          "#86C778",
          "rgba(134,199,120,0.87)",
        ]}
        style={styles.greenContainer}
      >
        <View style={styles.scrollViewContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.label}>Personal na Detalye</Text>
            <TextInput
              style={
                inputStyle("default", invalidFields.includes("nameFirst"))}
              placeholder="Pangalan (Hal. Juan)"
              value={nameFirst}
              onChangeText={setNameFirst}
            />
            <TextInput
              style={
                inputStyle("default", invalidFields.includes("nameMiddle"))}
              placeholder="Gitnang Pangalan (Hal. Reyes)"
              value={nameMiddle}
              onChangeText={setNameMiddle}
            />
            <TextInput
              style={inputStyle("default", invalidFields.includes("nameLast"))}
              placeholder="Apelyido (Hal. Dela Cruz)"
              value={nameLast}
              onChangeText={setNameLast}
            />

            <Text style={styles.label}>Contact Details</Text>
            <TextInput
              style={inputStyle("number", invalidFields.includes("number"))}
              placeholder="Numero ng Telepono (Hal. 09123456789)"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
            />
            <Pressable
              style={{
                backgroundColor: "#10AF7C",
                paddingVertical: 10,
                height: 45,
                borderRadius: 8,
                marginBottom: 10,
                elevation: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={requestOtp}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: "Roboto-Bold",      
                }}
              >
                Get OTP
              </Text>
            </Pressable>
            <View style={styles.verificationRow}>
              <TextInput
                style={[inputStyle("verify", invalidFields.includes('verify')), { flex: 1 }]}
                placeholder="Verification Code"
                value={verify}
                onChangeText={setVerify}
                keyboardType="numeric"
              />

              <Pressable
                style={styles.verifyButton}
                onPress={handleVerifyOtp}
              >
                <Text style={{ color: "white", fontWeight: "bold"}}>Verify</Text>
              </Pressable>
            </View>

            {otpMessage ? (
              <Text
                style={{ color: otpSuccess ? "green" : "red", marginTop: 5 }}
              >
                {otpMessage}
              </Text>
            ) : null}

            <Text style={styles.label}>PIN</Text>
            <TextInput
              style={inputStyle("password", invalidFields.includes("password"))}
              placeholder="Gumawa ng PIN"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={inputStyle("password", invalidFields.includes("password"))}
              placeholder="Kumpirmahin ang PIN"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.alertContainer}>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              {success ? <Text style={styles.success}>{success}</Text> : null}
              {errorMessages.length > 0 && (
                <View>
                  {errorMessages.map((msg, index) => (
                    <Text key={index} style={{ color: "red", marginBottom: 3 }}>
                      {msg}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.buttons}>
          <Pressable
            style={styles.buttonWithText}
            onPress={handleSubmit}
            disabled={!isFormComplete}
          >
            <Text
              style={[styles.buttonText, { opacity: isFormComplete ? 1 : 0.5 }]}
            >
              ISUMITE
            </Text>
            <Image
              source={require("../assets/STARTer/Farmer Verification/next-page.png")}
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    top: "2%",
    height: height * 0.70,
    width: width * 0.8,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  backPosition: {
    position: "absolute",
    width: height * 0.03,
    height: height * 0.03,
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.032,
  },
  backIcon: {
    height: "100%",
    width: "100%",
  },

  textSection: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  mainText: {
    textAlign: "center",
    fontSize: RFValue(25),
    fontFamily: "Roboto-Bold",
  },
  subText: {
    textAlign: "center",
    fontSize: RFValue(17),
    width: width * 0.8,
  },
  greenContainer: {
    flex: 5,
    width: width * 1.16,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: "#000",
    shadowOpacity: 0.51,
    shadowRadius: 8.7,
    shadowOffset: { width: 17, height: 4 },
    elevation: 4,
    zIndex: 2,
    alignSelf: "center",
  },
  content: {
    width: "100%",
    maxWidth: 338,
    alignSelf: "center",
    elevation: 10,
  },
  buttons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: width * 0.8,
    height: 47,
    bottom: 25,
    alignSelf: "center",
  },
  buttonWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonIcon: {
    width: 29,
    height: 29,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: "white",
  },
  top: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 15,
    color: "black",
    fontFamily: "Roboto-Regular",
    marginTop: 5,
    maxWidth: "85%",
  },
  imageButton: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "white",
    fontFamily: "Roboto-Bold",
    marginBottom: 6,
    marginTop: 16,
  },
  imageButton2: {
    width: 30,
    height: 30,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginLeft: 10,
  },
  success: {
    color: "green",
    fontSize: 14,
    marginLeft: 10,
  },
  alertContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  verificationRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  verifyButton: {
    backgroundColor: "#10AF7C",
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
    marginTop: -10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    fontSize: 14,
    fontFamily: "Roboto-Bold",      
  },
});
