import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import { compareAsc, isSameDay, parse } from "date-fns";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "react-native-magnus";
import { useAppSelector } from "redux/hooks";
import Day from "./Day";
import TimeLabels from "./TimeLabels";
import { getAllDurationsFromMeeting } from "lib/api/meetup";
import { parseISO } from "date-fns/esm";
import { DayTimings } from "types/types";

// !! default start and end time, subject to change
export const START_TIME = 0;
export const END_TIME = 24;

interface Props {
  meetupTimings: DayTimings[];
}

const MainTimeGridSelector = ({ meetupTimings }: Props) => {
  const selected = useAppSelector((state) => state.DatePicker.selected);
  // console.log(meetupTimings);

  const dateStrings = Object.keys(selected);
  dateStrings.sort((a, b) => compareAsc(parseISO(a), parseISO(b)));
  return (
    <ScrollView
      style={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <Box flexDir="row">
        <TimeLabels startTime={START_TIME} endTime={END_TIME} />
        <ScrollView horizontal>
          {dateStrings.map((dateString, index) => {
            let theDate = parse(dateString, DATE_FORMAT, new Date());
            let timingsData = meetupTimings?.find((dayTiming) =>
              isSameDay(parseISO(dayTiming.date), theDate)
            )?.startTimings;
            return (
              <Day
                key={index}
                date={theDate}
                timingsData={timingsData}
                startTime={START_TIME}
                endTime={END_TIME}
                isRightMostDay={
                  dateString === dateStrings[dateStrings.length - 1]
                }
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
