import React from "react";
import Container from "components/Container";
import { Heading2, SmallText } from "components/StyledText";
import { Box } from "react-native-magnus";
import { RootStackParamList } from "types/types";
import { RouteProp, useRoute } from "@react-navigation/core";

const FinalDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FinalDetails">>();
  const { meeting } = route.params;
  return (
    <Container>
      <Box>
        <Heading2>Plan Screen</Heading2>
        <SmallText>{JSON.stringify(meeting, null, 2)}</SmallText>
      </Box>
    </Container>
  );
};

export default FinalDetailsScreen;
