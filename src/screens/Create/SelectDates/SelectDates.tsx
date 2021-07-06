import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import DatePicker, { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import StyledButton from "components/StyledButton";
import { theme } from "constants/theme";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Button, Text } from "react-native-magnus";
import Container from "components/Container";
import {
  AppStackParamList,
  CreateMeetupStackParamList,
  DayTimings,
  MeetupFields,
  PendingParticipantFields,
} from "types/types";
import { firestore } from "lib/firebase";
import { useAppSelector } from "redux/hooks";
import uuid from "react-native-uuid";
import { useAuth } from "lib/auth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { addMinutes, parse, parseISO, startOfDay } from "date-fns";
import { createMeetup } from "lib/api/meetup";

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

  const authData = useAuth();
  const selectedContacts = useAppSelector(
    (state) => state.SelectedFriends.selectedFriends
  );

  const selectedDates = useAppSelector((state) => state.DatePicker.selected);

  const handleConfirmButtonClick = async () => {
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
      createdBy: authData.userData.uid,
      name: meetupName,
      activity: null, // null refers to unconfirmed
      startAt: null,
      endAt: null,
      meetupTimings: meetupTimings,
    } as MeetupFields;

    // use all information, and create new meetup in firestore
    await createMeetup(meetupDetails, selectedContacts, authData.userData);

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
  };
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
        <DatePicker />
      </Box>

      <StyledButton
        onPress={handleConfirmButtonClick}
        bg={theme.colors.primary400}
        position="absolute"
        bottom={25}
      >
        Confirm
      </StyledButton>
    </Container>
  );
};

export default SelectDates;
