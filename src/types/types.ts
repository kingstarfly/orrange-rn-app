/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MutableRefObject } from "react";
import { ImageSourcePropType } from "react-native";
import { DotMarking, PeriodMarking } from "react-native-calendars";

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
  selected?: boolean;
};

export type PalFields = OtherUser & {
  addedAt?: string;
};

export type PalRequestFields = OtherUser & {
  requestedAt?: string;
};

export type ParticipantFields = {
  uid: string;
  username: string;
  url_thumbnail: string;
  preferredDurations: PreferredDuration[];
  joinedAt?: string;
  isHost?: boolean;
  isCoOrganiser?: boolean;
};

export type PreferredDuration = {
  username: string;
  startAt: string;
  endAt: string;
};

export type PendingParticipantFields = {
  requestedAt: string;
  username: string;
  url_thumbnail: string;
  uid: string;
};

export type SuggestionFields = {
  id: string;
  ownerUid: string;
  likedBy: string[];
  content: string;
  createdAt: string;
};

// key is the start times from 0000 to 2400 hrs in ISOstring for that day. Value is the number of people attending that timeslot. (interval is half hour)
export type DayTimings = {
  date: string;
  startTimings: StartTimeMapToNumber;
};

export type StartTimeMapToNumber = {
  [startTimeIso: string]: number;
};

export type MeetupFields = {
  id: string;
  hostUid: string;
  hostUsername: string;
  name: string;
  activity: string;
  startAt: string;
  endAt: string;
  isConfirmed: boolean;
  isDeleted?: boolean;
  coOrganisers?: string[];
  meetupTimings?: DayTimings[];
};

export type AuthStackParamList = {
  Login: undefined;
  Verify: {
    verificationId: string;
    phoneNumberString: string;
  };
};

export type SignUpStackParamList = {
  YourInfoScreen: undefined;
  YourUsernameScreen: {
    firstName: string;
    lastName: string;
    imageUri: any;
  };
};

export type AppStackParamList = {
  NotFound: undefined;
  TestScreen: undefined;

  DiscussDetailsStackNavigator: undefined;
  FinalDetails: {
    meetupId: string;
    // meeting: MeetupFields;
  };
  MainBottomTabNavigator: undefined;
  Contacts: undefined;
};

export type CreateMeetupStackParamList = {
  MeetupDetails: undefined;
  SelectDates: { meetupName: string };
  SelectTime: { meetupId: string };
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

export type DiscussDetailsStackParamList = {
  DiscussDetails: {
    meetupId: string;
  };
  AddParticipants: {
    // UseruId is needed to know which pals to display
    // MeetupId is needed to know which pals to exclude since they are already participants / pending participants.
    userUid: string;
    meetupId: string;
  };
  PickTime: {
    meetupId: string;
  };
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
