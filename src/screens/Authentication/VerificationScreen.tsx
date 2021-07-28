import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { AuthStackParamList } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "lib/auth";
import Container from "components/Container";
import LargeButton from "components/LargeButton";
import { Box, Div, WINDOW_HEIGHT } from "react-native-magnus";
import { BodyTextRegular, Heading } from "components/StyledText";

const CODE_LENGTH = 6;

export default function VerificationScreen() {
  const route = useRoute<RouteProp<AuthStackParamList, "Verify">>();
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, "Verify">>();
  const authData = useAuth();

  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({
    value: verificationCode,
    cellCount: CODE_LENGTH,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });

  const onVerificationPress = async () => {
    setLoading(true);
    const res = await authData.verify(
      route.params.verificationId,
      verificationCode
    );
    if (!res.success) {
      Alert.alert("", "Wrong verification code");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (verificationCode.length == 6) {
      onVerificationPress();
    }
  }, [verificationCode.length]);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Div
          justifyContent="flex-start"
          alignItems="center"
          mt={WINDOW_HEIGHT * 0.1}
          flex={1}
        >
          <Box alignSelf="center" w="100%" mb={WINDOW_HEIGHT * 0.05}>
            <Heading textAlign="center" mb={40}>
              {route.params.phoneNumberString}
            </Heading>
            <BodyTextRegular textAlign="center">
              A 6-digit code has been sent to you via SMS. Please enter the code
              below.
            </BodyTextRegular>
          </Box>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              <CodeField
                ref={ref}
                {...props}
                value={verificationCode}
                onChangeText={setVerificationCode}
                cellCount={CODE_LENGTH}
                rootStyle={styles.codeFieldRoot}
                keyboardType="numeric"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                  >
                    <Text
                      style={styles.cellText}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
          <Box
            position="absolute"
            bottom={WINDOW_HEIGHT * 0.02}
            alignSelf="center"
          >
            <LargeButton
              title="CONFIRM"
              loading={loading}
              onPress={onVerificationPress}
            />
          </Box>
        </Div>
      </KeyboardAvoidingView>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    width: "80%",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    padding: 10,
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
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 8,
    margin: 5,
    backgroundColor: "white",
  },
  cellText: {
    fontSize: 24,
  },
  focusCell: {
    borderColor: "blue",
  },
});
