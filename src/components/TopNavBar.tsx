import { PhosphorIcon } from "constants/Icons";
import { headerHeight } from "constants/Layout";
import { theme } from "constants/theme";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Badge, WINDOW_WIDTH } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "./AppLogo";
import Container from "./Container";
import { SmallText } from "./StyledText";
import withBadge from "./TimeGridSelector/withBadge";

interface Props {
  hideLogo?: boolean;
}

const TopNavBar = ({ hideLogo }: Props) => {
  const BadgedIcon = withBadge(1)(PhosphorIcon);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        width: WINDOW_WIDTH,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!hideLogo && (
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <AppLogo />
        </View>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          paddingBottom: 5, // the icon is not centered, this is the fix
          right: 40,
          // backgroundColor: "green",
        }}
      >
        <PhosphorIcon name="envelope" color={theme.colors.textdark} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TopNavBar;
