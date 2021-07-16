import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import { compareAsc, isSameDay, parse } from "date-fns";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "react-native-magnus";
import { useAppSelector } from "redux/hooks";
import Day from "./Day";
import TimeLabels from "./TimeLabels";
import { parseISO } from "date-fns/esm";
import { DayTimings } from "types/types";

// !! default start and end time, subject to change
export const START_TIME = 0;
export const END_TIME = 24;

interface Props {
  meetupTimings: DayTimings[];
}

const MainTimeGridSelector = ({ meetupTimings }: Props) => {
  return (
    <ScrollView
      style={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <Box flexDir="row">
        <TimeLabels startTime={START_TIME} endTime={END_TIME} />
        <ScrollView horizontal>
          {meetupTimings.map((day, index) => {
            let theDate = parseISO(day.date);
            let timingsData = day.startTimings;
            return (
              <Day
                key={index}
                date={theDate}
                timingsData={timingsData}
                startTime={START_TIME}
                endTime={END_TIME}
                isRightMostDay={index === meetupTimings.length - 1}
              />
            );
          })}
        </ScrollView>
      </Box>
    </ScrollView>
  );
};

export default MainTimeGridSelector;

const styles = StyleSheet.create({
  scrollViewContainer: {
    // backgroundColor: "red",
  },
});
