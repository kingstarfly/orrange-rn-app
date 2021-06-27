import { theme } from "constants/theme";
import React from "react";
import {
  // ButtonProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Box, WINDOW_WIDTH, ButtonProps } from "react-native-magnus";
import { Heading3, MiniText } from "./StyledText";

interface Props extends ButtonProps {
  colorTheme: "primary" | "plain";
  loading?: boolean;
  mr?: number;
}

const SmallButton: React.FC<Props> = ({
  onPress,
  loading,
  colorTheme,
  children,
  mr = 0,
}) => {
  let backgroundColor;
  let textColor;
  let borderWidth = 0;
  let borderColor;
  switch (colorTheme) {
    case "primary":
      backgroundColor = theme.colors.primary600;
      textColor = theme.colors.textlight;

      break;

    case "plain":
      backgroundColor = theme.colors.backgroundlight;
      textColor = theme.colors.textgray400;
      borderColor = theme.colors.linegray;
      borderWidth = 1;
      break;
    default:
      break;
  }
  if (loading) {
    backgroundColor = theme.colors.primary200;
  }
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: backgroundColor,
        marginRight: mr,
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}
      disabled={loading}
      onPress={onPress}
    >
      {!loading ? (
        <MiniText color={textColor}>{children}</MiniText>
      ) : (
        <ActivityIndicator size="large" color={theme.colors.textlight} />
      )}
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  button: {
    width: 63,
    height: 28,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
