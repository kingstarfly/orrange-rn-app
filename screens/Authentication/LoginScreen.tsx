import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import CountryPicker, {
  CountryCode,
  Country,
  CallingCode,
} from "react-native-country-picker-modal";
import { firebaseApp, firebaseConfig } from "lib/firebase";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import Container from "components/Container";
import { Box } from "react-native-magnus";

export default function LoginScreen() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Login">>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const recaptchaVerifier = useRef(null);
  const [countryCode, setCountryCode] = useState<CountryCode>("SG");
  const [country, setCountry] = useState<Country>(null);
  const [callingCode, setCallingCode] = useState<CallingCode>("+65");
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);
  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0] ? `+${country.callingCode[0]}` : "");
    setCountry(country);
  };
  let testing = true;

  const onLoginPress = () => {
    const phoneProvider = new firebaseApp.auth.PhoneAuthProvider();
    if (phoneNumber.length < 4 || phoneNumber.length > 12) {
      alert("Please enter a valid phone number");
      return;
    }

    navigation.push("Verify", { verificationId: "123123" });

    const fullNumber = callingCode + phoneNumber;

    if (testing) {
      navigation.push("Verify");
    } else {
      phoneProvider
        .verifyPhoneNumber(fullNumber, recaptchaVerifier.current)
        .then((verificationId) => {
          console.log("Verified");
          console.log(verificationId);
          navigation.replace("Verify", {
            verificationId,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <Box flex={1}>
        {!testing && (
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={false}
          />
        )}
        <View style={styles.phoneContainer}>
          <CountryPicker
            containerButtonStyle={styles.countryPicker}
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            visible={false}
          />
          <TextInput
            style={styles.phoneCc}
            editable={false}
            selectTextOnFocus={false}
            value={callingCode}
          />
          <TextInput
            keyboardType={"phone-pad"}
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Send code</Text>
        </TouchableOpacity>
      </Box>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneCc: {
    textAlign: "center",
    width: 80,
    height: 48,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    color: "#aaaaaa",
    borderRightWidth: 1.5,
    borderColor: "#f1f2f1",
    fontSize: 16,
  },
  countryPicker: {},
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    flex: 1,
    height: 48,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
