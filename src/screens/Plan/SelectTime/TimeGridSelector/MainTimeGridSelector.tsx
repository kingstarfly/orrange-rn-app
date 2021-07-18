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
import Loading from "components/Loading";
import { BodyTextRegular } from "components/StyledText";
import { theme } from "constants/theme";

// !! default start and end time, subject to change
export const START_TIME = 0;
export const END_TIME = 24;

interface Props {
  meetupTimings: DayTimings[];
}

const MainTimeGridSelector = ({ meetupTimings }: Props) => {
  if (!meetupTimings) {
    return (
      <Box justifyContent="center" flex={1}>
        <BodyTextRegular textAlign="center" color={theme.colors.textgray400}>
          It's a little empty here... {"\n"}Add a new timing to begin!
        </BodyTextRegular>
      </Box>
    );
  }

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <Box flexDir="row">
        <TimeLabels startTime={START_TIME} endTime={END_TIME} />
        <ScrollView horizontal>
          {meetupTimings?.map((day, index) => {
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
    flex: 1,
  },
});
