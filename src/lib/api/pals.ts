import { NonTootleUser, TootleUser, CurrentUser } from "types/types";

export const inviteContactToapp = (contact: NonTootleUser) => {
  console.log(
    `TO IMPLEMENT Going to invite ${contact.name} : ${contact.contactNumber} to the app!`
  );
};

export const addPal = (currentUser: CurrentUser, targetUser: TootleUser) => {
  console.log(
    `userA: ${currentUser.name} is adding userB: ${targetUser.name} as a pal!`
  );
};
