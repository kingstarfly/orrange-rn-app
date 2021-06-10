import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Box, Button, Icon, Input, Text } from "react-native-magnus";
import { RootStackParamList } from "types/types";
import Container from "components/Container";
import { theme } from "src/constants/theme";
import StyledButton from "components/StyledButton";
import { BodyText, Header3, Header2 } from "components/StyledText";
import { useWindowDimensions } from "react-native";
import { StyledInput } from "components/StyledInput";
import AddFriends from "./AddFriends";

const MeetupDetails = ({
  navigation,
}: StackScreenProps<RootStackParamList, "MeetupDetails">) => {
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");

  return (
    <Container>
      <Box px={16} justifyContent="space-between" flex={1}>
        <Box py="2xl">
          <Header2>Create New Plan</Header2>
        </Box>
        <Box flex={1}>
          <Header3>Name your meetup!</Header3>
          <StyledInput
            px={0}
            py="sm"
            placeholder="..."
            value={name}
            onChangeText={setName}
          />
        </Box>

        <Box flex={5} mb={height * 0.1}>
          <Header3>Add your pals!</Header3>
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
