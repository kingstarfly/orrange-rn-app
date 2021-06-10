import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, useWindowDimensions } from "react-native";
import { Box, Button } from "react-native-magnus";

const BottomNavBar = ({ children }) => {
  // TODO to change to confirm buttons and top left back button instead
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Box
      position="absolute"
      bottom={0}
      w={width}
      h={60}
      bg="primary400"
      row
      justifyContent="space-around"
    >
      {children}
    </Box>
  );
};

export default BottomNavBar;
