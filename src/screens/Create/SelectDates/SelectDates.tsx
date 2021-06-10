import { StackScreenProps } from "@react-navigation/stack";
import DatePicker from "src/screens/Create/SelectDates/DatePicker";
import StyledButton from "components/StyledButton";
import { theme } from "src/constants/theme";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "components/BottomNavBar";
import Container from "components/Container";
import { RootStackParamList } from "types/types";

const SelectDates = ({
  navigation,
}: StackScreenProps<RootStackParamList, "SelectDates">) => {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <Text
        mt={height * 0.1}
        px={width * 0.1}
        textAlign="center"
        fontSize="5xl"
      >
        Which days do you wish to meet on?
      </Text>
      <Box flex={1} alignItems="center">
        <DatePicker />
      </Box>

      <StyledButton
        onPress={() => navigation.push("SelectTime")}
        bg={theme.colors.primary400}
        position="absolute"
        bottom={25}
      >
        Confirm
      </StyledButton>
    </Container>
  );
};

export default SelectDates;
