import { theme } from "constants/theme";
import { getInitials } from "lib/helpers";
import React from "react";
<<<<<<< HEAD
import { ImageSourcePropType, ImageURISource } from "react-native";
import { Avatar, Box, Image } from "react-native-magnus";
import { BodyTextRegular, TinyText } from "./StyledText";

interface AvatarIcon {
  uri?: string;
  label?: string;
  radius?: number;
  px?: number;
}

const AvatarIcon: React.FC<AvatarIcon> = ({ uri, label , radius=50, px=5}) => {
  return (
    <Box>
      {uri ? (
        <Image
          h={radius}
          w={radius}
          rounded="circle"
          borderWidth={2}
          borderColor="white"
          source={{ uri }}
          shadow={1}
        />
      ) : (
        <Avatar
          bg={theme.colors.primary400}
          size={40}
          color={theme.colors.textdark}
        >
          <BodyTextRegular>{getInitials(label)}</BodyTextRegular>
        </Avatar>
      )}
      {/* <TinyText>{label}</TinyText> */}
    </Box>
  );
};

export default AvatarIcon;
