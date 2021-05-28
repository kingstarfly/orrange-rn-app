import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "components/BottomNavBar";
import Container from "components/Container";
import MeetingCard from "components/MeetingCard";
import { meetDataOne, meetingsData } from "constants/mockdata";
import { RootStackParamList } from "types/types";
import { SectionList } from "react-native";
import { styles } from "./styles";
import AddButton from "components/AddButton";

const ViewPlans = ({
  navigation,
}: StackScreenProps<RootStackParamList, "ViewPlans">) => {
  return (
    <Container>
      {/* <Box flex={1} justifyContent="flex-start" alignItems="stretch">
        <Text>View Plans</Text>
        <MonthSection meetings={meetingsData} />
        <MeetingCard meeting={meetDataOne} />
      </Box> */}

      <SectionList
        style={styles.scrollViewContainer}
        sections={meetingsData}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <MeetingCard meeting={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            mt={30}
            textTransform="uppercase"
            fontSize={24}
            fontFamily="inter-regular"
          >
            {title}
          </Text>
        )}
      />
      {/* Scroll View of each month */}
      {/* Within each month, there are cards for each meeting */}

      <AddButton to="MeetupDetails" />
    </Container>
  );
};

export default ViewPlans;
