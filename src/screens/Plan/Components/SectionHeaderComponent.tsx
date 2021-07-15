import { Subheading } from "components/StyledText";
import React from "react";
import { Box, DivProps, Text } from "react-native-magnus";

interface Props extends DivProps {
  leftIcon?: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
}

const HeaderComponent = ({
  leftIcon,
  title,
  rightComponent,
  ...rest
}: Props) => {
  return (
    <Box
      row
      h={32}
      mb={12}
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      {leftIcon}
      <Subheading>{title}</Subheading>
      {rightComponent}
    </Box>
  );
};

export default HeaderComponent;
