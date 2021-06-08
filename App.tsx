import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-magnus";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./constants/theme";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { AuthProvider } from "lib/auth";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar
                style="dark"
                backgroundColor={theme.colors.primary600}
              />
            </SafeAreaProvider>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
