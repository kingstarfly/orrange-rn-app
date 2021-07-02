import { userData } from "constants/mockdata";
import { parse } from "date-fns";
import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import { OtherUser, PalFields, UserData } from "types/types";

export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 0);
  };
};

export const getInitials = (name: string) => {
  if (!name) {
    return null;
  }
  const initials = name
    .split(" ")
    .map((str) => str[0])
    .join("");

  // return maximum first two only
  return initials.length > 2 ? initials.slice(0, 2) : initials;
};

export const convertUserToPal = (user: UserData | OtherUser): PalFields => {
  return {
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    url_thumbnail: user.url_thumbnail,
    addedAt: new Date().toISOString(),
  };
};
