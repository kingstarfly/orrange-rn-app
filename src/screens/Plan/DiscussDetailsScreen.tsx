import React from "react";
import Container from "components/Container";
import { Heading2, SmallText } from "components/StyledText";
import { Box } from "react-native-magnus";

import { RouteProp, useRoute } from "@react-navigation/core";
import { RootStackParamList } from "types/types";

const DiscussDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "DiscussDetails">>();
  const { meeting } = route.params;
  return (
    <Container avoidHeader>
      <Heading2>Plan Screen</Heading2>
      <SmallText>{JSON.stringify(meeting, null, 2)}</SmallText>
    </Container>
  );
};

export default DiscussDetailsScreen;
