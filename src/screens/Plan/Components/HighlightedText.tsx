import { BodyTextRegular } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { Div, DivProps } from "react-native-magnus";

const HighlightedText: React.FC<DivProps> = ({ children, ...rest }) => {
  return (
    <Div
      bg={theme.colors.primary300}
      mb={10}
      px={8}
      py={4}
      rounded={5}
      alignSelf="flex-start"
    >
      <BodyTextRegular>{children}</BodyTextRegular>
    </Div>
  );
};

export default HighlightedText;
