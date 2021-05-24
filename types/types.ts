/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MutableRefObject } from "react";
import { ImageSourcePropType } from "react-native";
import { DotMarking, PeriodMarking } from "react-native-calendars";

export type RootStackParamList = {
  // Root: undefined;
  PublicFeed: undefined;
  SelectDates: undefined;
  ViewPlans: undefined;
  SelectTime: undefined;
  MeetupDetails: undefined;
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

export type cellProps = {
  start: Date;
  ref?: MutableRefObject<any>;
  isBottomMostCell?: boolean;
  isRightMostCell?: boolean;
};

export type MarkedDates = {
  [date: string]: PeriodMarking | DotMarking;
};
