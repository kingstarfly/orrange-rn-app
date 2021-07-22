import React, { useState } from "react";
import { theme } from "constants/theme";
import { Pressable, TouchableOpacity } from "react-native";
import { Div, WINDOW_WIDTH } from "react-native-magnus";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BodyTextRegular, CaptionText, MiniText } from "components/StyledText";
import {
  add,
  addHours,
  addMinutes,
  format,
  isBefore,
  isSameDay,
  startOfDay,
  parseISO,
  roundToNearestMinutes,
  subHours,
} from "date-fns";
import { PhosphorIcon } from "constants/Icons";
import { PreferredDuration } from "types/types";
import { getMinutesFromStartOfDay } from "lib/helpers";

interface Props {
  data: PreferredDuration;
  setData: (oldId: string, newDur: PreferredDuration) => void;
  rightButtonType?: RightButtonType;
  onButtonPress?: (prefDuration: PreferredDuration) => Promise<void>;
  readOnly?: boolean;
}

type RightButtonType = "add" | "delete" | "default";
type TimeType = "start" | "end";

const DateTimeRowComponent = ({
  data,
  setData,
  rightButtonType,
  onButtonPress,
  readOnly,
}: Props) => {
  const [startDate, setStartDate] = useState<Date>(
    data?.startAt ? parseISO(data.startAt) : null
  );

  const [startTime, setStartTime] = useState<Date>(
    data?.startAt ? parseISO(data.startAt) : null
  );
  const [endTime, setEndTime] = useState<Date>(
    data?.endAt ? parseISO(data.endAt) : null
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeType, setTimeType] = useState<TimeType>("start");
  const [mode, setMode] = useState<string>("date");

  const onChangeDate = (_, selectedDate: Date) => {
    if (!selectedDate) {
      setShowDatePicker(false);
      setMode("date");
      setTimeType("start");
      return;
    }
    // setShowDatePicker(false);
    if (mode === "date") {
      setStartDate(startOfDay(selectedDate));
    } else if (timeType === "start") {
      // setTimeType("end");
      setShowDatePicker(false);

      if (
        !endTime ||
        getMinutesFromStartOfDay(selectedDate) >=
          getMinutesFromStartOfDay(endTime)
      ) {
        // Set fromDate to be one hour before by default
        setEndTime(addHours(selectedDate, 1));
      }

      setStartTime(selectedDate);
    } else {
      setShowDatePicker(false);
      setMode("date");
      // setTimeType("start");

      if (
        getMinutesFromStartOfDay(startTime) >=
        getMinutesFromStartOfDay(selectedDate)
      ) {
        // Set fromDate to be one hour before by default
        setStartTime(subHours(selectedDate, 1));
      }
      setEndTime(selectedDate);
    }

    // Regardless of which mode, need to update parent
    setData(data.id, {
      id: data.id,
      startAt:
        addMinutes(
          startOfDay(startDate),
          getMinutesFromStartOfDay(startTime)
        ).toISOString() || "",
      endAt:
        addMinutes(
          startOfDay(startDate),
          getMinutesFromStartOfDay(endTime)
        ).toISOString() || "",
      userUid: data.userUid,
      username: data.username,
    });
  };

  // const onChangeStartTime = (_, selectedDate: Date) => {
  //   if (!selectedDate) {
  //     setShowStartTimePicker(false);
  //     return;
  //   }
  //   setShowStartTimePicker(false);
  //   setShowEndTimePicker(true);
  //   setStartTime(selectedDate);
  // };

  // const onChangeEndTime = (_, selectedDate: Date) => {
  //   if (!selectedDate) {
  //     setShowEndTimePicker(false);
  //     return;
  //   }

  //   // Checks here
  //   if (
  //     getMinutesFromStartOfDay(startTime) > getMinutesFromStartOfDay(endTime)
  //   ) {
  //     // Set fromDate to be one hour before by default
  //     setStartTime(subHours(selectedDate, 1));
  //   }

  //   setShowEndTimePicker(false); // closes the picker
  //   setEndTime(selectedDate);

  //   if (saveOnEdit) {
  //     handleSaveOnEdit(
  //       data?.id,
  //       addMinutes(startOfDay(startDate), getMinutesFromStartOfDay(startTime)),
  //       addMinutes(
  //         startOfDay(startDate),
  //         getMinutesFromStartOfDay(selectedDate)
  //       )
  //     );
  //   }
  // };

  return (
    <Div
      row
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      mb={8}
    >
      <Pressable
        disabled={readOnly}
        onPress={() => {
          setMode("date");
          setTimeType("start");
          setShowDatePicker(true);
        }}
      >
        <Div
          borderColor={theme.colors.linegray}
          borderWidth={1}
          w={WINDOW_WIDTH * 0.45}
          h={35}
          py={4}
          rounded={5}
          justifyContent="center"
          alignItems="center"
        >
          {!startDate ? (
            <BodyTextRegular color={theme.colors.textgray200}>
              Tap to edit
            </BodyTextRegular>
          ) : (
            <BodyTextRegular>
              {format(startDate, "EEEE, d MMM")}
            </BodyTextRegular>
          )}
        </Div>
      </Pressable>

      <Div row alignItems="center" justifyContent="flex-end">
        <Pressable
          disabled={readOnly}
          onPress={() => {
            setTimeType("start");
            setMode("time");
            setShowDatePicker(true);
          }}
        >
          <Div
            borderColor={theme.colors.linegray}
            borderWidth={1}
            w={60}
            h={35}
            rounded={5}
            justifyContent="center"
            alignItems="center"
          >
            {!startTime ? (
              <CaptionText>-- : --</CaptionText>
            ) : (
              <CaptionText>{format(startTime, "HH:mm")}</CaptionText>
            )}
          </Div>
        </Pressable>

        <MiniText px={4}>-</MiniText>

        <Pressable
          disabled={readOnly}
          onPress={() => {
            setTimeType("end");
            setMode("time");
            setShowDatePicker(true);
          }}
        >
          <Div
            borderColor={theme.colors.linegray}
            borderWidth={1}
            w={60}
            h={35}
            rounded={5}
            justifyContent="center"
            alignItems="center"
          >
            {!endTime ? (
              <CaptionText>-- : --</CaptionText>
            ) : (
              <CaptionText>{format(endTime, "HH:mm")}</CaptionText>
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
              if (!startDate || !startTime || !endTime) {
                return;
              }
              onButtonPress({
                id: data?.id,
                startAt: addMinutes(
                  startOfDay(startDate),
                  getMinutesFromStartOfDay(startTime)
                ).toISOString(),
                endAt: addMinutes(
                  startOfDay(startDate),
                  getMinutesFromStartOfDay(endTime)
                ).toISOString(),
                userUid: data?.userUid,
                username: data?.username,
              } as PreferredDuration).then(() => {
                if (rightButtonType === "add") {
                  setStartDate(null);
                  setStartTime(null);
                  setEndTime(null);
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

      {showDatePicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            (timeType === "start" || mode === "date" ? startTime : endTime) ||
            roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
          //@ts-ignore
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeDate}
        />
      )}

      {/* {showStartTimePicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            startTime || roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeStartTime}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            endTime || roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeEndTime}
        />
      )} */}
    </Div>
  );
};

export default DateTimeRowComponent;
