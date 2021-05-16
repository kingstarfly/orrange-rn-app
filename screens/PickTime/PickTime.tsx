import { StackScreenProps } from "@react-navigation/stack";
import { DATE_FORMAT } from "components/DatePicker";
import Day from "components/TimeGridSelector/Day";
import { compareAsc, compareDesc, parse } from "date-fns";
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

  const dateStrings = Object.keys(selected);
  dateStrings.sort((a, b) =>
    compareDesc(
      parse(a, DATE_FORMAT, new Date()),
      parse(b, DATE_FORMAT, new Date())
    )
  );

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
      <Box flex={1} alignItems="center" row>
        {dateStrings.map((dateString, index) => {
          return (
            <Day
              key={index}
              date={parse(dateString, DATE_FORMAT, new Date())}
              startTime={8}
              endTime={22}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default PickTime;
