import React, { useRef } from "react";
import { theme } from "constants/theme";
import { add, format } from "date-fns";
import { Box, Text } from "react-native-magnus";
import { cellProps } from "types";

const GridHalfCell = ({ start }: cellProps) => {
  let startTime = format(start, "HH:mm dd-MMM-yyyy");
  return (
    <Box
      bg={theme.colors.backgroundlight}
      h={20}
      w={80}
      onStartShouldSetResponder={(evt) => {
        // console.log("onStartShouldSetResponder fired");
        // console.log(evt.nativeEvent.target);
        return true;
      }}
      onMoveShouldSetResponder={(evt) => {
        // console.log("onMoveShouldSetResponder fired");
        // console.log(evt.nativeEvent.target);
        return true;
      }}
      onResponderGrant={(evt) => {
        // console.log("onResponderGrant fired");
        // console.log(evt.currentTarget);
        // console.log(
        //   `${evt.currentTarget} - ${evt.nativeEvent.locationX.toPrecision(
        //     4
        //   )}, ${evt.nativeEvent.locationX.toPrecision(4)}`
        // );
      }}
      onResponderMove={(evt) => {
        // console.log("onResponderMove fired");
        // console.log(evt.nativeEvent.touches[0].touches[0]);
        // console.log(evt.nativeEvent.target);
      }}
      onResponderRelease={(evt) => {
        // console.log("onResponderRelease fired");
        // console.log(evt.nativeEvent.target);
      }}
      onResponderTerminationRequest={(evt) => true}
    >
      {/* <Text>{startTime}</Text> */}
    </Box>
  );
};

const GridCell = ({ start, isRightMostCell, isBottomMostCell }: cellProps) => {
  let middle = add(start, { minutes: 30 });

  let startRef = useRef(start.toISOString());
  let middleRef = useRef(middle.toISOString());
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
