import { SmallText } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Badge } from "react-native-magnus";

interface OptionsProps {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  hidden?: boolean;
  [key: string]: any;
}

const withBadge =
  (value, options: OptionsProps = {}) =>
  (WrappedComponent) =>
    class extends React.Component {
      render() {
        const {
          top = -5,
          right = 0,
          left = 0,
          bottom = 0,
          hidden = !value,
          ...badgeProps
        } = options;

        return (
          <View>
            <WrappedComponent {...this.props} />
            {!hidden ? (
              <Badge
                bg="red500"
                rounded={25}
                h={25}
                minW={0}
                w={25}
                position="absolute"
                zIndex={2}
                top={top}
                right={right}
                left={left}
                bottom={bottom}
                {...badgeProps}
              >
                5
              </Badge>
            ) : null}
          </View>
        );
      }
    };

export default withBadge;
