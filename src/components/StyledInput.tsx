import React from "react";
import { theme } from "constants/theme";
import { Input } from "react-native-magnus";
import { InputProps } from "react-native-magnus";
import { PhosphorIcon } from "constants/Icons";

export const UnderlinedInput = (props: InputProps) => {
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

interface SearchInputProps extends InputProps {
  inputPlaceholder: string;
  onChangeText: (text: string) => void;
  value: string;
  showPrefix?: boolean;
}
export const SearchInput = ({
  inputPlaceholder,
  onChangeText,
  value,
  showPrefix,
  ...rest
}: SearchInputProps) => {
  return (
    <Input
      h={32}
      py={0}
      px={20}
      my={0}
      textAlignVertical="center"
      placeholder={inputPlaceholder}
      focusBorderColor="blue700"
      prefix={
        showPrefix && (
          <PhosphorIcon
            name="magnifying-glass"
            color={theme.colors.textgray200}
            size={14}
          />
        )
      }
      borderColor={theme.colors.linegray}
      borderWidth={1.5}
      onChangeText={onChangeText}
      value={value}
      fontFamily="inter-regular"
      fontSize={13}
      {...rest}
    />
  );
};
