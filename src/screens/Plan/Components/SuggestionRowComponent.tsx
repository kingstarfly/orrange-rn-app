import { BodyTextRegular } from "components/StyledText";
import { theme } from "constants/theme";
import { useAuth } from "lib/auth";
import React from "react";
import { Div, WINDOW_WIDTH } from "react-native-magnus";
import { SuggestionFields } from "types/types";
import HeartCountComponent from "./HeartCountComponent";

interface Props {
  suggestion: SuggestionFields;
  onPress: () => void;
}

const SuggestionRowComponent = ({ suggestion, onPress }: Props) => {
  const authData = useAuth();
  const liked = suggestion.likedBy.includes(authData.userData.uid);

  // owner of suggestion cannot press the button

  return (
    <Div row alignItems="center" mb={8}>
      <HeartCountComponent
        count={suggestion.likedBy.length || 0}
        filled={liked}
        onPress={onPress}
        disabled={suggestion.ownerUid === authData.userData.uid}
      />
      <Div
        row
        bg={liked ? theme.colors.primary300 : "transparent"}
        px={8}
        rounded={10}
        alignItems="center"
        justifyContent="flex-start"
        h={23}
        w={WINDOW_WIDTH * 0.6}
      >
        <BodyTextRegular numberOfLines={1}>
          {suggestion.content}
        </BodyTextRegular>
      </Div>
    </Div>
  );
};

export default SuggestionRowComponent;
