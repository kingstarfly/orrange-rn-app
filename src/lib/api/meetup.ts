import { firestore } from "lib/firebase";
import { MeetingCardProps } from "screens/ViewPlans/MeetingCard/MeetingCard";
import { ParticipantFields, PreferredDuration, UserData } from "types/types";

export async function getAllDurationsFromMeeting(
  meetupId: string
): Promise<PreferredDuration[]> {
  const querySnapShot = await firestore
    .collection("meetups")
    .doc(meetupId)
    .collection("participants")
    .get();

  let durations: {
    username: string;
    startAt: string;
    endAt: string;
  }[] = [];
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

  console.log(durations);
  return durations;
}
/*
  meetingInfo: MeetupFields;
  participants: ParticipantFields[];
  pendingParticipants: PendingParticipantFields;
  accent?: boolean;
*/
export async function getAllMeetingDataForUser(
  userUid: string
): Promise<MeetingCardProps[]> {
  let meetupIds = [];
  // let pendingMeetupIds = [];

  const doc = await firestore.collection("users").doc(userUid).get();
  let userData = doc.data() as UserData;
  userData.meetup_ids.forEach((meetupId) => {
    meetupIds.push(meetupId);
  });

  // TODO finish up the function
  console.log(meetupIds);
  return null;
}
