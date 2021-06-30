import { meetingsData } from "constants/mockdata";
import { firestore } from "lib/firebase";
import { MeetingCardProps } from "screens/ViewPlans/MeetingCard/MeetingCard";
import {
  MeetupFields,
  ParticipantFields,
  PendingParticipantFields,
  PreferredDuration,
  UserData,
} from "types/types";

export async function getAllDurationsFromMeeting(
  meetupId: string
): Promise<PreferredDuration[]> {
  const querySnapShot = await firestore
    .collection("meetups")
    .doc(meetupId)
    .collection("participants")
    .get();

  let durations: PreferredDuration[] = [];
  querySnapShot.forEach((doc) => {
    let participantDetails = doc.data() as ParticipantFields;
    participantDetails.preferredDurations.forEach((dur) => {
      durations.push({
        username: participantDetails.username,
        startAt: dur.startAt,
        endAt: dur.endAt,
      });
    });
  });
  return durations;
}
/*
  meetingInfo: MeetupFields;
  participants: ParticipantFields[];
  pendingParticipants: PendingParticipantFields;
  accent?: boolean;
*/

export const getMeetingInfo = async (meetupId: string) => {
  const doc = await firestore.collection("meetups").doc(meetupId).get();
  return doc.data() as MeetupFields;
};

export const getParticipants = async (meetupId: string) => {
  const participants: ParticipantFields[] = [];

  const querySnapshot = await firestore
    .collection("meetups")
    .doc(meetupId)
    .collection("participants")
    .get();

  querySnapshot.forEach((doc) => {
    participants.push(doc.data() as ParticipantFields);
  });
  return participants;
};

export const getPendingParticipants = async (meetupId: string) => {
  const pendingParticipants: PendingParticipantFields[] = [];

  const querySnapshot = await firestore
    .collection("meetups")
    .doc(meetupId)
    .collection("pendingParticipants")
    .get();

  querySnapshot.forEach((doc) => {
    pendingParticipants.push(doc.data() as PendingParticipantFields);
  });
  return pendingParticipants;
};

export async function getAllMeetingDataForUser(
  userUid: string
): Promise<MeetingCardProps[]> {
  let meetupIds: string[] = [];
  const doc = await firestore.collection("users").doc(userUid).get();
  let userData = doc.data() as UserData;
  userData.meetup_ids?.forEach((meetupId) => {
    meetupIds.push(meetupId);
  });

  if (meetupIds.length === 0) {
    console.log("No meetups");
    return null;
  }

  let allMeetingData: MeetingCardProps[] = [];

  /*
    {title: "Feb 2021", data: MeetingCardProps[]}

    */
  let meetingInfoPromiseArr: Promise<MeetupFields>[] = [];
  let participantPromiseArr: Promise<ParticipantFields[]>[] = [];
  let pendingParticipantPromiseArr: Promise<PendingParticipantFields[]>[] = [];

  meetupIds.map(async (meetupId) => {
    meetingInfoPromiseArr.push(getMeetingInfo(meetupId));
    participantPromiseArr.push(getParticipants(meetupId));
    pendingParticipantPromiseArr.push(getPendingParticipants(meetupId));

    // const meetingInfo = await getMeetingInfo(meetupId);
    // const participants = await getParticipants(meetupId);
    // const pendingParticipants = await getPendingParticipants(meetupId);

    // allMeetingData.push({
    //   meetingInfo,
    //   participants,
    //   pendingParticipants,
    // });
  });

  const [meetingInfoArr, participantArr, pendingParticipantArr] =
    await Promise.all([
      Promise.all(meetingInfoPromiseArr),
      Promise.all(participantPromiseArr),
      Promise.all(pendingParticipantPromiseArr),
    ]);
  meetingInfoArr.forEach((ele, ind) => {
    allMeetingData.push({
      meetingInfo: ele,
      participants: participantArr[ind],
      pendingParticipants: pendingParticipantArr[ind],
    });
  });
  return allMeetingData;
}
