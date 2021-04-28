import React from "react";
import { ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  bg?: ColorValue | undefined;
}

const Container: React.FC<ContainerProps> = ({ bg, children }) => {
  return (
    <SafeAreaView style={{ backgroundColor: bg, flex: 1 }}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
