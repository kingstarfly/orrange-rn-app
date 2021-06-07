import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PalsTabParamList } from "types/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import ViewPals from "screens/Pals/ViewPals";
import AddPals from "screens/Pals/AddPals";
import { Box, Text } from "react-native-magnus";

const Tab = createMaterialTopTabNavigator<PalsTabParamList>();

function PalsTopTabvNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="ViewPals"
      tabBarOptions={{
        style: {
          backgroundColor: theme.colors.backgroundlight,
          // backgroundColor: "red",
          elevation: 1,
          marginTop: insets.top,
        },
        labelStyle: {
          textTransform: "none",
        },
        inactiveTintColor: "black",
        activeTintColor: "black",
        tabStyle: {
          flex: 1,
        },
        indicatorStyle: {
          backgroundColor: theme.colors.primary600,
          height: 4,
        },
      }}
    >
      <Tab.Screen
        name="ViewPals"
        component={ViewPals}
        options={{
          tabBarLabel: () => (
            <Box>
              <Text>Pals</Text>
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="AddPals"
        component={AddPals}
        options={{ tabBarLabel: "Add Pals" }}
      />
    </Tab.Navigator>
  );
}

export default PalsTopTabvNavigator;
