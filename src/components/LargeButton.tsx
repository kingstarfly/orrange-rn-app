import { theme } from "constants/theme";
import React from "react";
import {
  ButtonProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { WINDOW_WIDTH } from "react-native-magnus";
import { Heading3 } from "./StyledText";

interface LargeButtonProps extends ButtonProps {
  loading: boolean;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  title,
  onPress,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={
        !loading
          ? styles.button
          : {
              ...styles.button,
              backgroundColor: theme.colors.primary200,
              elevation: 0,
            }
      }
      disabled={loading}
      onPress={onPress}
    >
      {!loading ? (
        <Heading3 color={theme.colors.textlight}>{title}</Heading3>
      ) : (
        <ActivityIndicator size="large" color={theme.colors.textlight} />
      )}
    </TouchableOpacity>
  );
};

export default LargeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary700,
    width: WINDOW_WIDTH * 0.8,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
