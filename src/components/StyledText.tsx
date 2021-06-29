import * as React from "react";

import { Text, TextProps } from "react-native-magnus";

export const BodyTextRegular: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 16 }}>
      {children}
    </Text>
  );
};

export const BodyTextMedium: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 16 }}>
      {children}
    </Text>
  );
};

export const CaptionText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 14 }}>
      {children}
    </Text>
  );
};

export const SmallText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-light", fontSize: 13 }}>
      {children}
    </Text>
  );
};

export const MiniText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-semibold", fontSize: 12 }}>
      {children}
    </Text>
  );
};

export const TinyText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-light", fontSize: 10 }}>
      {children}
    </Text>
  );
};

export const TinyItalicsText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text
      {...rest}
      style={{ fontFamily: "inter-light", fontStyle: "italic", fontSize: 10 }}
    >
      {children}
    </Text>
  );
};

export const Heading: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-bold", fontSize: 20 }}>
      {children}
    </Text>
  );
};

export const Subheading: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text style={{ fontFamily: "inter-medium", fontSize: 18 }} {...rest}>
      {children}
    </Text>
  );
};
