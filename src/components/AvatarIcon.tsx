import { theme } from "constants/theme";
import { getInitials } from "lib/helpers";
import React from "react";
import { ImageSourcePropType, ImageURISource } from "react-native";
import { Avatar, Box, Image } from "react-native-magnus";
import { BodyTextRegular, TinyText } from "./StyledText";

interface AvatarIcon {
  uri?: string;
  label?: string;
}

const AvatarIcon: React.FC<AvatarIcon> = ({ uri, label }) => {
  return (
    <Box>
      {uri ? (
        <Image
          h={50}
          w={50}
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
