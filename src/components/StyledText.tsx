import * as React from "react";

import { Text, TextProps } from "react-native-magnus";

export const BodyMainText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 17 }}>
      {children}
    </Text>
  );
};

export const BodyHeading: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 18 }}>
      {children}
    </Text>
  );
};

export const MediumText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 16 }}>
      {children}
    </Text>
  );
};

export const CaptionText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 15 }}>
      {children}
    </Text>
  );
};

export const SmallText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 13 }}>
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

// export const SmallText: React.FC<TextProps> = ({
//   children,
//   ...rest
// }) => {
//   return (
//     <Text {...rest} style={{ fontFamily: "inter-regular", fontSize: 12 }}>
//       {children}
//     </Text>
//   );
// };

// export const SubBodyLightText: React.FC<TextProps> = ({
//   children,
//   ...rest
// }) => {
//   return (
//     <Text {...rest} style={{ fontFamily: "inter-light", fontSize: 12 }}>
//       {children}
//     </Text>
//   );
// };

// export const SubBodyMediumText: React.FC<TextProps> = ({
//   children,
//   ...rest
// }) => {
//   return (
//     <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 12 }}>
//       {children}
//     </Text>
//   );
// };

export const Heading1: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 25 }}>
      {children}
    </Text>
  );
};

export const Heading2: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text style={{ fontFamily: "inter-medium", fontSize: 24 }} {...rest}>
      {children}
    </Text>
  );
};

export const Heading3: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={{ fontFamily: "inter-medium", fontSize: 20 }}>
      {children}
    </Text>
  );
};
