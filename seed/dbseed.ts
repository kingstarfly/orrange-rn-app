import { PalFields, UserData } from "types/types";

// const admin = require("firebase-admin"); // required
import admin from "firebase-admin";
// const faker = require("faker"); // amazing library!
// import * as faker from "faker";
import faker from "faker";

var serviceAccount = require("./privateKey.json");

process.env.FIRESTORE_EMULATOR_HOST = "localhost:4123";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

faker.seed(123);

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

// // Pal Requests
// // 1st  are friends, 2nd and 2nd last are friends, etc
// function createPals() {
//   try {
//     users.forEach((user, userIndex) => {
//       let palIndex = users.length - 1 - userIndex;
//       if (userIndex === palIndex) {
//         return;
//       }
//       db.collection("users")
//         .doc(user.uid)
//         .collection("pals")
//         .doc(users[users.length - 1 - userIndex].uid)
//         .set({ addedDate: faker.date.past().toISOString() } as PalFields);
//     });
//   } catch (error) {
//     console.log(error, "failed to create pals");
//   }
// }

initialiseUsers();
createPals();
