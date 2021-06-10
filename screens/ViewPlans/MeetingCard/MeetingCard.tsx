import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Header3,
  SubBodyMediumText,
  SubBodyNormalText,
} from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import { format, parseISO } from "date-fns";
import React from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { Text, Box, Image, WINDOW_WIDTH } from "react-native-magnus";
import {
  ConfirmedPlansStackList,
  MeetingProps,
  participantProps,
} from "types/types";

interface MeetingCardProps {
  meeting: MeetingProps;
  accent?: boolean;
}

const MeetingCard = ({ meeting, accent }: MeetingCardProps) => {
  const navigation =
    useNavigation<StackNavigationProp<ConfirmedPlansStackList, "List">>();
  const NUM_PROFILES = 1;
  let firstParticipants: participantProps[] | undefined;
  let leftovers: participantProps[] | undefined;
  if (meeting.participants.length <= NUM_PROFILES) {
    firstParticipants = meeting.participants;
  } else {
    firstParticipants = meeting.participants.slice(0, NUM_PROFILES);
    leftovers = meeting.participants.slice(NUM_PROFILES);
  }

  // obtain the date of meeting 21st Feb 2021
  let date_string = format(parseISO(meeting.start_time), "do MMM yyyy");
  // obtain start time and end time formatted
  let start_string = format(parseISO(meeting.start_time), "h:mm a");
  let end_string = format(parseISO(meeting.end_time), "h:mm a");

  let participants_string = firstParticipants
    .map((part) => part.display_name)
    .join(", ");

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(meeting);
        navigation.push("IndividualPlan", { meeting: meeting });
      }}
    >
      <Box
        row
        alignItems="center"
        alignSelf="stretch"
        justifyContent="space-between"
        my={8}
      >
        {/* The accent */}
        {accent && <Box h="100%" w={3} bg={theme.colors.primary700} />}
        <Box row alignItems="center">
          <Box justifyContent="center">
            <Header3
              textAlignVertical="center"
              numberOfLines={1}
              w={WINDOW_WIDTH * 0.55}
              mb={4}
            >
              {meeting.title}
            </Header3>

            <Box justifyContent="center">
              <Box row mb={4} alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="clock"
                />
                <SubBodyNormalText ml={8}>
                  {start_string} - {end_string}
                </SubBodyNormalText>
              </Box>
              <Box row mb={4} alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="activity"
                />
                <SubBodyNormalText ml={8}>{meeting.activity}</SubBodyNormalText>
              </Box>
              <Box row alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="calendar-blank"
                />
                <SubBodyNormalText ml={8}>{date_string}</SubBodyNormalText>
              </Box>
            </Box>
          </Box>

          <Box row alignItems="center">
            <Image
              h={50}
              w={50}
              rounded="circle"
              borderWidth={2}
              borderColor="white"
              source={meeting.organiser.avatar}
              zIndex={2}
            />
            {firstParticipants.map((part, index) => (
              <Image
                key={index}
                h={50}
                w={50}
                rounded="circle"
                borderWidth={2}
                borderColor="white"
                source={part.avatar}
                ml={-14}
                zIndex={-index}
              />
            ))}
            <SubBodyMediumText textAlign="center" ml={4}>
              {leftovers ? `+${leftovers?.length}` : ""}
            </SubBodyMediumText>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MeetingCard;
