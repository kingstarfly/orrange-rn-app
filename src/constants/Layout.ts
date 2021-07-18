import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const headerHeight = 90;
export const sectionSpacing = 24;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
