import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateMeetupStackNavigator from "./CreateMeetupStackNavigator";
import PalsTopTabvNavigator from "./PalsTopTabvNavigator";
import ViewPlansNavigator from "./ViewPlansNavigator";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: theme.colors.primary700,
        inactiveTintColor: theme.colors.textdark,
        style: {
          height: 80,
          // For Android
          elevation: 5,

          // For IOS // TODO: to test on IOS simulator
          shadowOffset: { height: 10, width: 10 },
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Plans"
        component={ViewPlansNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            let iconName = focused ? "house-fill" : "house";
            return <PhosphorIcon color={color} name={iconName} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateMeetupStackNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            let iconName = focused ? "plus-circle-fill" : "plus-circle";
            return <PhosphorIcon color={color} name={iconName} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="Pals"
        component={PalsTopTabvNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            let iconName = focused ? "users-fill" : "users";
            return <PhosphorIcon color={color} name={iconName} size={30} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomTabNavigator;
