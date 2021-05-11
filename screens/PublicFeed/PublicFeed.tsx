import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Icon, Text } from "react-native-magnus";
import Container from "../../components/Container";
import { RootStackParamList } from "../../types";
import AddButton from "components/AddButton";

const PublicFeed = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PublicFeed">) => {
  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="textdark" fontFamily="poppins-regular">
          Public Feeds
        </Text>

        {/* <BottomNavBar>
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
        </BottomNavBar> */}
        <AddButton to="CreatePlan" />
      </Box>
    </Container>
  );
};

export default PublicFeed;
