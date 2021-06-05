import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "components/BottomNavBar";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { meetDataOne, meetingsData } from "constants/mockdata";
import { RootStackParamList } from "types/types";
import { SectionList } from "react-native";
import { styles } from "./styles";
import AddButton from "components/AddButton";
import { theme } from "constants/theme";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header2 } from "components/StyledText";

const ConfirmedViewPlans = ({
  navigation,
}: StackScreenProps<RootStackParamList, "ViewPlans">) => {
  const renderItem = ({ item }) => {
    return <MeetingCard meeting={item} leftBorder />;
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
          <Header2 textTransform="uppercase" mt={30}>
            {title}
          </Header2>
        )}
      />
      {/* Scroll View of each month */}
      {/* Within each month, there are cards for each meeting */}

      <AddButton to="MeetupDetails" />
    </Container>
  );
};

export default ConfirmedViewPlans;
