import { format, parseISO } from "date-fns";
import React from "react";
import { ImageSourcePropType } from "react-native";
import { Text, Box, Image } from "react-native-magnus";

type MeetingCardProps = {
  details: {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    activity: string;
    organiser: participantProps;
    participants: participantProps[];
  };
};

type participantProps = {
  id: string;
  display_name: string;
  avatar: ImageSourcePropType;
  responded: boolean;
  confirmed: boolean;
};

const MeetingCard = ({ details }: MeetingCardProps) => {
  const NUM_PROFILES = 3;
  let firstParticipants: participantProps[] | undefined;
  let leftovers: participantProps[] | undefined;
  if (details.participants.length <= NUM_PROFILES) {
    firstParticipants = details.participants;
  } else {
    firstParticipants = details.participants.slice(0, NUM_PROFILES);
    leftovers = details.participants.slice(NUM_PROFILES);
  }

  // obtain the date of meeting 21st Feb 2021
  let date_string = format(parseISO(details.start_time), "do MMM YYY");
  // obtain start time and end time formatted
  let start_string = format(parseISO(details.start_time), "h:mm a");
  let end_string = format(parseISO(details.end_time), "h:mm a");

  let participants_string = firstParticipants
    .map((part) => part.display_name)
    .join(", ");

  return (
    <Box row alignItems="center">
      <Box row ml={8}>
        {firstParticipants.map((part, index) => (
          <Image
            key={index}
            h={50}
            w={50}
            rounded="circle"
            borderWidth={2}
            borderColor="white"
            source={part.avatar}
            ml={index > 0 ? -14 : 0}
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
        >
          {details.title}
        </Text>
        <Box row>
          <Text fontSize={12}>{date_string}</Text>
          <Text ml={24} fontSize={12}>
            {start_string} - {end_string}
          </Text>
        </Box>

        <Text fontSize={12}>{details.activity}</Text>
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
