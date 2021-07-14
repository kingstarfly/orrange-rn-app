import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "constants/theme";
import { add, format } from "date-fns";
import { Box, Text } from "react-native-magnus";
import { StartTimeMapToNumber } from "types/types";

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

type CellProps = {
  start: Date;
  isBottomMostCell?: boolean;
  isRightMostCell?: boolean;
  timingsData: StartTimeMapToNumber;
};

type HalfCellProps = Pick<CellProps, "start"> & {
  count: number;
};

const GridHalfCell = ({ start, count = 0 }: HalfCellProps) => {
  let startTime = format(start, "HH:mm dd-MMM-yyyy");
  return <Box bg={colourIntensity[count]} h={20} w={80} />;
};

const GridCell = ({
  start,
  isRightMostCell,
  isBottomMostCell,
  timingsData,
}: CellProps) => {
  let middle = add(start, { minutes: 30 });

  const countA = timingsData?.[start.toISOString()];
  const countB = timingsData?.[middle.toISOString()];

  // console.log(`Count A: ${countA}`);
  // console.log(`Count B: ${countB}`);

  return (
    <Box
      borderColor={theme.colors.linegray}
      borderTopWidth={1}
      borderLeftWidth={1}
      borderRightWidth={isRightMostCell ? 1.5 : 0}
      borderBottomWidth={isBottomMostCell ? 1 : 0}
    >
      <GridHalfCell start={start} count={countA} />
      <GridHalfCell start={middle} count={countB} />
    </Box>
  );
};

export default GridCell;
