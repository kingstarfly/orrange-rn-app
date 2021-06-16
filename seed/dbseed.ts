import {
  MeetupFields,
  PalFields,
  PalRequestFields,
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
    } as UserData)
);

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
        { addedDate: faker.date.past().toISOString() } as PalFields
      );
      batch.set(
        db
          .collection("users")
          .doc(user.uid)
          .collection("pals")
          .doc(users[nextIndex].uid),
        { addedDate: faker.date.past().toISOString() } as PalFields
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
        userIndex <= 1 ? users.length - 2 + userIndex : userIndex - 2;

      db.collection("users")
        .doc(user.uid)
        .collection("incomingPalRequests")
        .doc(users[prevIndex].uid)
        .set({
          requestDate: faker.date.past().toISOString(),
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
  "Short one \u2728",
  "\u2728 smile more \u2728\u2728",
];
const meetups = [...Array(4).keys()].map((val) => {
  let startTime = faker.date.future();
  let endTime = addHours(startTime, 10);

  return {
    id: faker.datatype.uuid(),
    createdBy: users[val].uid,
    name: meetupNames[val],
    activity: meetupNames[val],
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
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

initialiseUsers();
createPals();
createPalRequests();
initialiseMeetups();
console.log("Seeding success");
