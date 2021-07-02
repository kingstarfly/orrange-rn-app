import React from "react";
import { MiniText } from "components/StyledText";
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
      <MiniText>Add pal</MiniText>
    </Box>
  );
};

export default AddPalButton;
