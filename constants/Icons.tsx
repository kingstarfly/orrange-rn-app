import React from "react";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import phosphorConfig from "assets/icons/Phosphor.json";

const VectorIcon = createIconSetFromIcoMoon(
  phosphorConfig,
  "Phosphor",
  "Phosphor.ttf"
);

interface PhosphorIconProp {
  name: string;
  size: number;
  color: string;
  [x: string]: any;
}

export const PhosphorIcon = ({
  name,
  size,
  color,
  ...props
}: PhosphorIconProp) => {
  return <VectorIcon size={size} name={name} color={color} {...props} />;
};
