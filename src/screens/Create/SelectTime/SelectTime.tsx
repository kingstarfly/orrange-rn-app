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
  const { width, height } = useWindowDimensions();

  return (
    <Container avoidHeader>
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
