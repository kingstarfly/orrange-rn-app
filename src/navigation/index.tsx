/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from "react";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";

import { AuthStackParamList, RootStackParamList } from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "constants/theme";

import TestScreen from "screens/TestScreen";

import LoginScreen from "screens/Authentication/LoginScreen";
import VerificationScreen from "screens/Authentication/VerificationScreen";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import ContactsScreen from "screens/Contacts/ContactsScreen";
import { useAuth } from "lib/auth";
import DiscussDetailsScreen from "screens/Plan/DiscussDetailsScreen";
import { headerHeight } from "constants/Layout";
import FinalDetailsScreen from "screens/Plan/FinalDetailsScreen";
import AppLogo from "components/AppLogo";

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
const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Verify"
      component={VerificationScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const AppStack = createStackNavigator<RootStackParamList>();
const AppStackScreen = () => (
  <AppStack.Navigator
    headerMode="screen"
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.backgroundlight,
        elevation: 0,
        shadowOpacity: 0,
        height: headerHeight,
      },
      headerTintColor: theme.colors.textdark,
      headerTitleStyle: {
        fontFamily: "inter-regular",
        textAlignVertical: "center",
        marginHorizontal: 0,
      },
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerBackAllowFontScaling: true,
    }}
    initialRouteName="MainBottomTabNavigator"
  >
    <AppStack.Screen
      name="MainBottomTabNavigator"
      component={MainBottomTabNavigator}
      options={{
        headerTitle: () => <AppLogo />,
        headerTitleAlign: "center",
      }}
    />
    <AppStack.Screen name="Contacts" component={ContactsScreen} />
    <AppStack.Screen name="DiscussDetails" component={DiscussDetailsScreen} />
    <AppStack.Screen name="FinalDetails" component={FinalDetailsScreen} />
  </AppStack.Navigator>
);

function RootNavigator() {
  const authData = useAuth();
  if (!authData.userData) {
    return <AuthStackScreen />;
  } else {
    return <AppStackScreen />;
  }
}
