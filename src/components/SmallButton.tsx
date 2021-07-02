import { theme } from "constants/theme";
import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { MiniText } from "./StyledText";

interface Props {
  onPress: () => Promise<any> | void;
  colorTheme: "primary" | "plain";
  loading?: boolean;
  mr?: number;
  disabled?: boolean;
}

const SmallButton: React.FC<Props> = ({
  onPress,
  colorTheme,
  children,
  disabled,
  mr = 0,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleOnPress = async () => {
    setIsLoading(true);
    await onPress();
    setIsLoading(false);
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: backgroundColor,
        marginRight: mr,
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}
      disabled={disabled}
      onPress={() => handleOnPress()}
    >
      {!isLoading ? (
        <MiniText color={textColor}>{children}</MiniText>
      ) : (
        <ActivityIndicator size="small" color={theme.colors.textlight} />
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
