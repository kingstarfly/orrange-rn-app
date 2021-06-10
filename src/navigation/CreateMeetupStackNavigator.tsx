import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "src/constants/theme";
import MeetupDetails from "src/screens/Create/MeetupDetails";
import SelectDates from "src/screens/Create/SelectDates";
import SelectTime from "src/screens/Create/SelectTime";

const Stack = createStackNavigator();

function CreateMeetupStackNavigator() {
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
      <Stack.Screen
        name="MeetupDetails"
        component={MeetupDetails}
        options={{ title: "Meetup Details" }}
      />
      <Stack.Screen
        name="SelectDates"
        component={SelectDates}
        options={{ title: "Pick Date" }}
      />

      <Stack.Screen
        name="SelectTime"
        component={SelectTime}
        options={{ title: "Pick Time" }}
      />
    </Stack.Navigator>
  );
}

export default CreateMeetupStackNavigator;
