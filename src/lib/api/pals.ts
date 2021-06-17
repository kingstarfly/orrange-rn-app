import { NonTootleUser, TootleUser, UserData } from "types/types";

export const inviteContactToapp = (contact: NonTootleUser) => {
  console.log(
    `TO IMPLEMENT Going to invite ${contact.name} : ${contact.contactNumber} to the app!`
  );
};

export const addPal = (UserData: UserData, targetUser: TootleUser) => {
  console.log(
    `userA: ${UserData.name} is adding userB: ${targetUser.name} as a pal!`
  );
};
