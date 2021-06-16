import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "constants/theme";
import { add, format } from "date-fns";
import { Box, Text } from "react-native-magnus";
import { cellProps } from "types/types";

const GridHalfCell = ({ start }: cellProps) => {
  let startTime = format(start, "HH:mm dd-MMM-yyyy");
  return (
    <Pressable onPress={() => console.log(startTime)}>
      <Box bg={theme.colors.backgroundlight} h={20} w={80}>
        <Text>{startTime}</Text>
      </Box>
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
