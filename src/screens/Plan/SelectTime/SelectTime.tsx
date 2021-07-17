import React from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Box, WINDOW_HEIGHT } from "react-native-magnus";
import Container from "components/Container";

import {
  CreateMeetupStackParamList,
  DayTimings,
  DiscussDetailsStackParamList,
  PreferredDuration,
} from "types/types";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CaptionText } from "components/StyledText";
import LargeButton from "components/LargeButton";
import DateTimeRowComponent from "components/DateTimeRowComponent";
import {
  addPreferredDuration,
  deletePreferredDuration,
  getMeetupTimings,
  getPreferredDurations,
} from "lib/api/meetup";
import { useAuth } from "lib/auth";
import { addHours, isBefore, parseISO } from "date-fns";
import HeaderComponent from "screens/Plan/Components/SectionHeaderComponent";
import MainTimeGridSelector from "./TimeGridSelector/MainTimeGridSelector";
import Loading from "components/Loading";
import { isAfter } from "date-fns/esm";

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

  const route = useRoute<RouteProp<DiscussDetailsStackParamList, "PickTime">>();
  const { meetupId } = route.params;
  const authData = useAuth();

  const [meetupTimings, setMeetupTimings] = React.useState<DayTimings[]>([]);
  const [preferredDurations, setPreferredDurations] = React.useState<
    PreferredDuration[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isEditMode, setIsEditMode] = React.useState(false);

  const fetchAndSetData = React.useCallback(async () => {
    // get the data on meetupTimings to render on calendar Grid
    const timings = await getMeetupTimings(meetupId);
    setMeetupTimings(timings);

    // get data to render the datetimerow picker
    const resp = await getPreferredDurations(meetupId, authData.userData.uid);
    setPreferredDurations(resp);
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchAndSetData();
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

  const onAddPreferredDuration = async (startTime: Date, endTime: Date) => {
    if (!startTime || !endTime || isAfter(startTime, endTime)) {
      Alert.alert("", "Please input a valid time period.");
      return;
    }
    Alert.alert(
      "",
      "Do you want to add this timing?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add",
          onPress: async () => {
            // Construct preferredDuration object
            const preferredDuration: PreferredDuration = {
              username: authData.userData.username,
              startAt: startTime.toISOString(),
              endAt: endTime.toISOString(),
            };
            try {
              await addPreferredDuration(
                preferredDuration,
                meetupId,
                authData.userData.uid
              );
            } catch (error) {
              Alert.alert("", error.message);
            }

            // Refresh all data
            await fetchAndSetData();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onDeletePreferredDuration = async (startTime: Date, endTime: Date) => {
    Alert.alert(
      "",
      "Do you want to delete this timing?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // Construct preferredDuration object
            const preferredDuration: PreferredDuration = {
              username: authData.userData.username,
              startAt: startTime.toISOString(),
              endAt: endTime.toISOString(),
            };

            try {
              await deletePreferredDuration(
                preferredDuration,
                meetupId,
                authData.userData.uid
              );
            } catch (error) {
              Alert.alert("", error.message);
            }
            // Refresh all data
            await fetchAndSetData();
          },
        },
      ],
      { cancelable: true }
    );
  };

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
            start={null}
            end={null}
            onButtonPress={(startTime: Date, endTime: Date) =>
              onAddPreferredDuration(startTime, endTime)
            }
            rightButtonType="add"
          />
        </Box>
        <Box mt={28}>
          <HeaderComponent title="My timings" rightComponent={rightComponent} />
          {!isLoading ? (
            preferredDurations ? (
              <Box>
                {preferredDurations?.map((preferredDuration, index) => {
                  return (
                    <DateTimeRowComponent
                      key={index}
                      start={parseISO(preferredDuration.startAt)}
                      end={parseISO(preferredDuration.endAt)}
                      rightButtonType={isEditMode ? "delete" : null}
                      onButtonPress={(startTime: Date, endTime: Date) =>
                        onDeletePreferredDuration(startTime, endTime)
                      }
                    />
                  );
                })}
              </Box>
            ) : (
              <Box alignItems="center">
                <CaptionText>You have not entered a time</CaptionText>
              </Box>
            )
          ) : (
            <Loading />
          )}
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
