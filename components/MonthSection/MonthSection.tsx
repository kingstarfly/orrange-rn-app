import React from "react";
import { format, parseISO } from "date-fns";
import { Text, Box, Image } from "react-native-magnus";
import { MeetingsProps } from "types";
import MeetingCard from "../MeetingCard";

const MonthSection = ({ meetings }: MeetingsProps) => {
  let month_year = format(parseISO(meetings[0].start_time), "MMMM yyyy");
  return (
    <Box>
      <Text
        mb={8}
        textTransform="uppercase"
        fontSize={24}
        fontFamily="poppins-regular"
      >
        {month_year}
      </Text>
      {meetings.map((meeting, index) => (
        <MeetingCard meeting={meeting} key={index} />
      ))}
    </Box>
  );
};

export default MonthSection;
