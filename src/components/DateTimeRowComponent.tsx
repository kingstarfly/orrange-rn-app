import { PhosphorIcon } from "constants/Icons";
import { width } from "constants/Layout";
import { theme } from "constants/theme";
import {
  addMinutes,
  format,
  isBefore,
  isSameDay,
  parseISO,
  subMinutes,
  startOfDay,
} from "date-fns";
import React from "react";
import { View, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { PreferredDuration } from "types/types";
import { BodyTextRegular } from "./StyledText";
import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";
import { Alert } from "react-native";
import { getMinutesFromStartOfDay } from "lib/helpers";

interface Props {
  preferredDuration: PreferredDuration;
  mode: "add" | "edit" | "default";
  handleAddButtonPress?: (preferredDuration: PreferredDuration) => void; // without id key
  handleDeleteButtonPress?: (preferredDurationId: string) => void;
}

const DateTimeRowComponent = ({
  preferredDuration,
  mode = "default",
  handleAddButtonPress,
  handleDeleteButtonPress,
}: Props) => {
  const [startPickerVisible, setStartPickerVisible] = React.useState(false);
  const [endPickerVisible, setEndPickerVisible] = React.useState(false);

  const [startTime, setStartTime] = React.useState<Date>(
    preferredDuration ? parseISO(preferredDuration.startAt) : undefined
  );
  const [endTime, setEndTime] = React.useState<Date>(
    preferredDuration ? parseISO(preferredDuration.endAt) : undefined
  );

  const handleStartPickerConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setStartPickerVisible(false);

    console.log(endTime, date);
    if (!endTime) {
      setEndTime(addMinutes(date, 60));
    } else if (!isSameDay(date, endTime)) {
      setEndTime(
        addMinutes(startOfDay(date), getMinutesFromStartOfDay(endTime))
      );
    } else if (!isBefore(date, endTime)) {
      setEndTime(addMinutes(date, 60));
    }
    setStartTime(date);
  };

  const handleEndPickerConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setEndPickerVisible(false);

    if (!startTime) {
      Alert.alert("", "Please input a start time first!");
      return;
    }

    const mins = getMinutesFromStartOfDay(date);
    const endDate = addMinutes(startOfDay(startTime), mins);
    if (!isBefore(startTime, endDate)) {
      setStartTime(subMinutes(endDate, 60));
    }
    setEndTime(endDate);
  };

  const handleAdd = () => {
    // Checks startTime and endTime
    if (!startTime || !endTime) {
      Alert.alert("", "Invalid input");
      return;
    }

    Alert.alert("", "Do you want to add this timing?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Add",
        onPress: async () => {
          const preferredDurationWithoutId: PreferredDuration = {
            ...preferredDuration,
            startAt: startTime.toISOString(),
            endAt: endTime.toISOString(),
          };

          setStartTime(null);
          setEndTime(null);
          handleAddButtonPress(preferredDurationWithoutId);
        },
      },
    ]);
  };

  const handleDelete = () => {
    console.log("Handle Delete");
    Alert.alert("", "Do you really want to delete this timing?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          handleDeleteButtonPress(preferredDuration.id);
        },
      },
    ]);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <DateTimePickerModal
        isVisible={startPickerVisible}
        date={startTime || new Date()}
        //@ts-ignore
        mode="datetime"
        onConfirm={handleStartPickerConfirm}
        onCancel={() => setStartPickerVisible(false)}
        minuteInterval={30}
      />
      <DateTimePickerModal
        isVisible={endPickerVisible}
        //@ts-ignore
        date={endTime || new Date()}
        mode="time"
        onConfirm={handleEndPickerConfirm}
        onCancel={() => setEndPickerVisible(false)}
        minuteInterval={30}
      />
      <Pressable
        disabled={mode === "default"}
        style={[styles.box, { flex: 5 }]}
        onPress={() => {
          setStartPickerVisible(true);
        }}
      >
        {startTime ? (
          <BodyTextRegular>{format(startTime, "EEEE, d MMM")}</BodyTextRegular>
        ) : (
          <BodyTextRegular color={theme.colors.textgray200}>
            Tap to edit
          </BodyTextRegular>
        )}
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
          flex: 4,
        }}
      >
        <Pressable
          disabled={mode === "default"}
          style={[styles.box, styles.timeBox]}
          onPress={() => {
            setStartPickerVisible(true);
          }}
        >
          {startTime ? (
            <BodyTextRegular>{format(startTime, "HH:mm")}</BodyTextRegular>
          ) : (
            <BodyTextRegular color={theme.colors.textgray200}>
              -- : --
            </BodyTextRegular>
          )}
        </Pressable>
        <View style={{ justifyContent: "center" }}>
          <BodyTextRegular>-</BodyTextRegular>
        </View>
        <Pressable
          disabled={mode === "default"}
          style={[styles.box, styles.timeBox]}
          onPress={() => {
            setEndPickerVisible(true);
          }}
        >
          {endTime ? (
            <BodyTextRegular>{format(endTime, "HH:mm")}</BodyTextRegular>
          ) : (
            <BodyTextRegular color={theme.colors.textgray200}>
              -- : --
            </BodyTextRegular>
          )}
        </Pressable>
      </View>
      {mode === "add" ? (
        <TouchableOpacity
          style={{ justifyContent: "center", flex: 1 }}
          onPress={() => handleAdd()}
        >
          <PhosphorIcon
            name="plus-circle"
            color={theme.colors.textdark}
            size={28}
          />
        </TouchableOpacity>
      ) : mode === "edit" ? (
        <TouchableOpacity
          style={{ justifyContent: "center", flex: 1 }}
          onPress={() => handleDelete()}
        >
          <PhosphorIcon
            name="minus-circle-fill"
            color={theme.colors.red}
            size={28}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    backgroundColor: theme.colors.backgroundlight,
    borderWidth: 1,
    borderColor: theme.colors.linegray,
    borderRadius: 4,
  },
  dateBox: {
    width: width * 0.45,
  },
  timeBox: {
    paddingHorizontal: 8,
  },
});

export default DateTimeRowComponent;
