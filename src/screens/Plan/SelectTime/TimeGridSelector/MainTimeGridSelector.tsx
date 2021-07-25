import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import { compareAsc, format, isSameDay, parse } from "date-fns";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "react-native-magnus";
import { useAppSelector } from "redux/hooks";
import Day from "./Day";
import TimeLabels from "./TimeLabels";
import { parseISO } from "date-fns/esm";
import { DayTimings } from "types/types";
import { BodyTextRegular, CaptionText } from "components/StyledText";
import { theme } from "constants/theme";

// !! default start and end time, subject to change
export const START_TIME = 0;
export const END_TIME = 24;

interface Props {
  meetupTimings: DayTimings[];
}

const MainTimeGridSelector = ({ meetupTimings }: Props) => {
  const verticalRef = React.useRef<ScrollView>(null);

  // Scroll to 9am-ish on boot
  React.useEffect(() => {
    verticalRef.current &&
      verticalRef.current.scrollTo({
        y: 369,
      });
  }, []);

  if (!meetupTimings || !meetupTimings.length) {
    return (
      <Box justifyContent="center" flex={1}>
        <BodyTextRegular textAlign="center" color={theme.colors.textgray400}>
          It's a little empty here... {"\n"}Add a new timing to begin!
        </BodyTextRegular>
      </Box>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Box row justifyContent="flex-start" left={60}>
        {meetupTimings.map((dayTimings) => {
          let date = parseISO(dayTimings.date);
          return (
            <Box alignItems="center" w={80}>
              <CaptionText
                fontFamily="inter-regular"
                color={theme.colors.textgray400}
                fontSize={14}
              >
                {format(date, "EEE")}
              </CaptionText>
              <CaptionText
                fontFamily="inter-regular"
                color={theme.colors.textgray400}
                fontSize={14}
              >
                {format(date, "MMM d")}
              </CaptionText>
            </Box>
          );
        })}
      </Box>
      <ScrollView showsVerticalScrollIndicator={false} ref={verticalRef}>
        <Box flexDir="row">
          <TimeLabels startTime={START_TIME} endTime={END_TIME} />
          <ScrollView horizontal>
            {meetupTimings?.map((dayTimings, index) => {
              return (
                <Day
                  key={index}
                  dayTimings={dayTimings}
                  isRightMostDay={index === meetupTimings.length - 1}
                />
              );
            })}
          </ScrollView>
        </Box>
      </ScrollView>
    </View>
  );
};

export default MainTimeGridSelector;

const styles = StyleSheet.create({});
