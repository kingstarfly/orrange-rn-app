import React from "react";
import { SmallText } from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import { Box } from "react-native-magnus";
import { TouchableHighlight } from "react-native";

const InviteTootleButton = () => {
  return (
    <Box
      p={6}
      rounded={4}
      // bg={theme.colors.primary400}
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <SmallText pr={4}>Invite to Tootle</SmallText>
      <PhosphorIcon
        name="paper-plane-tilt"
        size={10}
        color={theme.colors.textdark}
      ></PhosphorIcon>
    </Box>
  );
};

export default InviteTootleButton;
