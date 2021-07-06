import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Box, Text, WINDOW_HEIGHT } from "react-native-magnus";
import Container from "components/Container";
import MainTimeGridSelector from "screens/Create/SelectTime/TimeGridSelector/MainTimeGridSelector";
import StyledButton from "components/StyledButton";

import { theme } from "constants/theme";
import {
  CreateMeetupStackParamList,
  DayTimings,
  MeetupFields,
  ParticipantFields,
  PreferredDuration,
} from "types/types";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { firestore } from "lib/firebase";
import { CaptionText, Subheading } from "components/StyledText";
import LargeButton from "components/LargeButton";
import DateTimeRowComponent from "components/DateTimeRowComponent";
import { getMeetupTimings, getPreferredDurations } from "lib/api/meetup";
import { useAuth } from "lib/auth";
import { addHours, parseISO } from "date-fns";
import HeaderComponent from "screens/Plan/Components/SectionHeaderComponent";

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
  const authData = useAuth();

  const [meetupTimings, setMeetupTimings] = React.useState<DayTimings[]>([]);
  const [preferredDurations, setPreferredDurations] = React.useState<
    PreferredDuration[]
  >([]);

  const [isEditMode, setIsEditMode] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // get the data on meetupTimings to render on calendar Grid
      const timings = await getMeetupTimings(meetupId);
      setMeetupTimings(timings);

      // get data to render the datetimerow picker
      const resp = await getPreferredDurations(meetupId, authData.userData.uid);
      console.log(resp);
      setPreferredDurations(resp);
    });

    return unsubscribe;
  }, []);

  const handleEditPress = () => {
    setIsEditMode(true);
  };
  const handleDonePress = () => {
    setIsEditMode(false);
  };
  let rightComponent = (
    <TouchableOpacity
      onPress={!isEditMode ? () => handleEditPress() : () => handleDonePress()}
    >
      <CaptionText>{isEditMode ? "Done" : "Edit"}</CaptionText>
    </TouchableOpacity>
  );

  return (
    <Container avoidHeader>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Box h={WINDOW_HEIGHT * 0.5}>
          <MainTimeGridSelector meetupTimings={meetupTimings} />
        </Box>
        <Box mt={28}>
          <HeaderComponent title="Add new timing" />

          <DateTimeRowComponent
            start={new Date()}
            end={addHours(new Date(), 1)}
            rightButtonType="add"
          />
        </Box>
        <Box mt={28}>
          <HeaderComponent title="My timings" rightComponent={rightComponent} />
          {/* 
          // todo: need to map through firestore data here
          */}
          <DateTimeRowComponent
            start={new Date()}
            end={addHours(new Date(), 1)}
            rightButtonType={isEditMode ? "delete" : null}
          />
        </Box>
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
