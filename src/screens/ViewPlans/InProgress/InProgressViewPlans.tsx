import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Box, Button, Text } from "react-native-magnus";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { meetingsData } from "constants/mockdata";
import { FlatList, SectionList } from "react-native";
import { styles } from "./styles";

import { BodyTextRegular, Subheading } from "components/StyledText";
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

  const fetchInProgressPlans = React.useCallback(async () => {
    setIsLoading(true);
    // console.log(`getting meeting data for ${authData.userData.uid}`);
    const result = await getAllMeetingDataForUser(authData.userData.uid);
    // console.log("Got all meetings already");
    const output = formatDataForFlatListInProgress(result);
    setMeetingsData(output);
    setIsLoading(false);
  }, [authData.userData.uid]);

  const onRefresh = React.useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchInProgressPlans();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("Refetching in progress screen");
      await fetchInProgressPlans();
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => {
    return <MeetingCard {...item} accent isConfirmed={false} />;
  };

  const listEmptyComponent = (
    <Box justifyContent="center" alignItems="center" h="100%">
      <BodyTextRegular>You have no plans in progress!</BodyTextRegular>
    </Box>
  );
  return (
    <Container style={{ paddingTop: 10 }}>
      <FlatList<MeetingCardProps>
        style={styles.scrollViewContainer}
        data={meetingsData}
        keyExtractor={(item) => item.meetingInfo.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={isLoading}
        ListEmptyComponent={listEmptyComponent}
      />
    </Container>
  );
};

export default InProgressViewPlans;
