import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import Container from "components/Container";
import MeetingCard from "src/screens/ViewPlans/MeetingCard";
import { meetDataOne, meetingsData } from "constants/mockdata";
import { RootStackParamList } from "types/types";
import { SectionList } from "react-native";
import { styles } from "./styles";
import AddButton from "components/AddButton";
import { theme } from "src/constants/theme";
import { StatusBar } from "expo-status-bar";

const InProgressViewPlans = ({
  navigation,
}: StackScreenProps<RootStackParamList, "ViewPlans">) => {
  const renderItem = ({ item }) => {
    return <MeetingCard meeting={item} />;
  };
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
        renderItem={renderItem}
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

export default InProgressViewPlans;
