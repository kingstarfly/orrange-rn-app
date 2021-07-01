import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Box, Text, WINDOW_HEIGHT } from "react-native-magnus";
import Container from "components/Container";
import MainTimeGridSelector from "screens/Create/SelectTime/TimeGridSelector/MainTimeGridSelector";
import StyledButton from "components/StyledButton";

import { theme } from "constants/theme";
import {
  CreateMeetupStackParamList,
  DayTimings,
  MeetupFields,
} from "types/types";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { firestore } from "lib/firebase";
import { Subheading } from "components/StyledText";
import LargeButton from "components/LargeButton";

const SelectTime = ({
  navigation,
}: StackScreenProps<CreateMeetupStackParamList, "SelectTime">) => {
  const fake = [
    { "2021-07-16T06:00:00.000Z": 0 },
    { "2021-07-16T06:30:00.000Z": 1 },
    { "2021-07-16T07:00:00.000Z": 2 },
    { "2021-07-16T07:30:00.000Z": 2 },
    { "2021-07-16T08:00:00.000Z": 3 },
    { "2021-07-16T08:30:00.000Z": 3 },
    { "2021-07-16T09:00:00.000Z": 4 },
    { "2021-07-16T09:30:00.000Z": 5 },
    { "2021-07-16T10:00:00.000Z": 5 },
    { "2021-07-16T10:30:00.000Z": 5 },
    { "2021-07-16T11:00:00.000Z": 6 },
    { "2021-07-16T11:30:00.000Z": 6 },
    { "2021-07-16T12:00:00.000Z": 7 },
    { "2021-07-16T12:30:00.000Z": 7 },
  ];

  const route = useRoute<RouteProp<CreateMeetupStackParamList, "SelectTime">>();
  const { meetupId } = route.params;

  // on focus, query from firebase meetupTimings, to decide how to display the time grid.
  const [meetupTimings, setMeetupTimings] = React.useState<DayTimings[]>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // do something
      const meetupDoc = firestore.collection("meetups").doc(meetupId);
      const query = await meetupDoc.get();
      const timings = query.data().meetupTimings;
      // console.log("Timings are:...");
      // console.log(timings);
      setMeetupTimings(timings);
    });

    return unsubscribe;
  }, []);

  return (
    <Container avoidHeader>
      <ScrollView style={styles.scrollViewContainer}>
        <Box h={WINDOW_HEIGHT * 0.6}>
          <MainTimeGridSelector meetupTimings={meetupTimings} />
        </Box>

        <Subheading>Add available time</Subheading>
        {/* 
    // todo: Integrate Chris' Date-time-selector component into common components, and add it here in this screen.
    */}
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
        <Subheading>My timings</Subheading>
      </ScrollView>
      <Box alignItems="center" bottom={0} py={20} bg="transparent">
        <LargeButton title="CONFIRM" onPress={() => console.log("Confirmed")} />
      </Box>
    </Container>
  );
};

export default SelectTime;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
});
