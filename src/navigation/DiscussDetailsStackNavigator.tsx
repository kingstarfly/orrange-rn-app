import React from "react";
import { DiscussDetailsStackParamList } from "types/types";
import { theme } from "constants/theme";
import { createStackNavigator } from "@react-navigation/stack";

import { PhosphorIcon } from "constants/Icons";
import DiscussDetailsScreen from "screens/Plan/DiscussDetailsScreen";
import AddParticipantsScreen from "screens/Plan/AddParticipantsScreen";
import SelectTime from "screens/Plan/SelectTime";

const Stack = createStackNavigator<DiscussDetailsStackParamList>();

function DiscussDetailsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DiscussDetails"
      screenOptions={{
        headerTintColor: theme.colors.textdark,
        headerTitle: "",
        headerTransparent: true,
        headerBackImage: ({ tintColor }) => (
          <PhosphorIcon name="caret-left" size={30} color={tintColor} />
        ),
        headerLeftContainerStyle: { paddingLeft: 10 },
      }}
    >
      <Stack.Screen name="DiscussDetails" component={DiscussDetailsScreen} />
      <Stack.Screen name="AddParticipants" component={AddParticipantsScreen} />
      <Stack.Screen name="PickTime" component={SelectTime} />
    </Stack.Navigator>
  );
}

export default DiscussDetailsStackNavigator;
