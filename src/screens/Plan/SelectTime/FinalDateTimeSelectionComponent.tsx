import { BodyTextRegular, CaptionText, MiniText } from "components/StyledText";
import { theme } from "constants/theme";
import { format, roundToNearestMinutes } from "date-fns";
import React from "react";
import { Pressable } from "react-native";
import { Div, WINDOW_WIDTH } from "react-native-magnus";

import DateTimePicker from "@react-native-community/datetimepicker";

const FinalDateTimeSelectionComponent = () => {
  const [fromDate, setFromDate] = React.useState<Date>(null);
  const [fromMode, setFromMode] = React.useState("date");
  const [showFromDateTimePicker, setShowFromDateTimePicker] =
    React.useState(false);

  const [toDate, setToDate] = React.useState<Date>(null);
  const [toMode, setToMode] = React.useState("date");
  const [showToDateTimePicker, setShowToDateTimePicker] = React.useState(false);

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
    setShowToDateTimePicker(false); // closes the picker
    setToDate(currentDate);
  };

  return (
    <Div>
      <Div row justifyContent="space-between">
        <CaptionText w={45}>Start: </CaptionText>
        <Div
          borderColor={theme.colors.linegray}
          borderWidth={1}
          w={WINDOW_WIDTH * 0.55}
          h={35}
          py={4}
          rounded={5}
          justifyContent="center"
          alignItems="center"
        >
          <Pressable
            onPress={() => {
              setFromMode("date");
              setShowFromDateTimePicker(true);
            }}
          >
            {!fromDate ? (
              <BodyTextRegular color={theme.colors.textgray200}>
                Tap to edit
              </BodyTextRegular>
            ) : (
              <BodyTextRegular>
                {format(fromDate, "EEEE, d MMM")}
              </BodyTextRegular>
            )}
          </Pressable>
        </Div>

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
            {!fromDate ? (
              <CaptionText>-- : --</CaptionText>
            ) : (
              <CaptionText>{format(fromDate, "HH:mm")}</CaptionText>
            )}
          </Div>
        </Pressable>
      </Div>

      <Div row justifyContent="space-between" mt={16}>
        <CaptionText w={45}>End: </CaptionText>
        <Div
          borderColor={theme.colors.linegray}
          borderWidth={1}
          w={WINDOW_WIDTH * 0.55}
          h={35}
          py={4}
          rounded={5}
          justifyContent="center"
          alignItems="center"
        >
          <Pressable
            onPress={() => {
              setToMode("date");
              setShowToDateTimePicker(true);
            }}
          >
            {!toDate ? (
              <BodyTextRegular color={theme.colors.textgray200}>
                Tap to edit
              </BodyTextRegular>
            ) : (
              <BodyTextRegular>{format(toDate, "EEEE, d MMM")}</BodyTextRegular>
            )}
          </Pressable>
        </Div>

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
            {!toDate ? (
              <CaptionText>-- : --</CaptionText>
            ) : (
              <CaptionText>{format(toDate, "HH:mm")}</CaptionText>
            )}
          </Div>
        </Pressable>
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

export default FinalDateTimeSelectionComponent;
