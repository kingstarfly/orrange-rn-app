import { BodyTextRegular } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { Div, WINDOW_WIDTH } from "react-native-magnus";
import HeartCountComponent from "./HeartCountComponent";

interface Props {
  title: string;
  count?: number;
  liked?: boolean;
}

const SuggestionRowComponent = ({ title, count = 0, liked = false }: Props) => {
  return (
    <Div row alignItems="center" mb={8}>
      <HeartCountComponent count={count} filled={liked} />
      <Div
        row
        bg={theme.colors.primary300}
        px={8}
        rounded={10}
        alignItems="center"
        justifyContent="flex-start"
        h={23}
        w={WINDOW_WIDTH * 0.6}
      >
        <BodyTextRegular numberOfLines={1}>{title}</BodyTextRegular>
      </Div>
    </Div>
  );
};

export default SuggestionRowComponent;
