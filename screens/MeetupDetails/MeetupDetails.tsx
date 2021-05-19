import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Box, Button, Icon, Input, Text } from "react-native-magnus";
import { RootStackParamList } from "types";
import Container from "components/Container";
import { theme } from "constants/theme";
import StyledButton from "components/StyledButton";
import { BodyText } from "components/StyledText";

const MeetupDetails = ({
  navigation,
}: StackScreenProps<RootStackParamList, "MeetupDetails">) => {
  return (
    <Container>
      <Box>
        <BodyText>Name your meetup!</BodyText>
        <Input placeholder="..." p={10} focusBorderColor="blue700" />
      </Box>
      <StyledButton
        onPress={() => navigation.push("PickTime")}
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
