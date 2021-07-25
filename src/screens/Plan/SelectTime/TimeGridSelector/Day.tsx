import { theme } from "constants/theme";
import { add, format, startOfDay } from "date-fns";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Box, Text } from "react-native-magnus";
import { useAppDispatch } from "redux/hooks";
import { DayTimings } from "types/types";
import GridCell from "./GridCell";

type dayProps = {
  dayTimings: DayTimings;
  isRightMostDay?: boolean;
};

const Day = ({ dayTimings, isRightMostDay }: dayProps) => {
  // // Get all periods by hour from startTime to endTime
  // let allStartTimes: Date[] = [];
  // for (let x = startTime; x < endTime; x += 1) {
  //   allStartTimes.push(add(dateStart, { hours: x }));
  // }

  // Group pairs of arrays.
  const occupantsArrays: string[][][] = [];
  for (let i = 0; i < dayTimings.startTimings.length; i += 2) {
    occupantsArrays.push(dayTimings.startTimings.slice(i, i + 2));
  }

  React.useEffect(() => {
    console.log(occupantsArrays);
  }, []);

  return (
    <Box alignItems="center">
      <Box>
        {occupantsArrays.map((occupantsArr, index) => {
          return (
            <GridCell
              key={index}
              occupantsArr={occupantsArr}
              isRightMostCell={isRightMostDay}
              isBottomMostCell={index === occupantsArrays.length - 1}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Day;
