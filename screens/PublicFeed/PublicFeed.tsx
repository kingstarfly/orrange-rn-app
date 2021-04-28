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
        <Text>Public Feed</Text>

        <BottomNavBar>
          <Button
            onPress={() => navigation.push("ViewPlans")}
            alignSelf="stretch"
          >
            View Plans
          </Button>
          <Button
            onPress={() => navigation.push("CreatePlan")}
            alignSelf="stretch"
          >
            Create Plan
          </Button>
        </BottomNavBar>
      </Box>
    </Container>
  );
};

export default PublicFeed;
