import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Box, Button, Icon, Input, Text } from "react-native-magnus";
import { RootStackParamList } from "types/types";
import Container from "components/Container";
import { theme } from "constants/theme";
import StyledButton from "components/StyledButton";
import { BodyText, Header3 } from "components/StyledText";
import { useWindowDimensions } from "react-native";
import { StyledInput } from "components/StyledInput";

const MeetupDetails = ({
  navigation,
}: StackScreenProps<RootStackParamList, "MeetupDetails">) => {
  // const;
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");

  return (
    <Container>
      <Box px={16}>
        <Box mb={height * 0.1}>
          <Header3>Name your meetup!</Header3>
          <StyledInput placeholder="..." value={name} onChangeText={setName} />
        </Box>

        <Box mb={height * 0.1}>
          <Header3>Add your pals!</Header3>
          <Text>Friend invite component TODO</Text>
        </Box>
      </Box>

      <StyledButton
        onPress={() => navigation.push("SelectDates")}
        bg={theme.colors.primary400}
        position="absolute"
        bottom={25}
      >
        Confirm
      </StyledButton>
    </Container>
  );
};

export default MeetupDetails;
