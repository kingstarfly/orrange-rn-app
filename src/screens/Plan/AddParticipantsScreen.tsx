import React, { useState, useRef } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import Container from "components/Container";
import { Subheading, CaptionText } from "components/StyledText";
import { RouteProp, useRoute } from "@react-navigation/core";
import { Div, WINDOW_HEIGHT } from "react-native-magnus";

import HeaderComponent from "./Components/SectionHeaderComponent";
import {
  AppStackParamList,
  MeetupFields,
  PalFields,
  ParticipantFields,
  PendingParticipantFields,
} from "types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "lib/auth";
import {
  getMeetingInfo,
  getParticipants,
  getPendingParticipants,
} from "lib/api/meetup";
import { getPals } from "lib/api/pals";
import Loading from "components/Loading";
import MeetupNameHeaderComponent from "./Components/MeetupNameHeaderComponent";
import { sectionSpacing } from "constants/Layout";

const AddParticipantsScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, "AddParticipants">>();
  const { meetupId, userUid } = route.params;
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, "AddParticipants">>();
  const authData = useAuth();

  const [meetingInfo, setMeetingInfo] = React.useState<MeetupFields>();
  const [pals, setPals] = React.useState<PalFields[]>();

  const [isLoading, setIsLoading] = React.useState(false);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const fetchPalsToShow = React.useCallback(async () => {
    setIsLoading(true);
    const a = await getMeetingInfo(meetupId);
    const b = await getParticipants(meetupId);
    const c = await getPendingParticipants(meetupId);
    const d = await getPals(userUid);

    // TODO: Do not show already added pals (participants or pending participants).
    const excludeUids = [...b.map((e) => e.uid), ...c.map((e) => e.uid)];
    const palsToShow = d.filter((pal) => {
      // If pal.uid is in excludeUids, return false
      if (excludeUids.some((excludeUid) => excludeUid === pal.uid)) {
        return false;
      } else {
        // Else, return true
        return true;
      }
    });

    setMeetingInfo(a);
    setPals(palsToShow);

    setIsLoading(false);
  }, [meetupId, userUid]);

  // Set up a listener on screen mount
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchPalsToShow();
    });

    return unsubscribe;
  }, []);

  if (isLoading || !meetingInfo) {
    return (
      <Container avoidHeader>
        <Loading />
      </Container>
    );
  }
  return (
    <Container avoidHeader>
      <MeetupNameHeaderComponent title={meetingInfo.name} mb={24} />
    </Container>
  );
};

export default AddParticipantsScreen;
