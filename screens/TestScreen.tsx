import React from "react";
import { Box, Text } from "react-native-magnus";
import ContactList from "screens/Create/MeetupDetails/ContactsList/ContactList";
import { theme } from "constants/theme";
import Container from "components/Container";

const TestScreen = () => {
  return (
    <Container>
      <Box flex={1} alignItems="center">
        {/* <ContactList></ContactList> */}
      </Box>
    </Container>
  );
};

export default TestScreen;
