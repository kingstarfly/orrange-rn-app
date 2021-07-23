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
  isAfter,
  subMinutes,
  getMinutes,
} from "date-fns";
import { PhosphorIcon } from "constants/Icons";
import { PreferredDuration } from "types/types";
import { getMinutesFromStartOfDay } from "lib/helpers";

interface Props {
  data: PreferredDuration;
  rightButtonType?: RightButtonType;
  onButtonPress?: (prefDuration: PreferredDuration) => Promise<void>;
  editable?: boolean;
  onDataChange?: (prefDur: PreferredDuration) => void;
  saveOnEdit?: boolean;
}

type RightButtonType = "add" | "delete" | "default";

const DateTimeRowComponent = ({
  data,
  rightButtonType,
  onButtonPress,
  editable,
  onDataChange,
  saveOnEdit,
}: Props) => {
  const [startTime, setStartTime] = useState<Date>(
    data?.startAt ? parseISO(data.startAt) : null
  );
  const [endTime, setEndTime] = useState<Date>(
    data?.endAt ? parseISO(data.endAt) : null
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [startPickerMode, setStartPickerMode] = useState<string>("date");

  const onChangeStartTime = (_, selected: Date) => {
    if (!selected) {
      setShowStartPicker(false);
      return;
    }

    // Open time if not already time
    if (startPickerMode === "date") {
      setStartPickerMode("time");
    }
    if (startPickerMode == "time") {
      // Close the picker to prevent double pop up
      setShowStartPicker(false);
    }

    // Update state
    setStartTime(selected);

    // workaround for not waiting for state update for onDataChange.
    let localEndTime = endTime;

    // If end time is invalid, set end time to 1hr after
    if (
      !endTime ||
      getMinutesFromStartOfDay(endTime) <= getMinutesFromStartOfDay(selected)
    ) {
      localEndTime = addMinutes(selected, 60);
      setEndTime(addMinutes(selected, 60));
    }

    // Call onDataChange
    if (saveOnEdit) {
      onDataChange({
        ...data,
        startAt: selected.toISOString(),
        endAt: localEndTime.toISOString() || data.endAt,
      });
    }
  };

  const onChangeEndTime = (_, selected: Date) => {
    if (!selected) {
      setShowEndPicker(false);
      return;
    }

    // Trick to always be on same day as start time
    // 1. Get minutes from start of day
    // 2. Add to start of day of startTime.
    // 3. Profit

    // Close the picker to prevent double pop up.
    setShowEndPicker(false);

    const mins = getMinutesFromStartOfDay(selected);
    const newDate = startTime
      ? addMinutes(startOfDay(startTime), mins)
      : selected;
    // Update state
    setEndTime(newDate);

    // workaround for not waiting for state update for onDataChange.
    let localStartTime = startTime;

    // If start time is invalid, set start time to 1hr before
    if (
      !startTime ||
      getMinutesFromStartOfDay(selected) <= getMinutesFromStartOfDay(startTime)
    ) {
      localStartTime = subMinutes(selected, 60);
      setStartTime(subMinutes(selected, 60));
    }

    // Call onDataChange
    if (saveOnEdit) {
      onDataChange({
        ...data,
        startAt: localStartTime.toISOString() || data.startAt,
        endAt: newDate.toISOString(),
      });
    }
  };

  return (
    <Div
      row
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      mb={8}
    >
      <Pressable
        disabled={!editable}
        onPress={() => {
          setStartPickerMode("date");
          setShowStartPicker(true);
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
          {!startTime ? (
            <BodyTextRegular color={theme.colors.textgray200}>
              Tap to edit
            </BodyTextRegular>
          ) : (
            <BodyTextRegular>
              {format(startTime, "EEEE, d MMM")}
            </BodyTextRegular>
          )}
        </Div>
      </Pressable>

      <Div row alignItems="center" justifyContent="flex-end">
        <Pressable
          disabled={!editable}
          onPress={() => {
            setStartPickerMode("time");
            setShowStartPicker(true);
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
          disabled={!editable}
          onPress={() => {
            setShowEndPicker(true);
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
            style={{
              marginLeft: 8,
            }}
            onPress={() => {
              if (!startTime || !endTime) {
                return;
              }
              onButtonPress({
                id: data?.id,
                startAt: addMinutes(
                  startOfDay(startTime),
                  getMinutesFromStartOfDay(startTime)
                ).toISOString(),
                endAt: addMinutes(
                  startOfDay(startTime),
                  getMinutesFromStartOfDay(endTime)
                ).toISOString(),
                userUid: data?.userUid,
                username: data?.username,
              } as PreferredDuration).then(() => {
                if (rightButtonType === "add") {
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

      {showStartPicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            startTime || roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
          //@ts-ignore
          mode={startPickerMode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeStartTime}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            endTime || roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
          //@ts-ignore
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeEndTime}
        />
      )}
    </Div>
  );
};

export default DateTimeRowComponent;
