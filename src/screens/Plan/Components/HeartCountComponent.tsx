import { CaptionText } from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Div } from "react-native-magnus";

interface Props {
  onPress: () => void;
  count?: number;
  filled?: boolean;
  disabled?: boolean;
}

const HeartCountComponent = ({
  onPress,
  count = 0,
  filled = false,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Div row alignItems="center" mr={8}>
        <CaptionText color={theme.colors.primary800} w={15} textAlign="center">
          {count}
        </CaptionText>
        <PhosphorIcon
          size={16}
          name={filled ? "heart-fill" : "heart"}
          color={theme.colors.primary800}
        />
      </Div>
    </TouchableOpacity>
  );
};

export default HeartCountComponent;
