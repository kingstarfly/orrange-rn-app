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
        backgroundColor: bg || theme.colors.backgroundlight,
        flex: 1,
        paddingTop: 80,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;
