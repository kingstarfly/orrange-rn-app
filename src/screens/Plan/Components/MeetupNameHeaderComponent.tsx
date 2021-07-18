import { Heading } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { View, Text } from "react-native";
import { Div, DivProps } from "react-native-magnus";

interface Props extends DivProps {
  title: string;
}
const MeetupNameHeaderComponent = ({ title, ...rest }: Props) => {
  return (
    <Div
      row
      h={32}
      justifyContent="center"
      alignItems="flex-start"
      borderBottomColor={theme.colors.primary800}
      borderBottomWidth={1}
      {...rest}
    >
      <Heading numberOfLines={1}>{title}</Heading>
    </Div>
  );
};

export default MeetupNameHeaderComponent;
