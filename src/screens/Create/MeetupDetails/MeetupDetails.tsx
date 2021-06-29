import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Box } from "react-native-magnus";
import { CreateMeetupStackParamList } from "types/types";
import Container from "components/Container";
import { theme } from "constants/theme";
import StyledButton from "components/StyledButton";
import {
  CaptionText,
  Heading,
  Subheading,
  BodyTextRegular,
} from "components/StyledText";
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
          <Heading>Create New Plan</Heading>
        </Box>
        <Box flex={1}>
          <Subheading opacity={0.5}>Name your meetup!</Subheading>
          <StyledInput
            px={0}
            py="sm"
            placeholder="..."
            value={name}
            onChangeText={setName}
          />
        </Box>

        <Box flex={5} mb={height * 0.1}>
          <Subheading opacity={0.5}>Add your pals!</Subheading>
          <AddFriends />
        </Box>
      </Box>

      <StyledButton
        onPress={() => navigation.push("SelectDates")}
        bg={theme.colors.primary400}
        position="absolute"
        bottom={height * 0.03}
      >
        Confirm
      </StyledButton>
    </Container>
  );
};

export default MeetupDetails;
