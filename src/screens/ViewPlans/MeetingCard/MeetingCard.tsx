import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import AvatarIcon from "components/AvatarIcon";
import { BodyHeading, SmallText, TinyText } from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import { format, isSameDay, parseISO } from "date-fns";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Box, Image, WINDOW_WIDTH } from "react-native-magnus";
import {
  AppStackParamList,
  MeetupFields,
  ParticipantFields,
  PendingParticipantFields,
} from "types/types";

export interface MeetingCardProps {
  meetingInfo: MeetupFields;
  participants: ParticipantFields[];
  pendingParticipants: PendingParticipantFields[];
  accent?: boolean;
}
const NUM_PROFILES = 2;

const MeetingCard = ({
  meetingInfo,
  participants,
  pendingParticipants,
  accent,
}: MeetingCardProps) => {
  if (!meetingInfo) {
    return null;
  }

  const navigation =
    useNavigation<
      StackNavigationProp<AppStackParamList, "MainBottomTabNavigator">
    >();
  let firstParticipants: ParticipantFields[] | undefined;
  let leftovers: ParticipantFields[] | undefined;
  if (participants.length <= NUM_PROFILES) {
    firstParticipants = participants;
  } else {
    firstParticipants = participants.slice(0, NUM_PROFILES);
    leftovers = participants.slice(NUM_PROFILES);
  }

  const start_datetime = parseISO(meetingInfo.startAt);
  const end_datetime = parseISO(meetingInfo.endAt);

  // obtain the date of meeting 21st Feb 2021
  let start_date_string = format(start_datetime, "d/M/yy");
  let end_date_string = format(end_datetime, "d/M/yy");
  // obtain start time and end time formatted
  let start_time_string = format(start_datetime, "h:mmaaa");
  let end_time_string = format(end_datetime, "h:mmaaa");

  let participants_string = firstParticipants
    .map((part) => part.username)
    .join(", ");

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("DiscussDetails", {
          meetingInfo,
          participants,
          pendingParticipants,
        });
      }}
    >
      <Box
        row
        alignItems="center"
        // alignSelf="stretch"
        // justifyContent="space-between"
        my={8}
        // bg="red400"
      >
        {/* The accent */}
        {accent && <Box h="100%" w={3} bg={theme.colors.primary700} mr={10} />}
        <Box row alignItems="center" justifyContent="space-between">
          <Box justifyContent="center" w={WINDOW_WIDTH * 0.6}>
            <BodyHeading textAlignVertical="center" numberOfLines={1} mb={4}>
              {meetingInfo.name}
            </BodyHeading>

            <Box justifyContent="center">
              <Box row mb={4} alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="activity"
                />
                <SmallText numberOfLines={1} maxW={WINDOW_WIDTH * 0.45} ml={8}>
                  {meetingInfo.activity}
                </SmallText>
              </Box>
              <Box row alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="clock"
                />
                <SmallText ml={8}>
                  {start_time_string}{" "}
                  {!isSameDay(
                    parseISO(meetingInfo.startAt),
                    parseISO(meetingInfo.endAt)
                  ) && start_date_string}{" "}
                  - {end_time_string} {end_date_string}
                </SmallText>
              </Box>
            </Box>
          </Box>

          <Box row alignItems="center">
            {firstParticipants.map((part, index) => (
              <AvatarIcon uri={part.url_thumbnail} label={part.username} />
            ))}
            <TinyText textAlign="center" ml={4}>
              {leftovers ? `+${leftovers?.length}` : ""}
            </TinyText>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MeetingCard;
