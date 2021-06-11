import React from "react";
import { SmallText } from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import { Box } from "react-native-magnus";

const AddPalButton = () => {
  return (
    <Box
      p={6}
      rounded={4}
      // bg={theme.colors.primary400}
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <SmallText pr={4}>Add pal</SmallText>
      <PhosphorIcon
        name="user-plus"
        size={10}
        color={theme.colors.textdark}
      ></PhosphorIcon>
    </Box>
  );
};

export default AddPalButton;
