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
  let firstParticipants: participantProps[] | undefined;
  if (details.participants.length < 3) {
    firstParticipants = details.participants;
  } else {
    firstParticipants = details.participants.slice(0, 3);
  }
  // console.log(typeof firstParticipants[0].avatar);
  console.log(typeof require("../../../assets/mock_avatars/robin.jpg"));
  return (
    <Box>
      {firstParticipants.map((part) => (
        // <Image h={50} w={50} rounded="circle" source={part.avatar} />
        <Image
          h={50}
          w={50}
          rounded="circle"
          source={require("../../../assets/mock_avatars/robin.jpg")}
        />
      ))}

      <Text fontSize="3xl">Title: {details.title}</Text>
    </Box>
  );
};

export default MeetingCard;
