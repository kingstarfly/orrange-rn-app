import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Text } from "react-native-magnus";
import Container from "components/Container";
import MainTimeGridSelector from "screens/Create/SelectTime/TimeGridSelector/MainTimeGridSelector";
import StyledButton from "components/StyledButton";

import { theme } from "constants/theme";
import { CreateMeetupStackParamList } from "types/types";
import { StackScreenProps } from "@react-navigation/stack";

const SelectTime = ({
  navigation,
}: StackScreenProps<CreateMeetupStackParamList, "SelectTime">) => {
  const fake = [
    { "2021-07-16T06:00:00.000Z": 0 },
    { "2021-07-16T06:30:00.000Z": 1 },
    { "2021-07-16T07:00:00.000Z": 2 },
    { "2021-07-16T07:30:00.000Z": 2 },
    { "2021-07-16T08:00:00.000Z": 3 },
    { "2021-07-16T08:30:00.000Z": 3 },
    { "2021-07-16T09:00:00.000Z": 4 },
    { "2021-07-16T09:30:00.000Z": 5 },
    { "2021-07-16T10:00:00.000Z": 5 },
    { "2021-07-16T10:30:00.000Z": 5 },
    { "2021-07-16T11:00:00.000Z": 6 },
    { "2021-07-16T11:30:00.000Z": 6 },
    { "2021-07-16T12:00:00.000Z": 7 },
    { "2021-07-16T12:30:00.000Z": 7 },
  ];

  return (
    <Container avoidHeader>
      {/* Should take in an array of objects with all start times of each half grid as keys, then value is the count of overlap.  */}
      <MainTimeGridSelector />

      <Box
        position="absolute"
        bottom={25}
        justifyContent="space-around"
        flexDir="row"
        w="100%"
      >
        <StyledButton
          onPress={() => navigation.push("MeetupDetails")}
          bg={theme.colors.gray5}
        >
          Skip for now
        </StyledButton>

        <StyledButton
          onPress={() => navigation.push("MeetupDetails")}
          bg={theme.colors.primary400}
        >
          Confirm
        </StyledButton>
      </Box>
    </Container>
  );
};

export default SelectTime;
