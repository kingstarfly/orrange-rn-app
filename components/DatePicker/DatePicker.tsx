import { addDays, format, parse, parseISO, subDays } from "date-fns";
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
import { TapGestureHandler } from "react-native-gesture-handler";

type MarkedDate = {
  [date: string]: PeriodMarking | DotMarking;
};

const DatePicker = () => {
  const [selected, setSelected] = useState<MarkedDate>({});

  const handleOnDayPress = (day: DateObject) => {
    const DATE_FORMAT = "yyyy-MM-dd";
    let d = parse(day.dateString, DATE_FORMAT, new Date());
    let ytd = format(subDays(d, 1), DATE_FORMAT);
    let tmr = format(addDays(d, 1), DATE_FORMAT);

    if (day.dateString in selected) {
      let { [day.dateString]: tmp, ...new_selected } = selected;
      if (ytd in selected) {
        // make ytd's endingDay false
        const { [ytd]: tmp, ...rest } = new_selected;
        new_selected = {
          ...rest,
          [ytd]: {
            ...tmp,
            endingDay: true,
          },
        };
      }

      if (tmr in selected) {
        // make tmr's startingDay true
        const { [tmr]: tmp, ...rest } = new_selected;
        new_selected = {
          ...rest,
          [tmr]: {
            ...tmp,
            startingDay: true,
          },
        };
      }
      setSelected(new_selected);
    } else {
      let new_selected = { ...selected };

      let props = {
        startingDay: true,
        endingDay: true,
        selected: true,
        color: theme.colors.primary400,
      };

      // 3. Check for either presence
      if (ytd in selected) {
        // make ytd's endingDay false, and today's startingDay false
        const { [ytd]: tmp, ...rest } = new_selected;
        new_selected = {
          ...rest,
          [ytd]: {
            ...tmp,
            endingDay: false,
          },
        };

        props.startingDay = false;
      }

      if (tmr in selected) {
        // make tmr's startingDay false, and today's endingDay true
        let { [tmr]: tmp, ...rest } = new_selected;
        new_selected = {
          ...rest,
          [tmr]: {
            ...tmp,
            startingDay: false,
          },
        };

        props.endingDay = false;
      }

      new_selected = { ...new_selected, [day.dateString]: props };
      console.log("NEW");
      console.log(new_selected);
      setSelected(new_selected);
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
