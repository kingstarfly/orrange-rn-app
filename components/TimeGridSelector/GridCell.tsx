import React from "react";
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
      w={200}
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
        console.log(evt.nativeEvent.pageY);
      }}
      onResponderMove={(evt) => {
        // console.log("onResponderMove fired");
        // console.log(evt.nativeEvent.touches[0].touches[0]);
      }}
      onResponderRelease={(evt) => {
        // console.log("onResponderRelease fired");
        console.log(evt.nativeEvent.target);
      }}
      onResponderTerminationRequest={(evt) => true}
    >
      <Text>{startTime}</Text>
    </Box>
  );
};

const GridCell = ({ start }: cellProps) => {
  let middle = add(start, { minutes: 30 });
  return (
    <Box borderColor={theme.colors.linegray} borderWidth={0.7}>
      <GridHalfCell start={start} />
      <GridHalfCell start={middle} />
    </Box>
  );
};

export default GridCell;
