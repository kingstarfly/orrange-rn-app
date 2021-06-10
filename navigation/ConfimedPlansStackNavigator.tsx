import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "constants/theme";
import MeetupDetails from "screens/Create/MeetupDetails";
import SelectDates from "screens/Create/SelectDates";
import SelectTime from "screens/Create/SelectTime";
import ConfirmedViewPlans from "screens/ViewPlans/Confirmed";
import Plan from "screens/Plan/Plan";

const Stack = createStackNavigator();

function ConfimedPlansStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundlight,
          elevation: 0,
          shadowOpacity: 0,
        },

        headerLeftContainerStyle: {
          paddingHorizontal: 8,
        },

        headerTintColor: theme.colors.textdark,
        headerTitleStyle: {
          fontFamily: "inter-regular",
          textAlignVertical: "center",
          marginHorizontal: 0,
        },
        headerTransparent: true,
        headerBackTitleVisible: true,
        headerTitle: "",
        headerBackAllowFontScaling: true,
      }}
    >
      <Stack.Screen name="List" component={ConfirmedViewPlans} />
      <Stack.Screen name="IndividualPlan" component={Plan} />
    </Stack.Navigator>
  );
}

export default ConfimedPlansStackNavigator;
