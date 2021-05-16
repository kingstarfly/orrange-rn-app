import { StackScreenProps } from "@react-navigation/stack";
import { DATE_FORMAT } from "components/DatePicker";
import Day from "components/TimeGridSelector/Day";
import { compareAsc, parse } from "date-fns";
import React from "react";
import {
  useWindowDimensions,
  FlatList,
  ScrollView,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Box, Button, Text } from "react-native-magnus";
import { useAppSelector } from "redux/hooks";
import { styles } from "screens/ViewPlans/styles";
import BottomNavBar from "../../components/BottomNavBar";
import Container from "../../components/Container";
import { RootStackParamList } from "../../types";

const PickTime = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PickTime">) => {
  const { width, height } = useWindowDimensions();

  const selected = useAppSelector((state) => state.DatePicker.selected);

  const dateStrings = Object.keys(selected);
  dateStrings.sort((a, b) =>
    compareAsc(
      parse(a, DATE_FORMAT, new Date()),
      parse(b, DATE_FORMAT, new Date())
    )
  );

  const renderDateString = ({ item: dateString }) => (
    <Day
      date={parse(dateString, DATE_FORMAT, new Date())}
      startTime={8}
      endTime={22}
    />
  );

  return (
    <Container>
      <Text
        mt={height * 0.1}
        px={width * 0.2}
        textAlign="center"
        fontSize="5xl"
      >
        What are your free time slots?
      </Text>
      <ScrollView style={styles.scrollViewContainer}>
        <ScrollView horizontal>
          {dateStrings.map((dateString, index) => {
            return (
              <Day
                key={index}
                date={parse(dateString, DATE_FORMAT, new Date())}
                startTime={8}
                endTime={22}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </Container>
  );
};

export default PickTime;
