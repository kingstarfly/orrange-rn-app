import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-magnus";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./constants/theme";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { AuthProvider } from "lib/auth";
import { registerRootComponent } from "expo";

import { LogBox } from "react-native";

function App() {
  LogBox.ignoreAllLogs();
  const isCachedResourcesLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar style="auto" />
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);

export default App;
LogBox.ignoreAllLogs();
