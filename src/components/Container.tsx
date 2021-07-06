import React from "react";
import { ColorValue, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { theme } from "constants/theme";
import { headerHeight } from "constants/Layout";
import { ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  bg?: ColorValue | undefined;
  avoidHeader?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  bg,
  children,
  avoidHeader = false,
  style: passedOnStyle,
  ...rest
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: bg || theme.colors.backgroundlight,
          paddingHorizontal: 20,
          paddingTop: avoidHeader ? headerHeight : top, // weird interaction when there is marginTop, then no need safe area inset??
        },
        passedOnStyle,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Container;
