import React from "react";
import Container from "components/Container";
import { Header2, SubBodyLightText } from "components/StyledText";
import { Box } from "react-native-magnus";
import { ConfirmedPlansStackList, MeetingProps } from "types/types";
import { RouteProp, useRoute } from "@react-navigation/core";

const Plan = () => {
  const route =
    useRoute<RouteProp<ConfirmedPlansStackList, "IndividualPlan">>();
  const { meeting } = route.params;
  return (
    <Container>
      <Box>
        <Header2>Plan Screen</Header2>
        <SubBodyLightText>{JSON.stringify(meeting, null, 2)}</SubBodyLightText>
      </Box>
    </Container>
  );
};

export default Plan;
