import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "constants/theme";
import { add, format } from "date-fns";
import { Box, Text } from "react-native-magnus";
import { cellProps } from "types/types";

const colourIntensity = [
  theme.colors.backgroundlight,
  theme.colors.primary200,
  theme.colors.primary300,
  theme.colors.primary400,
  theme.colors.primary500,
  theme.colors.primary600,
  theme.colors.primary700,
  theme.colors.primary800,
];

const GridHalfCell = ({ start, count = 0 }: cellProps) => {
  let startTime = format(start, "HH:mm dd-MMM-yyyy");
  return (
    <Pressable onPress={() => console.log(startTime)}>
      <Box bg={colourIntensity[count]} h={20} w={80} />
    </Pressable>
  );
};

const GridCell = ({ start, isRightMostCell, isBottomMostCell }: cellProps) => {
  let middle = add(start, { minutes: 30 });
  console.log(`${start.toISOString()}`);

  return (
    <Box
      borderColor={theme.colors.linegray}
      borderTopWidth={1}
      borderLeftWidth={1}
      borderRightWidth={isRightMostCell ? 1.5 : 0}
      borderBottomWidth={isBottomMostCell ? 1 : 0}
    >
      <GridHalfCell start={start} />
      <GridHalfCell start={middle} />
    </Box>
  );
};

export default GridCell;
