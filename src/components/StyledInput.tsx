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
      color={theme.colors.textdark}
      placeholderTextColor={theme.colors.textgray400}
      fontSize={17}
      fontFamily="inter-regular"
      textAlignVertical="bottom"
    />
  );
};
