import { Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const headerHeight = height * 0.12;
export const sectionSpacing = 24;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
