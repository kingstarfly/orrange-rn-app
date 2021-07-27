import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PhosphorIcon } from "constants/Icons";
import { headerHeight } from "constants/Layout";
import { theme } from "constants/theme";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Badge, WINDOW_HEIGHT, WINDOW_WIDTH } from "react-native-magnus";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppStackParamList } from "types/types";
import AppLogo from "./AppLogo";
import Container from "./Container";
import withBadge from "./TimeGridSelector/withBadge";

interface Props {
  hideLogo?: boolean;
}

const TopNavBar = ({ hideLogo }: Props) => {
  const BadgedIcon = withBadge(1)(PhosphorIcon);
  const { top } = useSafeAreaInsets();

  const navigation =
    useNavigation<
      StackNavigationProp<AppStackParamList, "MainBottomTabNavigator">
    >();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingTop: top + WINDOW_HEIGHT * 0.015,
        width: WINDOW_WIDTH,
        // backgroundColor: "red",
        height: headerHeight,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {!hideLogo && (
        <View
          style={{
            alignSelf: "flex-start",
            // backgroundColor: "blue",
          }}
        >
          <AppLogo />
        </View>
      )}

      <TouchableOpacity
        // style={{
        //   position: "absolute",
        //   top: 10,
        //   paddingBottom: 5, // the icon is not centered, this is the fix
        //   right: 40,
        //   // backgroundColor: "green",
        // }}
        style={{
          alignSelf: "flex-start",
          bottom: 15, // the icon is not centered, this is the fix
          right: 35,
        }}
        onPress={() => {
          navigation.push("Contacts");
        }}
      >
        <PhosphorIcon name="envelope" color={theme.colors.textdark} size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavBar;
