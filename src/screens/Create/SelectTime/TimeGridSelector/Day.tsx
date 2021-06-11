import { theme } from "constants/theme";
import { add, format, startOfDay } from "date-fns";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Box, Text } from "react-native-magnus";
import { useAppDispatch } from "redux/hooks";
import GridCell from "./GridCell";

type dayProps = {
  date: Date;
  startTime: number;
  endTime: number;
  isRightMostDay?: boolean;
};

const Day = ({ date, startTime, endTime, isRightMostDay }: dayProps) => {
  // Get all periods by hour from startTime to endTime

  const dateStart = startOfDay(date);
  const [dayX, setDayX] = useState(0); // save the absolute x-coordinate of this Day column

  let allStartTimes: Date[] = [];
  for (let x = startTime; x < endTime; x += 1) {
    allStartTimes.push(add(dateStart, { hours: x }));
  }

  const dispatch = useAppDispatch();
  const ref = useRef();

  return (
    <View
      ref={ref}
      onLayout={(e) => {
        console.log("DAY - ");
        if (ref.current) {
          //@ts-ignore
          ref.current.measureInWindow((x, y) => {
            console.log(x, y);
            setDayX(x);
          });
        }
      }}
    >
      <Box alignItems="center">
        <Text
          fontFamily="inter-regular"
          color={theme.colors.textgray400}
          fontSize={14}
        >
          {format(date, "EEE")}
        </Text>
        <Text
          fontFamily="poppins-regular"
          color={theme.colors.textgray400}
          fontSize={14}
        >
          {format(date, "d")}
        </Text>

        {/* For the below view, check for user taps (not drags). If tapped, create a new timeslot and display it. Actually should  check tap on each grid to know which timing was tapped. */}

        <Box>
          {allStartTimes.map((start, index) => (
            <GridCell
              key={index}
              start={start}
              isRightMostCell={isRightMostDay}
              isBottomMostCell={index === allStartTimes.length - 1}
              x={dayX}
            />
          ))}
        </Box>
      </Box>
    </View>
  );
};

export default Day;
