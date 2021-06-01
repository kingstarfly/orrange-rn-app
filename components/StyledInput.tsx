import React from "react";
import { theme } from "constants/theme";
import { Input } from "react-native-magnus";
import { InputProps } from "react-native-magnus";

export const StyledInput = (props: InputProps) => {
  return (
    <Input
      borderTopWidth={0}
      borderLeftWidth={0}
      borderRightWidth={0}
      borderColor={theme.colors.linegray}
      borderBottomWidth={1.2}
      roundedBottom={0}
      bg={theme.colors.backgroundlight}
      focusBorderColor={theme.colors.primary400}
      {...props}
      color="#000"
      fontSize={16}
      fontFamily="inter-regular"
      textAlignVertical="bottom"
    />
  );
};
