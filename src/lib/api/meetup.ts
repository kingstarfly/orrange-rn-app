import {
  compareAsc,
  eachMinuteOfInterval,
  endOfDay,
  formatISO,
  getDate,
  parseISO,
  startOfDay,
} from "date-fns";
import { firebaseApp, firestore } from "lib/firebase";
import { insertPreferredDurationToDayTiming } from "lib/helpers";
import { MeetingCardProps } from "screens/ViewPlans/MeetingCard/MeetingCard";
import {
  DayTimings,
  MeetupFields,
  OtherUser,
  ParticipantFields,
  PendingParticipantFields,
  PreferredDuration,
  SuggestionFields,
  UserData,
} from "types/types";
import { DB } from "./dbtypes";

/*
export async function getAllPreferredDurationsFromMeeting(
  meetupId: string
): Promise<PreferredDuration[]> {
  const querySnapShot = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .get();

  let durations: PreferredDuration[] = [];
  querySnapShot.forEach((doc) => {
    let participantDetails = doc.data() as ParticipantFields;
    participantDetails.preferredDurations.forEach((dur) => {
      durations.push({
        userUid: participantDetails.uid,
        username: participantDetails.username,
        startAt: dur.startAt,
        endAt: dur.endAt,
      });
    });
  });
  return durations;
}
*/
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

export const getSingleParticipant = async (
  meetupId: string,
  userUid: string
) => {
  const doc = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .doc(userUid)
    .get();

  return doc.data() as ParticipantFields;
};

export const getParticipants = async (meetupId: string) => {
  // Arrange host first, then co-organisers, then the rest
  let participants: ParticipantFields[] = [];

  const query = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .get();

  query.forEach((doc) => {
    participants.push(doc.data() as ParticipantFields);
  });

  // Sort by joined date first
  participants.sort((a, b) =>
    compareAsc(parseISO(a.joinedAt), parseISO(b.joinedAt))
  );

  // Re arrange
  let host = participants.find((p) => p.isHost);
  let coOrganisers = participants.filter((p) => p.isCoOrganiser);
  let rest = participants.filter((p) => !p.isHost && !p.isCoOrganiser);

  let sortedPartcipants = [host, ...coOrganisers, ...rest];

  return sortedPartcipants;
};

export const getPendingParticipants = async (meetupId: string) => {
  const pendingParticipants: PendingParticipantFields[] = [];

  const querySnapshot = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PENDING_PARTICIPANTS)
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
    return null;
  }

  let allMeetingData: MeetingCardProps[] = [];

  /*
    {title: "Feb 2021", data: MeetingCardProps[]}

    */
  let meetingInfoPromiseArr: Promise<MeetupFields>[] = [];
  let participantPromiseArr: Promise<ParticipantFields[]>[] = [];
  // let pendingParticipantPromiseArr: Promise<PendingParticipantFields[]>[] = [];

  meetupIds.forEach(async (meetupId) => {
    meetingInfoPromiseArr.push(getMeetingInfo(meetupId));
    participantPromiseArr.push(getParticipants(meetupId));
    // pendingParticipantPromiseArr.push(getPendingParticipants(meetupId));

    // const meetingInfo = await getMeetingInfo(meetupId);
    // const participants = await getParticipants(meetupId);
    // const pendingParticipants = await getPendingParticipants(meetupId);

    // allMeetingData.push({
    //   meetingInfo,
    //   participants,
    //   pendingParticipants,
    // });
  });

  const [meetingInfoArr, participantArr] = await Promise.all([
    Promise.all(meetingInfoPromiseArr),
    Promise.all(participantPromiseArr),
    // Promise.all(pendingParticipantPromiseArr),
  ]);
  meetingInfoArr.forEach((ele, ind) => {
    allMeetingData.push({
      meetingInfo: ele,
      participants: participantArr[ind],
      // pendingParticipants: pendingParticipantArr[ind],
    });
  });
  return allMeetingData;
}

export const getSuggestions = async (meetupId: string) => {
  const snapshot = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.SUGGESTIONS)
    .get();
  let suggestions: SuggestionFields[] = [];

  snapshot.forEach((doc) => suggestions.push(doc.data() as SuggestionFields));

  // order by ascending date
  suggestions.sort((a, b) =>
    compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return suggestions;
};

export const toggleLike = async (
  meetupId: string,
  suggestionId: string,
  userId: string
) => {
  const doc = firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.SUGGESTIONS)
    .doc(suggestionId);
  const a = await doc.get();
  const oldData = a.data() as SuggestionFields;

  const index = oldData.likedBy.findIndex((e) => e === userId);

  if (index !== -1) {
    oldData.likedBy.splice(index, 1);
  } else {
    oldData.likedBy.push(userId);
  }

  await doc.set(oldData);
};

export const addSuggestion = async (
  meetupId: string,
  userId: string,
  content: string
) => {
  const doc = firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.SUGGESTIONS)
    .doc();

  const newSuggestion: SuggestionFields = {
    createdAt: new Date().toISOString(),
    content: content,
    id: doc.id,
    likedBy: [userId],
    ownerUid: userId,
  };

  await doc.set(newSuggestion);
};

export const getAllPreferredDurationsFromMeeting = async (meetupId: string) => {
  // TODO: Should read all preferredDurations from all participants, into an array. Return this. The conversion to the weird format will be handled by the grid component.
  const query = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .get();

  let durs: PreferredDuration[] = [];
  query.forEach((doc) => {
    const participant = doc.data() as ParticipantFields;
    durs.push(...participant.preferredDurations);
  });

  return durs;

  // const doc = await firestore.collection(DB.MEETUPS).doc(meetupId).get();
  // const { meetupTimings } = doc.data() as MeetupFields;
  // // Sort meetup timings by date
  // meetupTimings?.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
  // return meetupTimings;
};

export const getPreferredDurations = async (
  meetupId: string,
  userId: string
) => {
  const doc = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .doc(userId)
    .get();

  let { preferredDurations } = doc.data() as ParticipantFields;
  // Sort in asc order
  preferredDurations.sort((a, b) =>
    compareAsc(parseISO(a.startAt), parseISO(b.startAt))
  );
  return preferredDurations;
};

export const addPreferredDuration = async (
  prefDuration: PreferredDuration,
  meetupId: string,
  userId: string
) => {
  // 0. Check if this duration is already exisiting
  const { preferredDurations } = (
    await firestore
      .collection(DB.MEETUPS)
      .doc(meetupId)
      .collection(DB.PARTICIPANTS)
      .doc(userId)
      .get()
  ).data() as ParticipantFields;

  if (
    preferredDurations.findIndex(
      (e) =>
        e.username === prefDuration.username &&
        e.startAt === prefDuration.startAt &&
        e.endAt === prefDuration.endAt
    ) !== -1
  ) {
    throw new Error("Duplicate entry not allowed!");
  }
  // 1. Add to meetup's participants preferred durations
  await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .doc(userId)
    .update({
      preferredDurations:
        firebaseApp.firestore.FieldValue.arrayUnion(prefDuration),
    });

  // // 2. Add to meetup's meetup timings array
  // let query = await firestore.collection(DB.MEETUPS).doc(meetupId).get();
  // let { meetupTimings } = query.data() as MeetupFields;
  // // 2.a Get the datestring, so we know which dayTiming to change.
  // const dateISO = startOfDay(parseISO(prefDuration.startAt)).toISOString();
  // const indexToChange = meetupTimings?.findIndex((e) => e.date === dateISO);

  // let dayTimingToChange: DayTimings;
  // if (indexToChange === -1) {
  //   // Construct new dayTiming
  //   dayTimingToChange = { date: dateISO, startTimings: {} };
  //   let startTimings = eachMinuteOfInterval(
  //     {
  //       start: startOfDay(parseISO(prefDuration.startAt)),
  //       end: endOfDay(parseISO(prefDuration.startAt)),
  //     },
  //     { step: 30 }
  //   );
  //   startTimings.forEach((timing) => {
  //     dayTimingToChange.startTimings[timing.toISOString()] = 0;
  //   });
  // } else {
  //   dayTimingToChange = meetupTimings[indexToChange];
  // }

  // let dayTimingToChange: DayTimings;
  // if (indexToChange === -1) {
  //   // Construct new dayTiming
  //   dayTimingToChange = { date: dateISO, startTimings: {} };
  //   let startTimings = eachMinuteOfInterval(
  //     {
  //       start: startOfDay(parseISO(prefDuration.startAt)),
  //       end: endOfDay(parseISO(prefDuration.startAt)),
  //     },
  //     { step: 30 }
  //   );
  //   startTimings.forEach((timing) => {
  //     dayTimingToChange.startTimings[timing.toISOString()] = 0;
  //   });
  // } else {
  //   dayTimingToChange = meetupTimings[indexToChange];
  // }

  // const newDayTiming = insertPreferredDurationToDayTiming(
  //   prefDuration,
  //   dayTimingToChange
  // );

  // if (indexToChange === -1) {
  //   meetupTimings.push(newDayTiming);
  // } else {
  //   meetupTimings[indexToChange] = newDayTiming;
  // }

  // await firestore
  //   .collection(DB.MEETUPS)
  //   .doc(meetupId)
  //   .update({ meetupTimings: meetupTimings });
};

export const deletePreferredDuration = async (
  prefDuration: PreferredDuration,
  meetupId: string,
  userId: string
) => {
  // // 1. Update meetup's new timing array
  // // Get old timing array
  // const { meetupTimings } = (
  //   await firestore.collection(DB.MEETUPS).doc(meetupId).get()
  // ).data() as MeetupFields;
  // const indexToChange = meetupTimings?.findIndex(
  //   (e) => e.date === startOfDay(parseISO(prefDuration.startAt)).toISOString()
  // );
  // // Modify the timing array
  // const old = meetupTimings[indexToChange].startTimings;
  // const { startAt, endAt } = prefDuration;
  // const startDate = parseISO(startAt);
  // const endDate = parseISO(endAt);
  // const startTimes = eachMinuteOfInterval(
  //   {
  //     start: startDate,
  //     end: endDate,
  //   },
  //   { step: 30 }
  // ).slice(0, -1);
  // startTimes.forEach((startTime) => {
  //   let startTimeString = startTime.toISOString();
  //   old[startTimeString] = old[startTimeString] - 1;
  // });
  // // Check if all timings are empty in this day. If yes, then just delete this.
  // if (Object.values(old).every((e) => e === 0)) {
  //   meetupTimings.splice(indexToChange, 1);
  // } else {
  //   meetupTimings[indexToChange].startTimings = old;
  // }
  // // Save the timing array
  // await firestore
  //   .collection(DB.MEETUPS)
  //   .doc(meetupId)
  //   .update({ meetupTimings: meetupTimings });

  // 2. Delete this preferred duration from participant
  // Get the preferredDurations array
  const { preferredDurations } = (
    await firestore
      .collection(DB.MEETUPS)
      .doc(meetupId)
      .collection(DB.PARTICIPANTS)
      .doc(userId)
      .get()
  ).data() as ParticipantFields;

  // Modify
  const indexToChange2 = preferredDurations.findIndex(
    (e) =>
      e.userUid === prefDuration.userUid &&
      e.startAt === prefDuration.startAt &&
      e.endAt === prefDuration.endAt
  );

  if (indexToChange2 === -1) {
    // Unable to delete
    throw new Error("Record not found!");
  }
  preferredDurations.splice(indexToChange2, 1);

  // Save
  await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .doc(userId)
    .update({
      preferredDurations: preferredDurations,
    });
};

export const createMeetup = async (
  meetupName: string,
  selectedUsers: OtherUser[],
  currentUser: UserData
) => {
  const meetupDoc = firestore.collection("meetups").doc();
  const meetupId = meetupDoc.id;

  // construct meetupDetails
  const meetupDetails = {
    id: meetupId,
    hostUid: currentUser.uid,
    hostUsername: currentUser.username,
    name: meetupName,
    activity: null, // null refers to unconfirmed
    startAt: null,
    endAt: null,
    isConfirmed: false,
    // meetupTimings: [],
  } as MeetupFields;

  // Basic fields in meetup
  await meetupDoc.set(meetupDetails);

  // Add Participants to meetup
  selectedUsers.forEach(async (pal) => {
    await meetupDoc
      .collection(DB.PARTICIPANTS)
      .doc(pal.uid)
      .set({
        username: pal.username,
        url_thumbnail: pal.url_thumbnail,
        uid: pal.uid,
        preferredDurations: [],
        joinedAt: new Date().toISOString(),
      } as ParticipantFields);
  });

  // Add user as participant
  await meetupDoc
    .collection(DB.PARTICIPANTS)
    .doc(currentUser.uid)
    .set({
      isHost: true,
      url_thumbnail: currentUser.url_thumbnail,
      username: currentUser.username,
      uid: currentUser.uid,
      joinedAt: new Date().toISOString(),
      preferredDurations: [],
    } as ParticipantFields);

  // Add meetup id to user's data
  await firestore
    .collection(DB.USERS)
    .doc(currentUser.uid)
    .update({
      meetup_ids: firebaseApp.firestore.FieldValue.arrayUnion(meetupId),
    });
  return meetupId;
};

export const addUsersToMeetup = (users: OtherUser[], meetupId: string) => {
  // Add to participants
  let batch = firestore.batch();
  let collection = firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS);

  users.forEach((user) => {
    let doc = collection.doc(user.uid);
    batch.set(doc, {
      joinedAt: new Date().toISOString(),
      uid: user.uid,
      url_thumbnail: user.url_thumbnail,
      preferredDurations: [],
      username: user.username,
    } as ParticipantFields);
  });

  batch.commit();
};

export const addCoOrganiser = async (userUid: string, meetupId: string) => {
  console.log(userUid, meetupId);
  await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .doc(userUid)
    .update({ isCoOrganiser: true } as Pick<
      ParticipantFields,
      "isCoOrganiser"
    >);
};

export const confirmMeetup = async (
  meetupId: string,
  startTime: Date,
  endTime: Date,
  activity: string
) => {
  // Save the timing in meetup details
  // Change the isConfirmed flag
  let newDetails: Partial<MeetupFields> = {
    startAt: startTime.toISOString(),
    endAt: endTime.toISOString(),
    activity: activity,
    isConfirmed: true,
  };
  await firestore.collection(DB.MEETUPS).doc(meetupId).update(newDetails);
};

export const editMeetup = async (meetupId: string) => {
  // Save the timing in meetup details
  // Change the isConfirmed flag
  let newDetails: Partial<MeetupFields> = {
    isConfirmed: false,
  };
  await firestore.collection(DB.MEETUPS).doc(meetupId).update(newDetails);
};

export const deleteMeetup = async (meetupId: string) => {
  // For each participant, go to their user profile and remove this meetup from their meetup_ids
  const snapshot = await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .get();

  let promiseArr: Promise<void>[] = [];
  snapshot.forEach((doc) => {
    const promise = firestore
      .collection(DB.USERS)
      .doc(doc.id)
      .update({
        meetup_ids: firebaseApp.firestore.FieldValue.arrayRemove(meetupId),
      });
    promiseArr.push(promise);
  });
  await Promise.all(promiseArr);

  // Then just delete this meetup document. Maybe just have a delete flag instead of actually deleting.
  await firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .update({ isDeleted: true });
};

export const leaveMeetup = async (userUid: string, meetupId: string) => {
  // For this meetup, remove this user from participants. Before this, check if user is the only host / co-organiser. If yes, then do not remove and return an error.
  const { coOrganisers, hostUid } = (
    await firestore.collection(DB.MEETUPS).doc(meetupId).get()
  ).data() as MeetupFields;

  if (userUid === hostUid && !coOrganisers) {
    throw new Error(
      "Organiser is unable to leave if there is no other co-organiser"
    );
  } else {
    await firestore
      .collection(DB.MEETUPS)
      .doc(meetupId)
      .collection(DB.PARTICIPANTS)
      .doc(userUid)
      .delete();
  }

  // For this user, remove this meetup from meetup_ids.
  await firestore
    .collection(DB.USERS)
    .doc(userUid)
    .update({
      meetup_ids: firebaseApp.firestore.FieldValue.arrayRemove(meetupId),
    });
};

export const updatePreferredDurations = async (
  meetupId: string,
  userUid: string,
  durs: PreferredDuration[]
) => {
  firestore
    .collection(DB.MEETUPS)
    .doc(meetupId)
    .collection(DB.PARTICIPANTS)
    .doc(userUid)
    .update({
      preferredDurations: durs,
    } as Pick<ParticipantFields, "preferredDurations">);
};
