import * as React from "react";

import { Text, TextProps } from "react-native-magnus";

export const BodyText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "poppins-regular", fontSize: 14 }}>
      {children}
    </Text>
  );
};
export const SubBodyNormalText: React.FC<TextProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={{ fontFamily: "poppins-regular", fontSize: 12 }}>
      {children}
    </Text>
  );
};

export const SubBodyLightText: React.FC<TextProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={{ fontFamily: "poppins-light", fontSize: 12 }}>
      {children}
    </Text>
  );
};

export const SubBodyMediumText: React.FC<TextProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={{ fontFamily: "poppins-medium", fontSize: 12 }}>
      {children}
    </Text>
  );
};
