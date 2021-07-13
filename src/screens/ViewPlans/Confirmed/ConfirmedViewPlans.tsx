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
  const [meetingsData, setMeetingsData] = React.useState<
    ViewPlansSectionData[]
  >([]);

  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<ViewPlansTabParamList, "Confirmed">
    >();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setIsLoading(true);

      // console.log(`getting meeting data for ${authData.userData.uid}`);
      const result = await getAllMeetingDataForUser(authData.userData.uid);
      // console.log("Got all meetings already");
      const output = formatDataForSectionListConfirmed(result);
      setMeetingsData(output);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  // React.useEffect(() => {
  // (async () => {
  //   console.log("TESTTESTTEST");
  //   const res = await getMeetingInfo("e408619f-2395-453f-993a-46ab465c0f52");
  //   console.log(res);
  // })();
  // retrieve all data for meetings related to this user here. worry about lazy fetching in future
  // getAllMeetingDataForUser(authData.userData.uid);
  // }, []);

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
          return <MeetingCard {...item} accent />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Subheading textTransform="capitalize" mt={20}>
            {title}
          </Subheading>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button onPress={() => authData.signOut()}>Sign out</Button>
    </Container>
  );
};

export default ConfirmedViewPlans;
