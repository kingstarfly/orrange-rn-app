import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { meetDataOne, meetingsData } from "constants/mockdata";
import { SectionList } from "react-native";
import { styles } from "./styles";
import AddButton from "components/AddButton";
import { Subheading } from "components/StyledText";

const InProgressViewPlans = () => {
  const renderItem = ({ item }) => {
    return <MeetingCard meeting={item} />;
  };
  return (
    <Container>
      <SectionList
        style={styles.scrollViewContainer}
        sections={meetingsData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Subheading textTransform="uppercase" mt={30}>
            {title}
          </Subheading>
        )}
      />
    </Container>
  );
};

export default InProgressViewPlans;
