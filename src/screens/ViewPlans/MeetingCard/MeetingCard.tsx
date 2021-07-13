import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import AvatarIcon from "components/AvatarIcon";
import { BodyTextMedium, CaptionText, TinyText } from "components/StyledText";
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
  isConfirmed?: boolean;
  accent?: boolean;
}
const NUM_PROFILES = 2;

const MeetingCard = ({
  meetingInfo,
  participants,
  pendingParticipants,
  accent,
  isConfirmed,
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

  let timeContent;
  let activityContent;

  if (meetingInfo.startAt && meetingInfo.endAt) {
    let start_datetime = parseISO(meetingInfo.startAt);
    let end_datetime = parseISO(meetingInfo.endAt);

    // obtain the date of meeting 21st Feb 2021
    let start_date_string = format(start_datetime, "d/M/yy");
    let end_date_string = format(end_datetime, "d/M/yy");

    // obtain start time and end time formatted
    let start_time_string = format(start_datetime, "h:mmaaa");
    let end_time_string = format(end_datetime, "h:mmaaa");

    activityContent = meetingInfo.activity;
    timeContent = `${start_time_string}${
      !isSameDay(parseISO(meetingInfo.startAt), parseISO(meetingInfo.endAt))
        ? " " + start_date_string
        : ""
    } - ${end_time_string} ${end_date_string}`;
  } else {
    activityContent = "To be confirmed";
    timeContent = "To be confirmed";
  }

  let participants_string = firstParticipants
    .map((part) => part.username)
    .join(", ");

  return (
    <TouchableOpacity
      onPress={() => {
        if (isConfirmed) {
          navigation.push("FinalDetails", {
            meetupId: meetingInfo.id,
          });
        } else {
          navigation.push("DiscussDetails", {
            meetupId: meetingInfo.id,
          });
        }
      }}
    >
      <Box row alignItems="center" my={8}>
        {/* The accent */}
        {accent && <Box h="100%" w={3} bg={theme.colors.primary700} mr={10} />}
        <Box
          row
          alignItems="center"
          justifyContent="space-between"
          bg="red200"
          w="100%"
        >
          <Box justifyContent="center" w={WINDOW_WIDTH * 0.5} bg="blue200">
            <BodyTextMedium textAlignVertical="center" numberOfLines={1} mb={4}>
              {meetingInfo.name}
            </BodyTextMedium>

            <Box justifyContent="center">
              <Box row mb={4} alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="activity"
                />
                <CaptionText
                  numberOfLines={1}
                  maxW={WINDOW_WIDTH * 0.42}
                  ml={8}
                >
                  {activityContent}
                </CaptionText>
              </Box>
              <Box row alignItems="center">
                <PhosphorIcon
                  color={theme.colors.textdark}
                  size={16}
                  name="clock"
                />
                <CaptionText ml={8}>{timeContent}</CaptionText>
              </Box>
            </Box>
          </Box>

          <Box
            row
            justifyContent="flex-end"
            alignItems="center"
            bg="green200"
            pr={12}
          >
            {firstParticipants.map((part, index) => (
              <AvatarIcon
                key={index}
                uri={part.url_thumbnail}
                label={part.username}
              />
            ))}
            <TinyText textAlign="center">
              {leftovers ? `+${leftovers.length}` : ""}
            </TinyText>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MeetingCard;
