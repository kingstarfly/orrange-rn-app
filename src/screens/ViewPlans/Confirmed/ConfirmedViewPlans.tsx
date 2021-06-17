import React from "react";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { SectionList } from "react-native";
import { styles } from "./styles";
import { Button } from "react-native-magnus";
import { useAuth } from "lib/auth";
import { Heading2 } from "components/StyledText";
import { MeetingCardProps } from "../MeetingCard/MeetingCard";

interface SectionListData {
  title: string; // the month and year
  data: MeetingCardProps[];
}

const ConfirmedViewPlans = () => {
  const authData = useAuth();

  const [meetingsData, setMeetingsData] = React.useState<SectionListData[]>();

  React.useEffect(() => {
    // retrieve all data for meetings related to this user here. worry about lazy fetching in future
  }, []);

  return (
    <Container>
      <SectionList<MeetingCardProps, SectionListData>
        style={styles.scrollViewContainer}
        sections={meetingsData} // enter data here
        keyExtractor={(item, index) => item.meetingInfo.id}
        renderItem={({ item }) => {
          return <MeetingCard {...item} accent />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Heading2 textTransform="uppercase" mt={20}>
            {title}
          </Heading2>
        )}
      />

      <Button onPress={() => authData.signOut()}>Sign out</Button>
    </Container>
  );
};

export default ConfirmedViewPlans;
