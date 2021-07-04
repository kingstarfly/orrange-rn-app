import { CaptionText } from "components/StyledText";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Div } from "react-native-magnus";

interface Props {
  count?: number;
  filled?: boolean;
}

const HeartCountComponent = ({ count = 0, filled = false }: Props) => {
  return (
    <TouchableOpacity>
      <Div row alignItems="center" mr={8}>
        <CaptionText color={theme.colors.primary800} mr={4}>
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
