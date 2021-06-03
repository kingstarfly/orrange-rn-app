/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import SelectDates from "screens/Create/SelectDates";
import SelectTime from "screens/Create/SelectTime";
import PublicFeed from "screens/PublicFeed";
import ViewPlansTopTabNavigator from "./ViewPlansTopTabNavigator";

import { RootStackParamList } from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "constants/theme";
import MeetupDetails from "screens/Create/MeetupDetails";
import TestScreen from "screens/TestScreen";
import { Text } from "react-native-magnus";
import PalsTopTabvNavigator from "./PalsTopTabvNavigator";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
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
      initialRouteName="Pals" //!! to change
    >
      <Stack.Screen
        name="PublicFeed"
        component={PublicFeed}
        options={{ title: "Public Feed" }}
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

      <Stack.Screen
        name="ViewPlans"
        component={ViewPlansTopTabNavigator}
        options={{
          title: "View Plans",
        }}
      />

      <Stack.Screen
        name="MeetupDetails"
        component={MeetupDetails}
        options={{ title: "Meetup Details" }}
      />

      <Stack.Screen
        name="Pals"
        component={PalsTopTabvNavigator}
        options={{ title: "Pals" }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
