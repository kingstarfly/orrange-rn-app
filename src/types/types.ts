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
  meetup_ids: string[];
};

export type OtherUser = {
  uid: string;
  firstName: string;
  lastName: string;
  username: string;
  url_thumbnail: string;
};

export type PalFields = OtherUser & {
  addedAt: string;
};

export type PalRequestFields = OtherUser & {
  requestedAt: string;
};

export type ParticipantFields = {
  preferredDurations: PreferredDuration[];
  isHost: boolean;
  username: string;
  url_thumbnail: string;
};

export type PreferredDuration = {
  startAt: string;
  endAt: string;
};

export type PendingParticipantFields = {
  requestedAt: string;
  username: string;
  url_thumbnail: string;
};

export type SuggestionFields = {
  ownerUid: string;
  likedBy: string[];
  content: string;
  createdAt: string;
};

export type MeetupFields = {
  id: string;
  createdBy: string;
  name: string;
  activity: string;
  startAt: string;
  endAt: string;
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
    meetingInfo: MeetupFields;
    participants: ParticipantFields[];
    pendingParticipants: PendingParticipantFields[];
  };
  FinalDetails: {
    meeting: MeetupFields;
  };
  MainBottomTabNavigator: undefined;
  Contacts: undefined;
};

export type CreateMeetupStackParamList = {
  MeetupDetails: undefined;
  SelectDates: undefined;
  SelectTime: undefined;
};

export type MainBottomTabParamList = {
  Plans: undefined;
  Create: undefined;
  Pals: undefined;
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
