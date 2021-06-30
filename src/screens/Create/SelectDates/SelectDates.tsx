import { StackScreenProps } from "@react-navigation/stack";
import DatePicker from "screens/Create/SelectDates/DatePicker";
import StyledButton from "components/StyledButton";
import { theme } from "constants/theme";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Button, Text } from "react-native-magnus";
import Container from "components/Container";
import {
  CreateMeetupStackParamList,
  MeetupFields,
  PendingParticipantFields,
} from "types/types";
import { firestore } from "lib/firebase";
import { useAppSelector } from "redux/hooks";
import uuid from "react-native-uuid";
import { useAuth } from "lib/auth";
import { RouteProp, useRoute } from "@react-navigation/native";

const SelectDates = ({
  navigation,
}: StackScreenProps<CreateMeetupStackParamList, "SelectDates">) => {
  const { width, height } = useWindowDimensions();

  const route =
    useRoute<RouteProp<CreateMeetupStackParamList, "SelectDates">>();
  const { meetupName } = route.params;

  const authData = useAuth();
  const selectedContacts = useAppSelector(
    (state) => state.SelectedFriends.selectedFriends
  );
  const handleConfirmButtonClick = async () => {
    const id = uuid.v4() as string;
    const meetupDoc = firestore.collection("meetups").doc(id);
    // TODO: create new object in firestore, with the selected dates initialised to all timing 0 count. Then pass on the meetup id to next screen

    const meetupDetails = {
      id: id,
      createdBy: authData.userData.uid,
      name: meetupName,
      activity: null, // null refers to unconfirmed
      startAt: null,
      endAt: null,
    } as MeetupFields;

    await meetupDoc.set(meetupDetails);
    selectedContacts.forEach(async (pal) => {
      await meetupDoc
        .collection("pendingParticipants")
        .doc(pal.uid)
        .set({
          requestedAt: new Date().toISOString(),
          username: pal.username,
          url_thumbnail: pal.url_thumbnail,
        } as PendingParticipantFields);
    });
    navigation.push("SelectTime");
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
