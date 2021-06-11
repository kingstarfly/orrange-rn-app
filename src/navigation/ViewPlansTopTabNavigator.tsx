import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConfirmedViewPlans from "screens/ViewPlans/Confirmed";
import InProgressViewPlans from "screens/ViewPlans/InProgress/InProgressViewPlans";
import { ViewPlansTabParamList } from "types/types";
import { Text } from "react-native-magnus";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import { headerHeight } from "constants/Layout";

const Tab = createMaterialTopTabNavigator<ViewPlansTabParamList>();

function ViewPlansTopTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Confirmed"
      tabBarOptions={{
        style: {
          backgroundColor: theme.colors.backgroundlight,
          elevation: 0,
          paddingTop: headerHeight,
          // paddingTop: headerHeight + insets.top,
        },
        labelStyle: {
          textTransform: "none",
          fontFamily: "inter-medium",
          fontSize: 20,
        },
        inactiveTintColor: "black",
        activeTintColor: "black",
        indicatorStyle: {
          backgroundColor: theme.colors.primary600,
          height: 4,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        },
      }}
    >
      <Tab.Screen
        name="Confirmed"
        component={ConfirmedViewPlans}
        options={{ tabBarLabel: "Confirmed" }}
      />
      <Tab.Screen
        name="InProgress"
        component={InProgressViewPlans}
        options={{ tabBarLabel: "In Progress" }}
      />
    </Tab.Navigator>
  );
}

export default ViewPlansTopTabNavigator;
