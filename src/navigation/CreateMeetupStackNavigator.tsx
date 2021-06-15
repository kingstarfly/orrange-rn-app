import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "constants/theme";
import MeetupDetails from "screens/Create/MeetupDetails";
import SelectDates from "screens/Create/SelectDates";
import SelectTime from "screens/Create/SelectTime";
import { CreateMeetupStackParamList } from "types/types";
import { PhosphorIcon } from "constants/Icons";

const Stack = createStackNavigator<CreateMeetupStackParamList>();

function CreateMeetupStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: theme.colors.textdark,
        headerTitle: "",
        headerTransparent: true,
        headerBackImage: ({ tintColor }) => (
          <PhosphorIcon name="caret-left" size={30} color={tintColor} />
        ),
        headerLeftContainerStyle: { paddingLeft: 10 },
      }}
      initialRouteName="MeetupDetails"
    >
      <Stack.Screen
        name="MeetupDetails"
        component={MeetupDetails}
        options={{ title: "Meetup Details", header: () => null }}
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
