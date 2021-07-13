import React from "react";
import WordLogo from "assets/images/Orrange_word_logo_512x118.png";
import { Image } from "react-native";
import { Text } from "react-native";

const AppLogo = () => {
  const HEIGHT = 118;
  const WIDTH = 512;

  return (
    <Image
      source={WordLogo}
      style={{ height: 24, aspectRatio: WIDTH / HEIGHT }}
    />
  );
};

export default AppLogo;
