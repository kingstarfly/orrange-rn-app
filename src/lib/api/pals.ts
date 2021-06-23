import { firestore } from "lib/firebase";
import {
  NonTootleUser,
  PalFields,
  PalRequestFields,
  TootleUser,
  UserData,
} from "types/types";

export const inviteContactToapp = (contact: NonTootleUser) => {
  console.log(
    `TO IMPLEMENT Going to invite ${contact.name} : ${contact.contactNumber} to the app!`
  );
};

export const addPal = (UserData: UserData, targetUser: TootleUser) => {
  console.log(
    `userA: ${UserData.username} is adding userB: ${targetUser.name} as a pal!`
  );
};

export const getPals = async (userUid: string) => {
  let pals: PalFields[] = [];
  const snapshot = await firestore
    .collection("users")
    .doc(userUid)
    .collection("pals")
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
    .collection("users")
    .doc(userUid)
    .collection("incomingPalRequests")
    .get();
  snapshot.forEach((doc) => {
    let palRequestData = doc.data() as PalRequestFields;
    palRequests.push(palRequestData);
  });
  return palRequests;
};
