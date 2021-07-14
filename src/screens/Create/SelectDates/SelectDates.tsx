import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import DatePicker, { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import StyledButton from "components/StyledButton";
import { theme } from "constants/theme";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Button, Text, WINDOW_HEIGHT } from "react-native-magnus";
import Container from "components/Container";
import {
  AppStackParamList,
  CreateMeetupStackParamList,
  DayTimings,
  MarkedDates,
  MeetupFields,
  PendingParticipantFields,
} from "types/types";
import { firestore } from "lib/firebase";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import uuid from "react-native-uuid";
import { useAuth } from "lib/auth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { addMinutes, parse, parseISO, startOfDay } from "date-fns";
import { createMeetup } from "lib/api/meetup";
import { clearSelectedPals } from "redux/slices/SelectedPalsSlice";
import LargeButton from "components/LargeButton";

const SelectDates = () => {
  const { width, height } = useWindowDimensions();

  // Workaround for typescript error?
  const navigation =
    useNavigation<
      StackNavigationProp<AppStackParamList, "MainBottomTabNavigator">
    >();
  const route =
    useRoute<RouteProp<CreateMeetupStackParamList, "SelectDates">>();
  const { meetupName } = route.params;

  const dispatch = useAppDispatch();
  const selectedPals = useAppSelector(
    (state) => state.SelectedPals.selectedPals
  );
  const [selectedDates, setSelectedDates] = React.useState<MarkedDates>({});

  const authData = useAuth();

  const handleConfirmButtonClick = React.useCallback(async () => {
    // obtain id from firestore
    const meetupDoc = firestore.collection("meetups").doc();
    const id = meetupDoc.id;

    // construct meetupTimings
    let meetupTimings = [];
    Object.keys(selectedDates).forEach((isoDate) => {
      const startOfDate = startOfDay(parse(isoDate, DATE_FORMAT, new Date()));
      let startTimingsArr = [...Array(24 * 2).keys()].map((val) =>
        addMinutes(startOfDate, 30 * val).toISOString()
      );
      let startTimingsObj = {};
      for (let i = 0; i < startTimingsArr.length; i++) {
        startTimingsObj[startTimingsArr[i]] = 0;
      }
      let dayTimings = {
        date: startOfDate.toISOString(),
        startTimings: startTimingsObj,
      };
      meetupTimings.push(dayTimings);
    });

    // construct meetupDetails
    const meetupDetails = {
      id: id,
      creatorId: authData.userData.uid,
      creatorUsername: authData.userData.username,
      name: meetupName,
      activity: null, // null refers to unconfirmed
      startAt: null,
      endAt: null,
      meetupTimings: meetupTimings,
    } as MeetupFields;

    // use all information, and create new meetup in firestore
    await createMeetup(meetupDetails, selectedPals, authData.userData);

    // Clear local state of selected dates
    setSelectedDates({});

    // Clear redux information of selected pals
    dispatch(clearSelectedPals());

    // Replace navigation history, (home page --> Discuss details)
    navigation.reset({
      index: 1,
      routes: [
        { name: "MainBottomTabNavigator" },
        {
          name: "DiscussDetails",
          params: {
            meetupId: id,
          },
        },
      ],
    });
  }, []);
  return (
    <Container>
      <Text
        mt={height * 0.1}
        px={width * 0.1}
        textAlign="center"
        fontSize="5xl"
      >
        Which days do you wish to meet on?
      </Text>
      <Box flex={1} alignItems="center">
        <DatePicker
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </Box>

      <Box bottom={WINDOW_HEIGHT * 0.02} position="absolute" alignSelf="center">
        <LargeButton onPress={handleConfirmButtonClick} title="Create" />
      </Box>
    </Container>
  );
};

export default SelectDates;
