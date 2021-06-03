import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConfirmedViewPlans from "screens/ViewPlans/Confirmed";
import InProgressViewPlans from "screens/ViewPlans/InProgress/InProgressViewPlans";
import { PalsTabParamList } from "types/types";
import { Text } from "react-native-magnus";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import ViewPals from "screens/Pals/ViewPals";
import AddPals from "screens/Pals/AddPals";

const Tab = createMaterialTopTabNavigator<PalsTabParamList>();

function PalsTopTabvNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="ViewPals"
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
        name="ViewPals"
        component={ViewPals}
        options={{ tabBarLabel: "Pals" }}
      />
      <Tab.Screen
        name="AddPals"
        component={AddPals}
        options={{ tabBarLabel: "Add Pals" }}
      />
    </Tab.Navigator>
  );
}

export default PalsTopTabvNavigator;
