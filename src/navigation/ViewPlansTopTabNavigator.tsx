import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConfirmedViewPlans from "src/screens/ViewPlans/Confirmed";
import InProgressViewPlans from "src/screens/ViewPlans/InProgress/InProgressViewPlans";
import { ViewPlansTabParamList } from "types/types";
import { Text } from "react-native-magnus";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "src/constants/theme";
import ConfimedPlansStackNavigator from "./ConfimedPlansStackNavigator";

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
          marginTop: insets.top,
        },
        labelStyle: {
          textTransform: "none",
        },
        inactiveTintColor: "black",
        activeTintColor: "black",
        indicatorStyle: {
          backgroundColor: theme.colors.primary600,
          height: 4,
        },
      }}
    >
      <Tab.Screen
        name="Confirmed"
        component={ConfimedPlansStackNavigator}
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
