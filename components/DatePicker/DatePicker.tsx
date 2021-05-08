import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { Text, Box, Image } from "react-native-magnus";
import {
  Calendar,
  CalendarList,
  Agenda,
  DateObject,
  PeriodMarking,
  DotMarking,
} from "react-native-calendars";

import { AntDesign } from "@expo/vector-icons";
import { theme } from "constants/theme";

type MarkedDate = {
  [date: string]: PeriodMarking | DotMarking;
};

const DatePicker = () => {
  const [selected, setSelected] = useState<MarkedDate>({});

  const handleOnDayPress = (day: DateObject) => {
    if (day.dateString in selected) {
      const { [day.dateString]: tmp, ...rest } = selected;
      setSelected(rest);
    } else {
      setSelected((prev) => {
        return { ...prev, [day.dateString]: { marked: true } };
      });
    }
  };

  return (
    <Box alignSelf="stretch">
      <Calendar
        theme={{
          calendarBackground: theme.colors.backgroundlight,
        }}
        markingType={"period"}
        markedDates={selected}
        // Initially visible month. Default = Date()
        current={new Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={new Date()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2021-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          handleOnDayPress(day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MMMM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => (
          <AntDesign
            name={direction}
            size={24}
            color={theme.colors.primary400}
          />
        )}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        // onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        // onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        // disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter.
        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </Box>
  );
};

export default DatePicker;
