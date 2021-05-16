import { StackScreenProps } from "@react-navigation/stack";
import Day from "components/TimeGridSelector/Day";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "../../components/BottomNavBar";
import Container from "../../components/Container";
import { RootStackParamList } from "../../types";

const PickTime = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PickTime">) => {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <Text
        mt={height * 0.1}
        px={width * 0.2}
        textAlign="center"
        fontSize="5xl"
      >
        What are your free time slots?
      </Text>
      <Box flex={1} alignItems="center">
        <Day date={new Date()} startTime={8} endTime={22} />
      </Box>
    </Container>
  );
};

export default PickTime;
