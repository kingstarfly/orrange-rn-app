import { theme } from "constants/theme";
import { add, format, startOfDay } from "date-fns";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Box, Text } from "react-native-magnus";
import { useAppDispatch } from "redux/hooks";
import { StartTimeMapToNumber } from "types/types";
import GridCell from "./GridCell";

type dayProps = {
  date: Date;
  startTime: number;
  endTime: number;
  isRightMostDay?: boolean;
  timingsData: StartTimeMapToNumber;
};

const Day = ({
  date,
  startTime,
  endTime,
  isRightMostDay,
  timingsData,
}: dayProps) => {
  // Get all periods by hour from startTime to endTime

  const dateStart = startOfDay(date);

  let allStartTimes: Date[] = [];
  for (let x = startTime; x < endTime; x += 1) {
    allStartTimes.push(add(dateStart, { hours: x }));
  }

  const dispatch = useAppDispatch();

  return (
    <Box alignItems="center">
      <Text
        fontFamily="inter-regular"
        color={theme.colors.textgray400}
        fontSize={14}
      >
        {format(date, "EEE")}
      </Text>
      <Text
        fontFamily="inter-regular"
        color={theme.colors.textgray400}
        fontSize={14}
      >
        {format(date, "MMM d")}
      </Text>

      {/* For the below view, check for user taps (not drags). If tapped, create a new timeslot and display it. Actually should  check tap on each grid to know which timing was tapped. */}

      <Box>
        {allStartTimes.map((start, index) => {
          return (
            <GridCell
              key={index}
              start={start}
              timingsData={timingsData}
              isRightMostCell={isRightMostDay}
              isBottomMostCell={index === allStartTimes.length - 1}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Day;
