import { theme } from "constants/theme";
import { getInitials } from "lib/helpers";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Box, Image } from "react-native-magnus";
import { BodyTextRegular, CaptionText, MiniText, TinyText } from "./StyledText";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-community/masked-view";
import { PhosphorIcon } from "constants/Icons";
import { color } from "react-native-reanimated";

interface AvatarIcon {
  uri?: string;
  label?: string;
  diameter?: number;
  withLabel?: boolean;
  blurred?: boolean;
  isHost?: boolean;
  showBorder?: boolean;
}

const AvatarIcon: React.FC<AvatarIcon> = ({
  uri,
  label,
  withLabel,
  diameter = 50,
  blurred,
  isHost,
  showBorder,
}) => {
  const FADE_OPACITY = 0.3;
  return (
    <Box>
      {uri ? (
        <Image
          h={diameter}
          w={diameter}
          rounded="circle"
          source={{ uri }}
          shadow={1}
          borderWidth={showBorder && 3}
          borderColor={showBorder && theme.colors.green}
          style={blurred && { opacity: FADE_OPACITY }}
        />
      ) : (
        <Avatar bg={theme.colors.red} size={0} color={theme.colors.textdark}>
          <BodyTextRegular>{getInitials(label)}</BodyTextRegular>
        </Avatar>
      )}
      {/* {withLabel && (
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
        */}
      {withLabel && (
        <Box row alignItems="center">
          {isHost && (
            <PhosphorIcon
              name="crown-simple-fill"
              color={theme.colors.primary500}
              size={12}
            />
          )}
          <MiniText
            maxW={isHost ? diameter - 14 : diameter}
            numberOfLines={1}
            ellipsizeMode="tail"
            opacity={blurred ? FADE_OPACITY : 1}
            ml={isHost ? 2 : 0}
          >
            {label}
          </MiniText>
        </Box>
      )}
    </Box>
  );
};

export default AvatarIcon;
