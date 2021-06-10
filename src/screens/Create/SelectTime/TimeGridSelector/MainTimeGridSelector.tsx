import { DATE_FORMAT } from "src/screens/Create/SelectDates/DatePicker";
import { compareAsc, parse } from "date-fns";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "react-native-magnus";
import { useAppSelector } from "src/redux/hooks";
import Day from "./Day";
import TimeLabels from "./TimeLabels";

// !! default start and end time, subject to change
export const START_TIME = 0;
export const END_TIME = 24;

const MainTimeGridSelector = () => {
  const selected = useAppSelector((state) => state.DatePicker.selected);

  const dateStrings = Object.keys(selected);
  dateStrings.sort((a, b) =>
    compareAsc(
      parse(a, DATE_FORMAT, new Date()),
      parse(b, DATE_FORMAT, new Date())
    )
  );
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <Box flexDir="row">
        <TimeLabels startTime={START_TIME} endTime={END_TIME} />
        <ScrollView horizontal>
          {dateStrings.map((dateString, index) => {
            return (
              <Day
                key={index}
                date={parse(dateString, DATE_FORMAT, new Date())}
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
    paddingLeft: 0,
    paddingRight: 24,
    marginBottom: 80,
  },
});
