import { firestore } from "lib/firebase";
import { convertUserToPal } from "lib/helpers";
import {
  NonTootleUser,
  OtherUser,
  PalFields,
  PalRequestFields,
  UserData,
} from "types/types";
import { DB } from "./dbtypes";

export const inviteContactToapp = (contact: NonTootleUser) => {
  console.log(
    `TO IMPLEMENT Going to invite ${contact.name} : ${contact.contactNumber} to the app!`
  );
};

export const requestAddPal = async (
  currentUser: UserData,
  targetUser: OtherUser
) => {
  // 1. For targetUser, add into incomingPalRequests
  // 2. For currentUser, add into sentPalRequests
  await firestore
    .collection(DB.USERS)
    .doc(targetUser.uid)
    .collection(DB.INCOMING_PAL_REQUESTS)
    .doc(currentUser.uid)
    .set(currentUser);
  await firestore
    .collection(DB.USERS)
    .doc(currentUser.uid)
    .collection(DB.SENT_PAL_REQUESTS)
    .doc(targetUser.uid)
    .set(targetUser);
  console.log(
    `${currentUser.username} has requested ${targetUser.username} as a pal!`
  );
};

export const acceptPalRequest = async (
  currentUser: UserData,
  requester: OtherUser
) => {
  console.log(
    `userA: ${currentUser.username} has accepted userB: ${requester.username} as a pal!`
  );
  // 1. For both users, add each other to pals collection
  await firestore
    .collection(DB.USERS)
    .doc(currentUser.uid)
    .collection(DB.PALS)
    .doc(requester.uid)
    .set(convertUserToPal(requester));

  await firestore
    .collection(DB.USERS)
    .doc(requester.uid)
    .collection(DB.PALS)
    .doc(currentUser.uid)
    .set(convertUserToPal(currentUser));

  // 2. For currentUser, remove document from incomingPalRequests
  await firestore
    .collection(DB.USERS)
    .doc(currentUser.uid)
    .collection(DB.INCOMING_PAL_REQUESTS)
    .doc(requester.uid)
    .delete();
  // 3. for requester, remove document from sentPalRequests
  await firestore
    .collection(DB.USERS)
    .doc(requester.uid)
    .collection(DB.SENT_PAL_REQUESTS)
    .doc(currentUser.uid)
    .delete();
};

export const deletePalRequest = async (
  // 1. For current user, delete the incoming Pal Request
  // 2. For the requester, delete from sent Pal Request
  currentUser: UserData,
  requester: OtherUser
) => {
  await firestore
    .collection(DB.USERS)
    .doc(currentUser.uid)
    .collection(DB.INCOMING_PAL_REQUESTS)
    .doc(requester.uid)
    .delete();

  await firestore
    .collection(DB.USERS)
    .doc(requester.uid)
    .collection(DB.SENT_PAL_REQUESTS)
    .doc(currentUser.uid)
    .delete();
};

export const getPals = async (userUid: string) => {
  let pals: PalFields[] = [];
  const snapshot = await firestore
    .collection(DB.USERS)
    .doc(userUid)
    .collection(DB.PALS)
    .get();
  snapshot.forEach((doc) => {
    let palData = doc.data() as PalFields;
    pals.push(palData);
  });
  return pals;
};

export const getPalRequests = async (userUid: string) => {
  let palRequests: PalRequestFields[] = [];
  const snapshot = await firestore
    .collection(DB.USERS)
    .doc(userUid)
    .collection(DB.INCOMING_PAL_REQUESTS)
    .get();
  snapshot.forEach((doc) => {
    let palRequestData = doc.data() as PalRequestFields;
    palRequests.push(palRequestData);
  });
  return palRequests;
};

// try to get all users who are not friends
export const getAllNonPals = async (userUid: string) => {
  const palsIds: string[] = [userUid];
  const snapshotA = await firestore
    .collection(DB.USERS)
    .doc(userUid)
    .collection(DB.PALS)
    .get();
  snapshotA.forEach((doc) => {
    palsIds.push(doc.id);
  });

  let nonPalUsers: OtherUser[] = [];
  const snapshot = await firestore.collection(DB.USERS).get();
  snapshot.forEach((doc) => {
    if (!palsIds.includes(doc.id)) {
      nonPalUsers.push(doc.data() as OtherUser);
    }
  });

  return nonPalUsers;
};

export const getSentPalRequests = async (userUid: string) => {
  let requests: OtherUser[] = [];
  const snapshot = await firestore
    .collection(DB.USERS)
    .doc(userUid)
    .collection(DB.SENT_PAL_REQUESTS)
    .get();
  snapshot.forEach((doc) => {
    requests.push(doc.data() as OtherUser);
  });
  return requests;
};
