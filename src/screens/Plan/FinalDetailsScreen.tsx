import React from "react";
import Container from "components/Container";
import { Subheading, SmallText } from "components/StyledText";
import { Box } from "react-native-magnus";
import { RootStackParamList } from "types/types";
import { RouteProp, useRoute } from "@react-navigation/core";

const FinalDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FinalDetails">>();
  const { meeting } = route.params;
  return (
    <Container>
      <Box>
        <Subheading>Plan Screen</Subheading>
        <SmallText>{JSON.stringify(meeting, null, 2)}</SmallText>
      </Box>
    </Container>
  );
};

export default FinalDetailsScreen;
