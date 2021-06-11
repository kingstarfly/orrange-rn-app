import React from "react";
import { View, Text } from "react-native";
import Container from "./Container";
import TootleLogo from "assets/icons/tootle.svg";
import { WINDOW_WIDTH } from "react-native-magnus";

const AppLogo = () => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: WINDOW_WIDTH,
          // backgroundColor: "red",
        }}
      >
        <TootleLogo width={80} height={30} />
      </View>
    </Container>
  );
};

export default AppLogo;
