import { format, parseISO } from "date-fns";
import React from "react";
import { ImageSourcePropType } from "react-native";
import { Text, Box, Image, WINDOW_WIDTH } from "react-native-magnus";
import { MeetingProps, participantProps } from "types";

const MeetingCard = ({ meeting }: MeetingProps) => {
  const NUM_PROFILES = 2;
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
    <Box row alignItems="center" alignSelf="stretch" my={8}>
      <Box row>
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
        <Text textAlign="center" w={24}>
          {leftovers ? `+ ${leftovers?.length}` : ""}
        </Text>
      </Box>
      <Box mx={8}>
        <Text
          fontFamily="poppins-medium"
          textTransform="uppercase"
          fontSize={18}
          numberOfLines={1}
          maxW={WINDOW_WIDTH * 0.55}
        >
          {meeting.title}
        </Text>
        <Box row>
          <Text fontSize={12}>{date_string}</Text>
          <Text ml={24} fontSize={12}>
            {start_string} - {end_string}
          </Text>
        </Box>

        <Text fontSize={12}>{meeting.activity}</Text>
        <Box row>
          <Text fontSize={12} fontFamily="poppins-lightitalic">
            {participants_string}
          </Text>
          <Text fontSize={12} fontFamily="poppins-lightitalic">
            {leftovers && ` and ${leftovers.length} others`}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MeetingCard;
