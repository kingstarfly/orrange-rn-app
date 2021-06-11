import React from "react";
import { ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "constants/theme";
import { headerHeight } from "constants/Layout";

interface ContainerProps {
  bg?: ColorValue | undefined;
  avoidHeader?: boolean;
}

const Container: React.FC<ContainerProps> = ({ bg, children, avoidHeader }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bg || theme.colors.backgroundlight,
        paddingHorizontal: 20,
        paddingTop: avoidHeader ? headerHeight : 0,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;
