import React, { useState } from "react";
import { theme } from "constants/theme";
import { Pressable, TouchableOpacity } from "react-native";
import { Div, WINDOW_WIDTH } from "react-native-magnus";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BodyTextRegular, MiniText } from "components/StyledText";
import {
  addHours,
  differenceInHours,
  format,
  isBefore,
  isSameDay,
  parseISO,
  roundToNearestMinutes,
  subHours,
} from "date-fns";
import { PhosphorIcon } from "constants/Icons";

interface Props {
  start: Date;
  end: Date;
  rightButtonType?: RightButtonType;
  onButtonPress?: (startTime: Date, endTime: Date) => Promise<void>;
  readOnly?: boolean;
}

type RightButtonType = "add" | "delete" | "default";

const DateTimeRowComponent = ({
  start,
  end,
  rightButtonType,
  onButtonPress,
  readOnly,
}: Props) => {
  const [fromDate, setFromDate] = useState<Date>(start);
  const [fromMode, setFromMode] = useState("date");
  const [showFromDateTimePicker, setShowFromDateTimePicker] = useState(false);

  const [toDate, setToDate] = useState<Date>(end);
  const [toMode, setToMode] = useState("date");
  const [showToDateTimePicker, setShowToDateTimePicker] = useState(false);

  const onChangeFrom = (_, selectedDate: Date) => {
    if (!selectedDate) {
      setShowFromDateTimePicker(false);
      return;
    }
    const currentDate = selectedDate || fromDate;
    if (fromMode === "date") {
      setFromDate(currentDate);
      setFromMode("time");
      return;
    }
    // Checks here
    if (isBefore(toDate, currentDate) || !isSameDay(fromDate, toDate)) {
      setToDate(addHours(currentDate, 1));
    }
    setShowFromDateTimePicker(false); // closes the picker
    setFromDate(currentDate);
  };

  const onChangeTo = (_, selectedDate: Date) => {
    if (!selectedDate) {
      setShowToDateTimePicker(false);
      return;
    }

    const currentDate = selectedDate || toDate;
    if (toMode === "date") {
      setToMode("time");
      return;
    }
    // Checks here
    if (isBefore(currentDate, fromDate) || !isSameDay(fromDate, toDate)) {
      // Set fromDate to be one hour before by default
      setFromDate(subHours(currentDate, 1));
    }
    setShowToDateTimePicker(false); // closes the picker
    setToDate(currentDate);
  };

  return (
    <Div
      row
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      mb={8}
    >
      <Div
        borderColor={theme.colors.linegray}
        borderWidth={1}
        w={WINDOW_WIDTH * 0.5}
        py={4}
        rounded={5}
        justifyContent="center"
        alignItems="center"
      >
        <Pressable
          disabled={readOnly}
          onPress={() => {
            setFromMode("date");
            setShowFromDateTimePicker(true);
          }}
        >
          {!fromDate ? (
            <BodyTextRegular>Tap to edit</BodyTextRegular>
          ) : (
            <BodyTextRegular>{format(fromDate, "EEEE, d MMM")}</BodyTextRegular>
          )}
        </Pressable>
      </Div>

      <Div row alignItems="center" justifyContent="flex-end">
        <Pressable
          disabled={readOnly}
          onPress={() => {
            setFromMode("time");
            setShowFromDateTimePicker(true);
          }}
        >
          <Div
            borderColor={theme.colors.linegray}
            borderWidth={1}
            w={50}
            h={30}
            rounded={5}
            justifyContent="center"
            alignItems="center"
          >
            {!fromDate ? (
              <MiniText>-- : --</MiniText>
            ) : (
              <MiniText>{format(fromDate, "HH:mm")}</MiniText>
            )}
          </Div>
        </Pressable>

        <MiniText px={4}>-</MiniText>

        <Pressable
          disabled={readOnly}
          onPress={() => {
            setToMode("time");
            setShowToDateTimePicker(true);
          }}
        >
          <Div
            borderColor={theme.colors.linegray}
            borderWidth={1}
            w={50}
            h={30}
            rounded={5}
            justifyContent="center"
            alignItems="center"
          >
            {!toDate ? (
              <MiniText>-- : --</MiniText>
            ) : (
              <MiniText>{format(toDate, "HH:mm")}</MiniText>
            )}
          </Div>
        </Pressable>
        {rightButtonType && rightButtonType !== "default" && (
          <TouchableOpacity
            disabled={readOnly}
            style={{
              marginLeft: 8,
            }}
            onPress={() => {
              onButtonPress(fromDate, toDate).then(() => {
                if (rightButtonType === "add") {
                  setFromDate(null);
                  setToDate(null);
                }
              });
            }}
          >
            {rightButtonType === "add" ? (
              <PhosphorIcon
                name="plus-circle"
                color={theme.colors.textdark}
                size={24}
              />
            ) : (
              <PhosphorIcon
                name="minus-circle-fill"
                color={theme.colors.red}
                size={24}
              />
            )}
          </TouchableOpacity>
        )}
      </Div>

      {showFromDateTimePicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            fromDate || roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
          //@ts-ignore
          mode={fromMode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeFrom}
        />
      )}

      {showToDateTimePicker && (
        <DateTimePicker
          minuteInterval={30}
          value={toDate || roundToNearestMinutes(new Date(), { nearestTo: 30 })}
          //@ts-ignore
          mode={toMode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeTo}
        />
      )}
    </Div>
  );
};

export default DateTimeRowComponent;
