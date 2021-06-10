const admin = require("firebase-admin"); // required
const faker = require("faker"); // amazing library!
var serviceAccount = require("./privateKey.json");

process.env.FIRESTORE_EMULATOR_HOST = "localhost:4123";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// seed function
function getSeedData() {
  try {
    [...Array(10).keys()].map(() =>
      db.collection("events").add({
        author_name: faker.name.firstName() + " " + faker.name.lastName(),
        author_profile_pic: faker.image.imageUrl(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        address: {
          addr_1: faker.address.streetAddress(),
          addr_2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode(),
        },
      })
    );
    console.log("database seed was successful");
  } catch (error) {
    console.log(error, "database seed failed");
  }
}

getSeedData();
