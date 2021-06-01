import * as React from "react";

import { Text, TextProps } from "react-native-magnus";

export const BodyText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 14 }}>
      {children}
    </Text>
  );
};
export const SubBodyNormalText: React.FC<TextProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 12 }}>
      {children}
    </Text>
  );
};

export const SubBodyLightText: React.FC<TextProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-light", fontSize: 12 }}>
      {children}
    </Text>
  );
};

export const SubBodyMediumText: React.FC<TextProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 12 }}>
      {children}
    </Text>
  );
};

export const Header2: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 24 }}>
      {children}
    </Text>
  );
};

export const Header3: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 18 }}>
      {children}
    </Text>
  );
};
