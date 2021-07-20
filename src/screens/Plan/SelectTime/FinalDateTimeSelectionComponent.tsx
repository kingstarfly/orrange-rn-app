import { CaptionText } from "components/StyledText";
import { theme } from "constants/theme";
import { format, roundToNearestMinutes } from "date-fns";
import React from "react";
import { Pressable } from "react-native";
import { Div, WINDOW_WIDTH } from "react-native-magnus";

import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  finalStartTime: Date;
  setFinalStartTime: React.Dispatch<React.SetStateAction<Date>>;
  finalEndTime: Date;
  setFinalEndTime: React.Dispatch<React.SetStateAction<Date>>;
}

const FinalDateTimeSelectionComponent = ({
  finalStartTime,
  finalEndTime,
  setFinalStartTime,
  setFinalEndTime,
}: Props) => {
  const [fromMode, setFromMode] = React.useState("date");
  const [showFromDateTimePicker, setShowFromDateTimePicker] =
    React.useState(false);

  const [toMode, setToMode] = React.useState("date");
  const [showToDateTimePicker, setShowToDateTimePicker] = React.useState(false);

  const onChangeFrom = (_, selectedDate: Date) => {
    if (!selectedDate) {
      setShowFromDateTimePicker(false);
      return;
    }
    const currentDate = selectedDate || finalStartTime;
    if (fromMode === "date") {
      setFinalStartTime(currentDate);
      setFromMode("time");
      return;
    }
    setShowFromDateTimePicker(false); // closes the picker
    setFinalStartTime(currentDate);
  };
  const onChangeTo = (_, selectedDate: Date) => {
    if (!selectedDate) {
      setShowToDateTimePicker(false);
      return;
    }

    const currentDate = selectedDate || finalEndTime;
    if (toMode === "date") {
      setFinalEndTime(currentDate);
      setToMode("time");
      return;
    }
    // Checks here
    setShowToDateTimePicker(false); // closes the picker
    setFinalEndTime(currentDate);
  };

  return (
    <Div>
      <Div row justifyContent="space-between" alignItems="center">
        <CaptionText w={70}>Start: </CaptionText>
        <Div row justifyContent="space-between" flex={1}>
          <Pressable
            onPress={() => {
              setFromMode("date");
              setShowFromDateTimePicker(true);
            }}
          >
            <Div
              borderColor={theme.colors.linegray}
              borderWidth={1}
              w={WINDOW_WIDTH * 0.5}
              h={35}
              py={4}
              rounded={5}
              justifyContent="center"
              alignItems="center"
            >
              {!finalStartTime ? (
                <CaptionText color={theme.colors.textgray200}>
                  Tap to edit
                </CaptionText>
              ) : (
                <CaptionText>
                  {format(finalStartTime, "EEEE, d MMM")}
                </CaptionText>
              )}
            </Div>
          </Pressable>

          <Pressable
            onPress={() => {
              setFromMode("time");
              setShowFromDateTimePicker(true);
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
              {!finalStartTime ? (
                <CaptionText>-- : --</CaptionText>
              ) : (
                <CaptionText>{format(finalStartTime, "HH:mm")}</CaptionText>
              )}
            </Div>
          </Pressable>
        </Div>
      </Div>

      <Div row justifyContent="space-between" mt={16}>
        <CaptionText w={70}>End: </CaptionText>
        <Div row justifyContent="space-between" flex={1}>
          <Pressable
            onPress={() => {
              setToMode("date");
              setShowToDateTimePicker(true);
            }}
          >
            <Div
              borderColor={theme.colors.linegray}
              borderWidth={1}
              w={WINDOW_WIDTH * 0.5}
              h={35}
              py={4}
              rounded={5}
              justifyContent="center"
              alignItems="center"
            >
              {!finalEndTime ? (
                <CaptionText color={theme.colors.textgray200}>
                  Tap to edit
                </CaptionText>
              ) : (
                <CaptionText>{format(finalEndTime, "EEEE, d MMM")}</CaptionText>
              )}
            </Div>
          </Pressable>

          <Pressable
            onPress={() => {
              setToMode("time");
              setShowToDateTimePicker(true);
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
              {!finalEndTime ? (
                <CaptionText>-- : --</CaptionText>
              ) : (
                <CaptionText>{format(finalEndTime, "HH:mm")}</CaptionText>
              )}
            </Div>
          </Pressable>
        </Div>
      </Div>

      {showFromDateTimePicker && (
        <DateTimePicker
          minuteInterval={30}
          value={
            finalStartTime ||
            roundToNearestMinutes(new Date(), { nearestTo: 30 })
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
          value={
            finalEndTime || roundToNearestMinutes(new Date(), { nearestTo: 30 })
          }
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

export default FinalDateTimeSelectionComponent;
