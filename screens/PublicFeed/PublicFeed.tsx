import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "../../components/BottomNavBar";
import Container from "../../components/Container";
import { RootStackParamList } from "../../types";

const PublicFeed = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PublicFeed">) => {
  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="textdark" fontFamily="poppins-regular">
          Public Feed
        </Text>

        <BottomNavBar>
          <Button
            onPress={() => navigation.push("ViewPlans")}
            bg="backgroundlight"
            alignSelf="center"
            color="textdark"
          >
            View Plans
          </Button>
          <Button
            onPress={() => navigation.push("CreatePlan")}
            bg="backgroundlight"
            alignSelf="center"
            color="textdark"
          >
            Create Plan
          </Button>
        </BottomNavBar>
      </Box>
    </Container>
  );
};

export default PublicFeed;
