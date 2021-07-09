import React from "react";
import WordLogo from "assets/images/Orrange_word_logo_512x118.png";
import { Image } from "react-native";
import { Text } from "react-native";

const AppLogo = () => {
  return <Image source={WordLogo} style={{ width: 512, height: 118 }} />;
};

export default AppLogo;
