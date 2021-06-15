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
import { useState } from "react";

function App() {
  // const isCachedResourcesLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={setUpApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Provider store={store}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar
                style="dark"
                backgroundColor={theme.colors.primary600}
              />
            </Provider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

const setUpApp = async () => {
  const loadFont = Font.loadAsync({
    "inter-regular": require("./assets/fonts/Inter-Regular.ttf"),
    "inter-light": require("./assets/fonts/Inter-Light.ttf"),
    "inter-medium": require("./assets/fonts/Inter-Medium.ttf"),
    "inter-semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "inter-bold": require("./assets/fonts/Inter-Bold.ttf"),
    Phosphor: require("./assets/fonts/Phosphor.ttf"),
  });

  // const waitForAuth = () => {
  //   return new Promise(function (resolve, reject) {
  //       (function authIsNotLoading(){
  //           if (auth.foo) return resolve();
  //           setTimeout(waitForFoo, 30);
  //       })();
  //   });
  const retrieveUser = async () => {
    return 2;
  };

  return loadFont;
};

registerRootComponent(App);

export default App;
