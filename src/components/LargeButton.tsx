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
import { Subheading } from "./StyledText";

interface LargeButtonProps extends ButtonProps {
  loading?: boolean;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  title,
  disabled,
  onPress,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        loading
          ? {
              ...styles.button,
              backgroundColor: theme.colors.primary200,
              elevation: 0,
            }
          : disabled
          ? {
              ...styles.button,
              backgroundColor: theme.colors.primary200,
              elevation: 0,
            }
          : styles.button,
        // {
        //   position: "absolute",
        //   bottom: 20,
        //   alignSelf: "center",
        //   zIndex: 100,
        // },
      ]}
      disabled={loading || disabled}
      onPress={onPress}
    >
      {!loading ? (
        <Subheading color={theme.colors.textlight}>{title}</Subheading>
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
