import React from "react";
import { PalsStackParamList } from "types/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import ViewPals from "screens/Pals/ViewPals";
import AddPals from "screens/Pals/AddPals";
import { Box, Text } from "react-native-magnus";
import { createStackNavigator } from "@react-navigation/stack";
import TopNavBar from "components/TopNavBar";

const Stack = createStackNavigator<PalsStackParamList>();

function PalsStackNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="ViewPals"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundlight,
          elevation: 0,
          shadowOpacity: 0,
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
      // ={{
      //   style: {
      //     backgroundColor: theme.colors.backgroundlight,
      //     // backgroundColor: "red",
      //     elevation: 1,
      //     marginTop: insets.top,
      //   },
      //   labelStyle: {
      //     textTransform: "none",
      //   },
      //   inactiveTintColor: "black",
      //   activeTintColor: "black",
      //   tabStyle: {
      //     flex: 1,
      //   },
      //   indicatorStyle: {
      //     backgroundColor: theme.colors.primary600,
      //     height: 4,
      //   },
      // }}
    >
      <Stack.Screen
        name="ViewPals"
        component={ViewPals}
        options={({ route }) => ({
          // headerTitle: () => {
          //   return <TopNavBar hideLogo />;
          // },
          headerShown: false,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen name="AddPals" component={AddPals} />
    </Stack.Navigator>
  );
}

export default PalsStackNavigator;
