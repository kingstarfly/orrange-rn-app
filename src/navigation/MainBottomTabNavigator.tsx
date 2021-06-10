import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateMeetupStackNavigator from "./CreateMeetupStackNavigator";
import PalsTopTabvNavigator from "./PalsTopTabvNavigator";
import ViewPlansTopTabNavigator from "./ViewPlansTopTabNavigator";

const Tab = createBottomTabNavigator();

function MainBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Plans" component={ViewPlansTopTabNavigator} />
      <Tab.Screen name="Create" component={CreateMeetupStackNavigator} />
      <Tab.Screen name="Pals" component={PalsTopTabvNavigator} />
    </Tab.Navigator>
  );
}

export default MainBottomTabNavigator;
