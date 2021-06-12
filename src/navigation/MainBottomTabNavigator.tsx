import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateMeetupStackNavigator from "./CreateMeetupStackNavigator";
import PalsTopTabvNavigator from "./PalsTopTabvNavigator";
import ViewPlansTopTabNavigator from "./ViewPlansTopTabNavigator";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Plans"
        component={ViewPlansTopTabNavigator}
        // options={{
        //   tabBarIcon: ({ focused, size, color }) => {
        //     let iconName = focused ? "house" : "house-fill";
        //     return (
        //       <PhosphorIcon
        //         color={theme.colors.textdark}
        //         name={iconName}
        //         size={30}
        //       />
        //     );
        //   },
        // }}
      />
      <Tab.Screen name="Create" component={CreateMeetupStackNavigator} />
      <Tab.Screen name="Pals" component={PalsTopTabvNavigator} />
    </Tab.Navigator>
  );
}

export default MainBottomTabNavigator;
