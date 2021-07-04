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
import { UnderlinedInput } from "components/StyledInput";
import PalsListSelect from "./AddFriends";

const MeetupDetails = ({
  navigation,
}: StackScreenProps<CreateMeetupStackParamList, "MeetupDetails">) => {
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");

  const handleConfirm = () => {
    navigation.push("SelectDates", { meetupName: name });
  };

  return (
    <Container>
      <Box px={16} justifyContent="space-between" flex={1}>
        <Box py="2xl">
          <Heading>Create New Plan</Heading>
        </Box>
        <Box flex={1}>
          <UnderlinedInput
            px={0}
            py="sm"
            placeholder="Name Your Meetup!"
            value={name}
            onChangeText={setName}
          />
        </Box>

        <Box flex={5} mb={height * 0.1}>
          <Subheading>Add your pals!</Subheading>
          <PalsListSelect />
        </Box>
      </Box>

      <StyledButton
        onPress={handleConfirm}
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
