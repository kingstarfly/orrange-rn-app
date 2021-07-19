import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConfirmedViewPlans from "screens/ViewPlans/Confirmed";
import InProgressViewPlans from "screens/ViewPlans/InProgress/InProgressViewPlans";
import { ViewPlansTabParamList } from "types/types";
import { Text } from "react-native-magnus";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import { headerHeight } from "constants/Layout";
import { createStackNavigator } from "@react-navigation/stack";
import { StackFrame } from "react-native/Libraries/Core/Devtools/parseErrorStack";
import AppLogo from "components/AppLogo";
import TopNavBar from "components/TopNavBar";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator<ViewPlansTabParamList>();

function InnerTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Confirmed"
      tabBarOptions={{
        style: {
          backgroundColor: theme.colors.backgroundlight,
          elevation: 0,
          // paddingTop: headerHeight,
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

function ViewPlansNavigator() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundlight,
          elevation: 0,
          shadowOpacity: 0,
          height: headerHeight,
        },
        headerTintColor: theme.colors.textdark,
        headerTransparent: false,
        headerBackTitleVisible: false,
        headerBackAllowFontScaling: true,
      }}
    >
      <Stack.Screen
        name="ViewPlansTabNavigator"
        options={({ route }) => ({
          headerTitle: () => {
            return <TopNavBar />;
          },
          headerTitleAlign: "left",
        })}
        component={InnerTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default ViewPlansNavigator;
