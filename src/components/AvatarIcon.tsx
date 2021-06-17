import React from "react";
import { ImageSourcePropType } from "react-native";
import { Box, Image } from "react-native-magnus";
import { TinyText } from "./StyledText";

interface AvatarIcon {
  source?: ImageSourcePropType;
  label: string;
}

const AvatarIcon: React.FC<AvatarIcon> = ({ source, label }) => {
  return (
    <Box>
      <Image
        h={50}
        w={50}
        rounded="circle"
        borderWidth={2}
        borderColor="white"
        source={source}
        shadow={1}
      />
      <TinyText>{label}</TinyText>
    </Box>
  );
};

export default AvatarIcon;
