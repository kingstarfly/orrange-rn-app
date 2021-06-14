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
import YourUsername from "screens/Authentication/YourUsername";
import YourInfo from "screens/Authentication/YourInfo";
import StartScreen from "screens/Authentication/StartScreen";
import { firebaseApp, firestore } from "lib/firebase";

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
  <AuthStack.Navigator
    initialRouteName="Start"
    screenOptions={{ headerShown: false }}
  >
    <AuthStack.Screen name="Start" component={StartScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Verify" component={VerificationScreen} />
  </AuthStack.Navigator>
);

const AppStack = createStackNavigator<RootStackParamList>();
const AppStackScreen = (isFirstLogin) => (
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
    initialRouteName="YourInfo"
  >
    <AppStack.Screen
      name="YourInfo"
      component={YourInfo}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="YourUsername"
      component={YourUsername}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="MainBottomTabNavigator"
      component={MainBottomTabNavigator}
      options={({ route }) => ({
        headerTitle: () => {
          if (willShowHeader(route)) {
            return <AppLogo />;
          } else return null;
        },
        headerTitleAlign: "center",
      })}
    />
    <AppStack.Screen name="Contacts" component={ContactsScreen} />
    <AppStack.Screen name="DiscussDetails" component={DiscussDetailsScreen} />
    <AppStack.Screen name="FinalDetails" component={FinalDetailsScreen} />
  </AppStack.Navigator>
);

async function checkIfFirstLogin(uid) {
  console.log("uid: ", uid);
  const userDocument = await firestore
    .collection("users")
    .doc(String(uid))
    .get();
  if (userDocument.exists) {
    console.log("found user document: ", uid);
    return false;
  } else {
    console.log("unable to find user document id: ", uid);
    return true;
  }
}

function RootNavigator() {
  const authData = useAuth();
  if (!authData.userData) {
    console.log(authData.userData);
    return <AuthStackScreen />;
  } else {
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
