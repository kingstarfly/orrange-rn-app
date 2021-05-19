import { StackScreenProps } from "@react-navigation/stack";
import { DATE_FORMAT } from "components/DatePicker";
import StyledButton from "components/StyledButton";
import Day from "components/TimeGridSelector/Day";
import TimeLabels from "components/TimeGridSelector/TimeLabels";
import { theme } from "constants/theme";
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

// !! default start and end time, subject to change
export const START_TIME = 8;
export const END_TIME = 22;

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

  return (
    <Container>
      <Text
        mt={height * 0.08}
        mb={height * 0.02}
        px={width * 0.2}
        textAlign="center"
        fontSize="5xl"
      >
        What are your free time slots?
      </Text>
      <ScrollView style={styles.scrollViewContainer}>
        <ScrollView horizontal>
          {/* <Text>Timings</Text> */}
          <TimeLabels startTime={START_TIME} endTime={END_TIME} />
          {dateStrings.map((dateString, index) => {
            return (
              <Day
                key={index}
                date={parse(dateString, DATE_FORMAT, new Date())}
                startTime={START_TIME}
                endTime={END_TIME}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
      <Box
        position="absolute"
        bottom={25}
        justifyContent="space-around"
        flexDir="row"
        w="100%"
      >
        <StyledButton
          onPress={() => navigation.push("MeetupDetails")}
          bg={theme.colors.gray5}
        >
          Skip for now
        </StyledButton>

        <StyledButton
          onPress={() => navigation.push("MeetupDetails")}
          bg={theme.colors.primary400}
        >
          Confirm
        </StyledButton>
      </Box>
    </Container>
  );
};

export default PickTime;
