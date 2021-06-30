import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import { compareAsc, parse } from "date-fns";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "react-native-magnus";
import { useAppSelector } from "redux/hooks";
import Day from "./Day";
import TimeLabels from "./TimeLabels";
import { getAllDurationsFromMeeting } from "lib/api/meetup";
import { parseISO } from "date-fns/esm";

// !! default start and end time, subject to change
export const START_TIME = 0;
export const END_TIME = 24;

const MainTimeGridSelector = () => {
  const selected = useAppSelector((state) => state.DatePicker.selected);

  React.useEffect(() => {
    // TODO: Retrieve all user - timing information, and then flatten the data to get a list of objects with "time" (specific to half grid) mapped to count of overlap
    const fetchDataAndFlatten = async () => {
      const prefDurations = await getAllDurationsFromMeeting(
        "5875d023-1173-40c4-a605-45fd88a8017c"
      );
      console.log("Fetching data and attempting to flatten");
      console.log(prefDurations);
    };
    fetchDataAndFlatten();
  }, []);

  const dateStrings = Object.keys(selected);
  dateStrings.sort((a, b) => compareAsc(parseISO(a), parseISO(b)));
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
    // backgroundColor: "red",
  },
});
