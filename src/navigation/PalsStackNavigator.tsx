import React from "react";
import { PalsStackParamList } from "types/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import ViewPals from "screens/Pals/ViewPals";
import AddPals from "screens/Pals/AddPals";
import { Box, Text } from "react-native-magnus";
import { createStackNavigator } from "@react-navigation/stack";
import TopNavBar from "components/TopNavBar";
import { PhosphorIcon } from "constants/Icons";

const Stack = createStackNavigator<PalsStackParamList>();

function PalsStackNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="ViewPals"
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
      <Stack.Screen
        name="ViewPals"
        component={ViewPals}
        options={({ route }) => ({
          headerShown: false,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen name="AddPals" component={AddPals} />
    </Stack.Navigator>
  );
}

export default PalsStackNavigator;
