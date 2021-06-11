import { useAuth } from "lib/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

interface Props {
  isCachedResourcesLoadingComplete: boolean;
}

const RenderSplashScreen: React.FC<Props> = ({
  isCachedResourcesLoadingComplete,
  children,
}) => {
  const authData = useAuth();

  useEffect(() => {
    const fn = async () => {
      if (isCachedResourcesLoadingComplete && authData.loggedIn) {
        await SplashScreen.hideAsync();
      }
    };
    fn();
  }, [isCachedResourcesLoadingComplete, authData]);

  return <>{children}</>;
};

export default RenderSplashScreen;
