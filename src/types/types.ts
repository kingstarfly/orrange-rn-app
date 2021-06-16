/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MutableRefObject } from "react";
import { ImageSourcePropType } from "react-native";
import { DotMarking, PeriodMarking } from "react-native-calendars";

export type UserData = {
  uid: string;
  firstName: string;
  lastName: string;
  contact: string;
  username: string;
  url_original: string;
  url_thumbnail: string;
};

export type PalFields = {
  addedDate: string;
};

export type PalRequestFields = {
  requestDate: string;
};

export type MeetupFields = {
  id: string;
  createdBy: string;
  name: string;
  activity: string;
  startTime: string;
  endTime: string;
};

export type AuthStackParamList = {
  Login: undefined;
  Verify: {
    verificationId: string;
  };
};

export type SignUpStackParamList = {
  YourInfo: undefined;
  YourUsername: {
    firstName: string;
    lastName: string;
  };
};

export type AppStackParamList = {
  NotFound: undefined;
  TestScreen: undefined;

  DiscussDetails: {
    meeting: MeetingProps;
  };
  FinalDetails: {
    meeting: MeetingProps;
  };
  MainBottomTabNavigator: undefined;
  Contacts: undefined;
};

export type CreateMeetupStackParamList = {
  MeetupDetails: undefined;
  SelectDates: undefined;
  SelectTime: undefined;
};

export type ViewPlansTabParamList = {
  Confirmed: undefined;
  InProgress: undefined;
};

export type PalsStackParamList = {
  ViewPals: undefined;
  AddPals: undefined;
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
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  activity: string;
  organiser: participantProps;
  participants: participantProps[];
};

export type MeetingsProps = {
  meetings: { title: string; data: MeetingProps[] }[];
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
  x?: number;
};

export type MarkedDates = {
  [date: string]: PeriodMarking | DotMarking;
};

export enum USER_STATUS {
  notPal, // not pals, no request sent yet. This can be after person has accepted invite to join the app, but not yet pals.
  palRequestSent, // already on app, sent a friend request
  isPal, // is pal (note: this should not be here i guess?)
  notOnApp, // not on app, have not invited
  inviteSent, // not on app, invitation to join app sent
}

export interface CurrentUser {
  id: string;
  name: string;
  contactNumber: string;
  thumbnail?: string;
}

export interface Person {
  status: USER_STATUS;
  id: string;
  name: string;
  contactNumber: string;
  thumbnail?: string;
  selected?: boolean;
}

export interface TootleUser extends Person {
  status: USER_STATUS.palRequestSent | USER_STATUS.notPal | USER_STATUS.isPal;
}

export interface NonTootleUser extends Person {
  status: USER_STATUS.notOnApp | USER_STATUS.inviteSent;
}
