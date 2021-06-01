import { StatusBar } from "expo-status-bar";
import React from "react";
import { ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants/theme";

interface ContainerProps {
  bg?: ColorValue | undefined;
}

const Container: React.FC<ContainerProps> = ({ bg, children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bg || theme.colors.backgroundlight,
        paddingHorizontal: 16,
      }}
    >
      {children}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Container;
