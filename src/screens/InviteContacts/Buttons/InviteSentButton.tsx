import React from "react";
import { SmallText } from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import { Box } from "react-native-magnus";

const InviteSentButton = () => {
  return (
    <Box
      p={6}
      rounded={4}
      bg={theme.colors.backgroundlight}
      flexDir="row"
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderColor={theme.colors.linegray}
    >
      <SmallText pr={4}>Invite sent</SmallText>
      <PhosphorIcon
        name="paper-plane-tilt"
        size={10}
        color={theme.colors.textdark}
      ></PhosphorIcon>
    </Box>
  );
};

export default InviteSentButton;
