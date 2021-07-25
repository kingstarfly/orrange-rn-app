import React from "react";
import { Pressable } from "react-native";
import { theme } from "constants/theme";
import { Box } from "react-native-magnus";

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
  isBottomMostCell?: boolean;
  isRightMostCell?: boolean;
  occupantsArr: string[][]; // Holds occupants for each half cell
};

type HalfCellProps = {
  occupants: string[];
};

const GridHalfCell = ({ occupants = [] }: HalfCellProps) => {
  const occupantsSet = new Set(occupants);
  return (
    <Pressable>
      <Box bg={colourIntensity[occupantsSet.size]} h={20} w={80} />
    </Pressable>
  );
};

const GridCell = ({
  isRightMostCell,
  isBottomMostCell,
  occupantsArr,
}: CellProps) => {
  return (
    <Box
      borderColor={theme.colors.linegray}
      borderTopWidth={1}
      borderLeftWidth={1}
      borderRightWidth={isRightMostCell ? 1.5 : 0}
      borderBottomWidth={isBottomMostCell ? 1 : 0}
    >
      {occupantsArr.map((occupants) => (
        <GridHalfCell occupants={occupants} />
      ))}
    </Box>
  );
};

export default GridCell;
