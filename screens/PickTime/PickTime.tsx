import { StackScreenProps } from "@react-navigation/stack";
import Day from "components/TimeGridSelector/Day";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Button, Text } from "react-native-magnus";
import { useAppSelector } from "redux/hooks";
import BottomNavBar from "../../components/BottomNavBar";
import Container from "../../components/Container";
import { RootStackParamList } from "../../types";

const PickTime = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PickTime">) => {
  const { width, height } = useWindowDimensions();

  const selected = useAppSelector((state) => state.DatePicker.selected);

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
      {Object.entries(selected).map(([key, value], index) => {
        return <Text key={index}>{key}</Text>;
      })}
      <Box flex={1} alignItems="center">
        <Day date={new Date()} startTime={8} endTime={22} />
      </Box>
    </Container>
  );
};

export default PickTime;
