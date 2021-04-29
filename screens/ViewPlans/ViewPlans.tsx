import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "../../components/BottomNavBar";
import Container from "../../components/Container";
import MeetingCard from "../../components/ViewPlans/MeetingCard";
import { meetData } from "../../constants/mockdata";
import { RootStackParamList } from "../../types";

const ViewPlans = ({
  navigation,
}: StackScreenProps<RootStackParamList, "ViewPlans">) => {
  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>View Plans</Text>
        <MeetingCard details={meetData} />
      </Box>
      {/* Scroll View of each month */}
      {/* Within each month, there are cards for each meeting */}

      <BottomNavBar>
        <Button
          onPress={() => navigation.goBack()}
          bg="backgroundlight"
          alignSelf="center"
          color="textdark"
        >
          Back
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
    </Container>
  );
};

export default ViewPlans;
