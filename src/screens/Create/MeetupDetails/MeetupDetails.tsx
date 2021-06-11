import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Box } from "react-native-magnus";
import { CreateMeetupStackParamList } from "types/types";
import Container from "components/Container";
import { theme } from "constants/theme";
import StyledButton from "components/StyledButton";
import { Heading2 } from "components/StyledText";
import { useWindowDimensions } from "react-native";
import { StyledInput } from "components/StyledInput";
import AddFriends from "./AddFriends";

const MeetupDetails = ({
  navigation,
}: StackScreenProps<CreateMeetupStackParamList, "MeetupDetails">) => {
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");

  return (
    <Container>
      <Box px={16} justifyContent="space-between" flex={1}>
        <Box py="2xl">
          <Heading2>Create New Plan</Heading2>
        </Box>
        <Box flex={1}>
          <Heading2>Name your meetup!</Heading2>
          <StyledInput
            px={0}
            py="sm"
            placeholder="..."
            value={name}
            onChangeText={setName}
          />
        </Box>

        <Box flex={5} mb={height * 0.1}>
          <Heading2>Add your pals!</Heading2>
          <AddFriends />
        </Box>
      </Box>

      <StyledButton
        onPress={() => navigation.push("SelectDates")}
        bg={theme.colors.primary400}
        position="absolute"
        bottom={height * 0.05}
      >
        Confirm
      </StyledButton>
    </Container>
  );
};

export default MeetupDetails;
