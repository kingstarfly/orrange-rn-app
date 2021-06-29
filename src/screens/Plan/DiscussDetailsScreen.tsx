import React from "react";
import Container from "components/Container";
import { Subheading, SmallText } from "components/StyledText";
import { RouteProp, useRoute } from "@react-navigation/core";
import { AppStackParamList } from "types/types";

const DiscussDetailsScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, "DiscussDetails">>();
  const { meetingInfo, participants, pendingParticipants } = route.params;
  return (
    <Container avoidHeader>
      <Subheading>Plan Screen</Subheading>
      <SmallText>{JSON.stringify(meetingInfo, null, 2)}</SmallText>
    </Container>
  );
};

export default DiscussDetailsScreen;
