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

import { RootStackParamList } from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "constants/theme";

import TestScreen from "screens/TestScreen";

import LoginScreen from "screens/Authentication/LoginScreen";
import VerificationScreen from "screens/Authentication/VerificationScreen";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import ContactsScreen from "screens/Contacts/ContactsScreen";
import { useAuth } from "lib/auth";
import DiscussDetailScreen from "screens/Plan/DiscussDetailsScreen";
import DiscussDetailsScreen from "screens/Plan/DiscussDetailsScreen";
import { headerHeight } from "constants/Layout";
import Header from "components/Header";

let skipAuth = false;

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
  const authData = useAuth();
  console.log(authData.userData);

  /*
      Unauth
      1. Login
      2. Verify

      Auth
      1. BottomTab
          1. Plans (this is tab navigator)
          2. Create (this is a stack navigator)
          3. Pals (this is a stack navigator)
      2. Contacts
  */
  const content =
    !skipAuth && !authData.userData ? (
      <>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen name="Verify" component={VerificationScreen} />
      </>
    ) : (
      <>
        <Stack.Screen
          name="MainBottomTabNavigator"
          component={MainBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen
          name="DiscussDetails"
          component={DiscussDetailsScreen}
          options={{
            // header: ({ scene, previous, navigation }) => (
            //   <Header
            //     scene={scene}
            //     previous={previous}
            //     navigation={navigation}
            //   />
            // ),
            headerTitleAlign: "center",
            headerTitleStyle: {
              flex: 1,
              textAlign: "center",
            },
          }}
        />
        <Stack.Screen name="FinalDetails" component={DiscussDetailsScreen} />
      </>
    );

  return (
    <Stack.Navigator
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
      // initialRouteName="TestScreen" //!! to change
    >
      {content}

      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
