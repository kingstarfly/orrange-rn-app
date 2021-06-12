import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import { Box, Input, WINDOW_HEIGHT, WINDOW_WIDTH } from "react-native-magnus";
import { Heading1, Heading3 } from "components/StyledText";
import { theme } from "constants/theme";
import LargeButton from "components/LargeButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "lib/auth";

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
  const [withCallingCode, setWithCallingCode] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0] ? `+${country.callingCode[0]}` : "");
    setCountry(country);
  };

  const authData = useAuth();

  // useEffect(() => {
  //   const fn = async () => {
  //     await AsyncStorage.clear();
  //   };
  //   fn();
  // }, []);

  const onLoginPress = () => {
    const phoneProvider = new firebaseApp.auth.PhoneAuthProvider();
    if (phoneNumber.length < 4 || phoneNumber.length > 12) {
      alert("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    const fullNumber = callingCode + phoneNumber;
    phoneProvider
      .verifyPhoneNumber(fullNumber, recaptchaVerifier.current)
      .then((verificationId) => {
        navigation.replace("Verify", {
          verificationId,
        });
      })
      .catch((err) => {
        console.log("Error verifying phone number");
        console.log(err);
      });
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Box flex={1} justifyContent="center" alignItems="center" bg="red200">
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
              attemptInvisibleVerification={false}
            />

            <Box alignSelf="center" w="80%" mb="10%">
              <Heading1 textAlign="center">
                Log in with your phone number
              </Heading1>
            </Box>

            <Box row alignItems="center" justifyContent="center" w="100%">
              <Box
                row
                alignItems="center"
                // borderWidth={1}
                borderColor={theme.colors.linegray}
                rounded="sm"
                // px="sm"
                h={60}
              >
                <CountryPicker
                  containerButtonStyle={{}}
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
              </Box>
              <Box
                row
                alignItems="center"
                borderWidth={1}
                rounded={10}
                bg="white"
                px="md"
              >
                <Heading3>{callingCode}</Heading3>
                <Input
                  keyboardType={"phone-pad"}
                  placeholder="Phone number"
                  placeholderTextColor="#aaaaaa"
                  fontFamily="inter-medium"
                  fontSize={20}
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  underlineColorAndroid="transparent"
                  borderWidth={0}
                  my={1}
                  p={0}
                  w={WINDOW_WIDTH * 0.6}
                />
              </Box>
            </Box>

            <Box position="absolute" bottom={WINDOW_HEIGHT * 0.15}>
              <LargeButton
                loading={loading}
                onPress={() => {
                  Keyboard.dismiss();
                  authData.signOut();
                }}
                title="LOGOUT"
              />
            </Box>

            <Box position="absolute" bottom={WINDOW_HEIGHT * 0.05}>
              <LargeButton
                loading={loading}
                onPress={() => {
                  Keyboard.dismiss();
                  onLoginPress();
                }}
                title="NEXT"
              />
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}
