/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ImageSourcePropType } from "react-native";

export type RootStackParamList = {
  // Root: undefined;
  PublicFeed: undefined;
  CreatePlan: undefined;
  ViewPlans: undefined;
  PickTime: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MeetingProps = {
  meeting: {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    activity: string;
    organiser: participantProps;
    participants: participantProps[];
  };
};

export type MeetingsProps = {
  meetings: { title: string; data: MeetingProps["meeting"][] }[];
};

export type participantProps = {
  id: string;
  display_name: string;
  avatar: ImageSourcePropType;
  responded: boolean;
  confirmed: boolean;
};
