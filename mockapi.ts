import { ContactDetails } from "types/types";

export const getMockUsers = async (): Promise<ContactDetails[]> => {
  const res = await (
    await fetch(`https://randomuser.me/api/?seed=foobar&results=20&`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  const results = res.results;
  const contacts: ContactDetails[] = results.map((person) => {
    return {
      id: person.login.uuid,
      name: person.name.first + " " + person.name.last,
      thumbnail: person.picture.thumbnail,
      selected: false,
    };
  });

  return contacts;
};
/*
RETURNED OBJECT
{
  "info": Object {
    "page": 1,
    "results": 1,
    "seed": "e2e6d3431d55f199",
    "version": "1.3",
  },
  "results": Array [
    Object {
      "cell": "06-95-43-97-57",
      "dob": Object {
        "age": 50,
        "date": "1971-10-31T06:50:16.540Z",
      },
      "email": "kelya.legrand@example.com",
      "gender": "female",
      "id": Object {
        "name": "INSEE",
        "value": "2NNaN57221031 34",
      },
      "location": Object {
        "city": "Toulon",
        "coordinates": Object {
          "latitude": "-4.4117",
          "longitude": "160.5623",
        },
        "country": "France",
        "postcode": 99048,
        "state": "Alpes-Maritimes",
        "street": Object {
          "name": "Rue de L'Abbé-Rousselot",
          "number": 4147,
        },
        "timezone": Object {
          "description": "Kabul",
          "offset": "+4:30",
        },
      },
      "login": Object {
        "md5": "9974259c0af9280d1b494cc12ba0fc5f",
        "password": "fdm7ed",
        "salt": "Lkh5yfsO",
        "sha1": "6ad6726b9be6179d03b8c98cfa168e8f2c37b6d2",
        "sha256": "58531ec37ae30c8670b72b6b3cca0d0e78e8993b82e0bea7cfa8548e8f44bc3c",
        "username": "blackladybug535",
        "uuid": "78ba69e0-f921-4e61-8a52-778d2e9004e9",
      },
      "name": Object {
        "first": "Kelya",
        "last": "Legrand",
        "title": "Ms",
      },
      "nat": "FR",
      "phone": "05-50-02-95-35",
      "picture": Object {
        "large": "https://randomuser.me/api/portraits/women/13.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/13.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/13.jpg",
      },
      "registered": Object {
        "age": 4,
        "date": "2017-06-06T21:32:07.800Z",
      },
    },
  ],
}
*/