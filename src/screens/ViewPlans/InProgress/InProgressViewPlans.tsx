import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { meetingsData } from "constants/mockdata";
import { FlatList, SectionList } from "react-native";
import { styles } from "./styles";

import { Subheading } from "components/StyledText";
import { useAuth } from "lib/auth";
import { MeetingCardProps } from "../MeetingCard/MeetingCard";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { ViewPlansTabParamList } from "types/types";
import { getAllMeetingDataForUser } from "lib/api/meetup";
import { formatDataForFlatListInProgress } from "../helper";
import Loading from "components/Loading";

const InProgressViewPlans = () => {
  const authData = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [meetingsData, setMeetingsData] = React.useState<MeetingCardProps[]>(
    []
  );

  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<ViewPlansTabParamList, "InProgress">
    >();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setIsLoading(true);

      // console.log(`getting meeting data for ${authData.userData.uid}`);
      const result = await getAllMeetingDataForUser(authData.userData.uid);
      // console.log("Got all meetings already");
      const output = formatDataForFlatListInProgress(result);
      setMeetingsData(output);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => {
    return <MeetingCard {...item} accent />;
  };

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  return (
    <Container>
      <FlatList<MeetingCardProps>
        data={meetingsData}
        style={styles.scrollViewContainer}
        keyExtractor={(item, index) => item.meetingInfo.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default InProgressViewPlans;
