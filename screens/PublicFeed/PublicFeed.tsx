import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Box, Button, Icon, Text } from "react-native-magnus";
import Container from "../../components/Container";
import { RootStackParamList } from "../../types/types";
import AddButton from "components/AddButton";

const PublicFeed = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PublicFeed">) => {
  const [] = useState([]);

  const handleChange = (e) => {
    console.log("Hi");
    console.log(e);
  };

  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="textdark" fontFamily="poppins-regular">
          Public Feeds
        </Text>

        <AddButton to="SelectDates" />
      </Box>
    </Container>
  );
};

export default PublicFeed;
