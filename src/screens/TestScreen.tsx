import React from "react";
import { Box, Text } from "react-native-magnus";
import Container from "components/Container";
import PhoneAuth from "./Authentication/PhoneAuth/PhoneAuth";
import LoginScreen from "./Authentication/LoginScreen";

const TestScreen = () => {
  return (
    <Container>
      <Box flex={1} alignItems="center">
        <LoginScreen />
      </Box>
    </Container>
  );
};

export default TestScreen;
