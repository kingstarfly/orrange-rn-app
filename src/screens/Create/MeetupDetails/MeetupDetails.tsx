import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Box, WINDOW_HEIGHT } from "react-native-magnus";
import { CreateMeetupStackParamList } from "types/types";
import Container from "components/Container";
import { theme } from "constants/theme";
import StyledButton from "components/StyledButton";
import { Heading, Subheading } from "components/StyledText";
import { useWindowDimensions, Alert } from "react-native";
import { UnderlinedInput } from "components/StyledInput";
import PalsListSelect from "./PalsListSelect";
import LargeButton from "components/LargeButton";

const MeetupDetails = ({
  navigation,
}: StackScreenProps<CreateMeetupStackParamList, "MeetupDetails">) => {
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");

  const handleConfirm = () => {
    if (name.length < 4) {
      Alert.alert(
        "",
        "Plan name should be longer than 4 characters!",
        [
          {
            text: "Done",
          },
        ],
        { cancelable: true }
      );
      return;
    }
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
            maxLength={28}
          />
        </Box>

        <Box flex={5} mb={height * 0.1}>
          <Subheading>Add your pals!</Subheading>
          <PalsListSelect />
        </Box>
      </Box>

      <Box bottom={WINDOW_HEIGHT * 0.02} position="absolute" alignSelf="center">
        <LargeButton onPress={handleConfirm} title="Confirm">
          Confirm
        </LargeButton>
      </Box>
    </Container>
  );
};

export default MeetupDetails;
