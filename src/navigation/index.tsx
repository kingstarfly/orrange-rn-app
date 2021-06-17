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
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";

import {
  AppStackParamList,
  AuthStackParamList,
  SignUpStackParamList,
} from "../types/types";
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
import YourUsername from "screens/Authentication/YourUsername";
import YourInfo from "screens/Authentication/YourInfo";
import StartScreen from "screens/Authentication/StartScreen";
import { firebaseApp, firestore } from "lib/firebase";
import { PhosphorIcon } from "constants/Icons";
import Loading from "components/Loading";
import { auth } from "firebase-admin";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const authData = useAuth();
  if (authData.isLoading) {
    return <Loading />;
  }

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
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    {/* <AuthStack.Screen name="Start" component={StartScreen} /> */}
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Verify" component={VerificationScreen} />
  </AuthStack.Navigator>
);

const SignUpStack = createStackNavigator<SignUpStackParamList>();
const SignUpStackScreen = () => (
  <SignUpStack.Navigator
    initialRouteName="YourInfo"
    screenOptions={{ headerShown: false }}
  >
    <SignUpStack.Screen
      name="YourInfo"
      component={YourInfo}
      options={{ headerShown: false }}
    />
    <SignUpStack.Screen
      name="YourUsername"
      component={YourUsername}
      options={{ headerShown: false }}
    />
  </SignUpStack.Navigator>
);

const AppStack = createStackNavigator<AppStackParamList>();
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
      headerBackImage: ({ tintColor }) => (
        <PhosphorIcon name="caret-left" size={30} color={tintColor} />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
    }}
    initialRouteName="MainBottomTabNavigator"
  >
    <AppStack.Screen
      name="MainBottomTabNavigator"
      component={MainBottomTabNavigator}
      options={{
        headerShown: false,
      }}
    />
    <AppStack.Screen
      name="Contacts"
      component={ContactsScreen}
      options={{ title: "" }}
    />
    <AppStack.Screen
      name="DiscussDetails"
      component={DiscussDetailsScreen}
      options={{ title: "" }}
    />
    <AppStack.Screen
      name="FinalDetails"
      component={FinalDetailsScreen}
      options={{ title: "" }}
    />
  </AppStack.Navigator>
);

function RootNavigator() {
  const authData = useAuth();
  if (!authData.userData) {
    console.log(authData.userData);
    return <AuthStackScreen />;
  } else {
    if (!authData.userData.username) {
      return <SignUpStackScreen />;
    }
    console.log(authData.userData.uid);
    return <AppStackScreen />;
  }
}

function willShowHeader(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Create":
      return false;

    default:
      return true;
  }
}
