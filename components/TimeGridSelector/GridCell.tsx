import { theme } from "constants/theme";
import { add, format } from "date-fns";
import React from "react";
import { Box, Button, Icon, Text } from "react-native-magnus";

type cellProps = {
  start: Date;
};

const GridHalfCell = ({ start }: cellProps) => {
  let startTime = format(start, "HH:mm dd-MMM-yyyy");
  return (
    <Box
      bg={theme.colors.backgroundlight}
      h={20}
      w={200}
      onStartShouldSetResponder={(evt) => {
        // console.log("onStartShouldSetResponder fired");
        // console.log(evt.nativeEvent);
        return true;
      }}
      onMoveShouldSetResponder={(evt) => {
        // console.log("onMoveShouldSetResponder fired");
        // console.log(evt);
        return true;
      }}
      onResponderGrant={(evt) => {
        console.log("onResponderGrant fired");
        // console.log(evt);
      }}
      onResponderMove={(evt) => {
        console.log("onResponderMove fired");
        console.log(evt.nativeEvent.target);
      }}
      onResponderRelease={(evt) => {
        console.log("onResponderRelease fired");
        console.log(evt.nativeEvent.target);
      }}
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
