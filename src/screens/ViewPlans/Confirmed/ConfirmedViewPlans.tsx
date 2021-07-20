import React from "react";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { SectionList } from "react-native";
import { styles } from "./styles";
import { Box, Button } from "react-native-magnus";
import { useAuth } from "lib/auth";
import { BodyTextRegular, Heading, Subheading } from "components/StyledText";
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
    setIsLoading(true);
    try {
      await fetchConfirmedPlans();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("Refetching confirmed screen");
      await fetchConfirmedPlans();
    });

    return unsubscribe;
  }, []);

  const listEmptyComponent = (
    <Box justifyContent="center" alignItems="center" h="100%">
      <BodyTextRegular>You have no confirmed plans!</BodyTextRegular>
    </Box>
  );

  return (
    <Container style={{ paddingTop: 10 }}>
      <SectionList<MeetingCardProps, ViewPlansSectionData>
        style={styles.scrollViewContainer}
        sections={meetingsData} // enter data here
        keyExtractor={(item) => item.meetingInfo.id}
        renderItem={({ item }) => {
          return <MeetingCard {...item} accent isConfirmed={true} />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Heading textTransform="capitalize">{title}</Heading>
        )}
        SectionSeparatorComponent={() => <Box h={10} />}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={isLoading}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={{ flex: 1 }}
      />

      {/* <Button onPress={() => authData.signOut()}>Sign out</Button> */}
    </Container>
  );
};

export default ConfirmedViewPlans;
