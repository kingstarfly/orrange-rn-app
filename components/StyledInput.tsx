import React from "react";
import { theme } from "constants/theme";
import { Input } from "react-native-magnus";
import { TextInputProps } from "react-native";

export const StyledInput = (props: TextInputProps) => {
  return (
    <Input
      borderTopWidth={0}
      borderLeftWidth={0}
      borderRightWidth={0}
      borderColor="black"
      bg={theme.colors.backgroundlight}
      focusBorderColor={theme.colors.primary400}
      {...props}
      color="#000"
      fontSize={14}
      fontFamily="inter-regular"
    />
  );
};
