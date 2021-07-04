import { theme } from "constants/theme";
import { getInitials } from "lib/helpers";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Box, Image } from "react-native-magnus";
import { BodyTextRegular, CaptionText } from "./StyledText";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-community/masked-view";

interface AvatarIcon {
  uri?: string;
  label?: string;
  diameter?: number;
  withLabel?: boolean;
}

const AvatarIcon: React.FC<AvatarIcon> = ({
  uri,
  label,
  withLabel,
  diameter = 50,
}) => {
  return (
    <Box>
      {uri ? (
        <Image
          h={diameter}
          w={diameter}
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
      {withLabel && (
        <MaskedView
          maskElement={
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
              locations={[0.8, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          }
        >
          <CaptionText maxW={diameter} numberOfLines={1} ellipsizeMode="clip">
            {label}
          </CaptionText>
        </MaskedView>
      )}
    </Box>
  );
};

export default AvatarIcon;
