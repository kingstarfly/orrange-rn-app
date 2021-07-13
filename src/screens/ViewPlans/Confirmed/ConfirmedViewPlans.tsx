import React from "react";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { SectionList } from "react-native";
import { styles } from "./styles";
import { Button } from "react-native-magnus";
import { useAuth } from "lib/auth";
import { Subheading } from "components/StyledText";
import { MeetingCardProps } from "../MeetingCard/MeetingCard";
import { getAllMeetingDataForUser, getMeetingInfo } from "lib/api/meetup";
import { useNavigation } from "@react-navigation/native";
import { ViewPlansTabParamList } from "types/types";
import Loading from "components/Loading";
import { formatDataForSectionListConfirmed } from "../helper";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export interface ViewPlansSectionData {
  title: string; // the month and year
  data: MeetingCardProps[];
}

const ConfirmedViewPlans = () => {
  const authData = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [meetingsData, setMeetingsData] = React.useState<
    ViewPlansSectionData[]
  >([]);

  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<ViewPlansTabParamList, "Confirmed">
    >();

  const fetchConfirmedPlans = React.useCallback(async () => {
    setIsLoading(true);
    const result = await getAllMeetingDataForUser(authData.userData.uid);
    const output = formatDataForSectionListConfirmed(result);
    setMeetingsData(output);
    setIsLoading(false);
  }, [authData.userData.uid]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchConfirmedPlans();
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    fetchConfirmedPlans();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <SectionList<MeetingCardProps, ViewPlansSectionData>
        style={styles.scrollViewContainer}
        sections={meetingsData} // enter data here
        keyExtractor={(item, index) => item.meetingInfo.id}
        renderItem={({ item }) => {
          return <MeetingCard {...item} accent isConfirmed={true} />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Subheading textTransform="capitalize" mt={20}>
            {title}
          </Subheading>
        )}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />

      <Button onPress={() => authData.signOut()}>Sign out</Button>
    </Container>
  );
};

export default ConfirmedViewPlans;
