import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "src/constants/theme";
import { add, format } from "date-fns";
import { Box, Text } from "react-native-magnus";
import { cellProps } from "types/types";

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

const GridCell = ({
  start,
  isRightMostCell,
  isBottomMostCell,
  x,
}: cellProps) => {
  let middle = add(start, { minutes: 30 });

  // useEffect(() => {
  //   if (gridRef.current) {
  //     gridRef.current.measureInWindow((res) => {
  //       console.log(res);
  //     });
  //   }
  // }, [measure]);
  let startRef = useRef(start.toISOString());
  let middleRef = useRef(middle.toISOString());
  console.log(`${start.toISOString()} - ${x}`);

  const handlePressOut = (e) => {
    // Create 2 hour period draggable - create a new component that takes in which start period it is
    console.log(start.toISOString());
  };
  return (
    <Box
      borderColor={theme.colors.linegray}
      borderTopWidth={1}
      borderLeftWidth={1}
      borderRightWidth={isRightMostCell ? 1.5 : 0}
      borderBottomWidth={isBottomMostCell ? 1 : 0}
      onTouchEnd={handlePressOut}
      // onLayout={(e) => console.log(e.nativeEvent.layout)}
    >
      <GridHalfCell start={start} />

      <GridHalfCell start={middle} />
    </Box>
  );
};

export default GridCell;
