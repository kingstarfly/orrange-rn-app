import {
  MeetupFields,
  PalFields,
  PalRequestFields,
  ParticipantFields,
  PendingParticipantFields,
  SuggestionFields,
  UserData,
} from "types/types";

// const admin = require("firebase-admin"); // required
import admin from "firebase-admin";
// const faker = require("faker"); // amazing library!
// import * as faker from "faker";
import faker from "faker";
import { addHours } from "date-fns";

var serviceAccount = require("./privateKey.json");

process.env.FIRESTORE_EMULATOR_HOST = "localhost:4123";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

faker.seed(123);
const MAIN_USER_INDEX = 0;

const users = [...Array(10).keys()].map(
  () =>
    ({
      uid: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      contact: faker.phone.phoneNumber("+65########"),
      username: faker.internet.userName(),
      url_original: faker.image.imageUrl(),
      url_thumbnail: faker.image.imageUrl(),
      meetup_ids: [],
    } as UserData)
);

users[0].uid = "DUMMY_USER_ID";

function initialiseUsers() {
  try {
    users.forEach((user) => {
      db.collection("users").doc(user.uid).set(user);
    });
  } catch (error) {
    console.log(error, "failed to init users");
  }
}

// PALS
// 1st and 2nd are friends, 2nd and 3rd are friends, ... 10th and 1st are friends
function createPals() {
  try {
    users.forEach((user, userIndex) => {
      let prevIndex = userIndex === 0 ? users.length - 1 : userIndex - 1;
      let nextIndex = userIndex === users.length - 1 ? 0 : userIndex + 1;
      let batch = db.batch();
      batch.set(
        db
          .collection("users")
          .doc(user.uid)
          .collection("pals")
          .doc(users[prevIndex].uid),
        {
          addedAt: faker.date.past().toISOString(),
          uid: users[prevIndex].uid,
          firstName: users[prevIndex].firstName,
          lastName: users[prevIndex].lastName,
          url_thumbnail: users[prevIndex].url_thumbnail,
          username: users[prevIndex].username,
        } as PalFields
      );
      batch.set(
        db
          .collection("users")
          .doc(user.uid)
          .collection("pals")
          .doc(users[nextIndex].uid),
        {
          addedAt: faker.date.past().toISOString(),
          uid: users[nextIndex].uid,
          firstName: users[nextIndex].firstName,
          lastName: users[nextIndex].lastName,
          url_thumbnail: users[nextIndex].url_thumbnail,
          username: users[nextIndex].username,
        } as PalFields
      );

      batch.commit();
    });
  } catch (error) {
    console.log(error, "failed to create pals");
  }
}

// Pal Requests
// 1st sends request to 3rd, 2nd send to 4th,... 10th send to 2nd
function createPalRequests() {
  try {
    users.forEach((user, userIndex) => {
      let prevIndex =
        userIndex <= 1 ? userIndex - 2 + users.length - 1 : userIndex - 2;
      const requester = users[prevIndex];
      db.collection("users")
        .doc(user.uid)
        .collection("incomingPalRequests")
        .doc(requester.uid)
        .set({
          requestedAt: faker.date.past().toISOString(),
          uid: requester.uid,
          firstName: requester.firstName,
          lastName: requester.lastName,
          url_thumbnail: requester.url_thumbnail,
          username: requester.username,
        } as PalRequestFields);
    });
  } catch (error) {
    console.log(error, "failed to create pal requests");
  }
}

// Meetups
const meetupNames = [
  "END OF SEM 2 PARTYYY",
  "Really long long long meet up name that is unnecessarily long. We probably want a hard cap.",
  "short one \u2728",
  "\u2728 smile more \u2728\u2728",
  "lorem ipsum lorem ipsum lorem ipsum",
  "Delta Bravo Alpha lorem ipsum ",
  "she said he said",
];
const meetups = [...Array(7).keys()].map((val) => {
  let startTime = faker.date.future();
  let endTime = addHours(startTime, 10);

  return {
    id: faker.datatype.uuid(),
    hostUid: users[val].uid,
    hostUsername: users[val].username,
    name: meetupNames[val],
    activity: meetupNames[val],
    startAt: startTime.toISOString(),
    endAt: endTime.toISOString(),
    // isConfirmed: true,
    isConfirmed: false,
  } as MeetupFields;
});

function initialiseMeetups() {
  try {
    meetups.forEach((meetup) => {
      db.collection("meetups").doc(meetup.id).set(meetup);
    });
  } catch (error) {
    console.log(error, "failed to init meetups");
  }
}

// add first 8 users to all meet ups, and last 2 users as pending for all meet ups.
let today = new Date();
function addParticipants() {
  try {
    meetups.forEach((meetup, meetupIndex) => {
      users.slice(0, 8).forEach(async (user, userIndex) => {
        await db
          .collection("meetups")
          .doc(meetup.id)
          .collection("participants")
          .doc(user.uid)
          .set({
            preferredDurations: [
              {
                startAt: addHours(today, 8).toISOString(),
                endAt: addHours(today, 12).toISOString(),
              },
              {
                startAt: addHours(today, 20).toISOString(),
                endAt: addHours(today, 25).toISOString(),
              },
            ],
            isHost: meetupIndex === userIndex ? true : false, // user 0 is host for meeting 0
            isCoOrganiser: false,
            username: user.username,
            url_thumbnail: user.url_thumbnail,
            uid: user.uid,
          } as ParticipantFields);
        await db
          .collection("users")
          .doc(user.uid)
          .update({
            meetup_ids: admin.firestore.FieldValue.arrayUnion(meetup.id),
          });
      });

      users.slice(8, 10).forEach((user, userIndex) => {
        db.collection("meetups")
          .doc(meetup.id)
          .collection("pendingParticipants")
          .doc(user.uid)
          .set({
            requestedAt: faker.date.past().toISOString(),
            username: user.username,
            url_thumbnail: user.url_thumbnail,
            uid: user.uid,
          } as PendingParticipantFields);
      });
    });
  } catch (error) {
    console.log(
      error,
      "failed to init add participants and pending particpants"
    );
  }
}

// suggestions

function createSuggestions() {
  const START = 2;
  const END = 6;
  try {
    meetups.forEach((meetup, meetupIndex) => {
      const docId = faker.datatype.uuid();
      users.slice(START, END + 1).forEach((user, userIndex) => {
        db.collection("meetups")
          .doc(meetup.id)
          .collection("suggestions")
          .doc(docId)
          .set({
            id: docId,
            ownerUid: user.uid,
            likedBy: users
              .slice(START + userIndex, END + 1)
              .map((user) => user.uid),
            content: faker.lorem.words(6),
            createdAt: faker.date.recent(30).toISOString(),
          } as SuggestionFields);
      });
    });
  } catch (error) {
    console.log(error, "failed to create suggestions");
  }
}

initialiseUsers();
createPals();
createPalRequests();
initialiseMeetups();
addParticipants();
createSuggestions();
console.log("Seeding success");
