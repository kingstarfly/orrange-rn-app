import React from "react";
import { Button, ButtonProps, Text } from "react-native-magnus";

const StyledButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      alignSelf="center"
      color="textdark"
      rounded={100}
      w={125}
      h={30}
      {...rest}
    >
      <Text fontFamily="inter-regular" fontSize={14}>
        {children}
      </Text>
    </Button>
  );
};

export default StyledButton;
