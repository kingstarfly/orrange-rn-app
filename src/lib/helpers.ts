import { userData } from "constants/mockdata";
import {
  differenceInMinutes,
  eachMinuteOfInterval,
  endOfDay,
  intervalToDuration,
  parse,
  parseISO,
  startOfDay,
} from "date-fns";
import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";
import {
  DayTimings,
  OtherUser,
  PalFields,
  PreferredDuration,
  UserData,
} from "types/types";

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

export const getMinutesFromStartOfDay = (d: Date) => {
  return differenceInMinutes(d, startOfDay(d));
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

export const insertPreferredDurationToDayTiming = (
  preferredDuration: PreferredDuration,
  dayTiming: DayTimings
): DayTimings => {
  let myDayTiming = { ...dayTiming };
  const localDateISO = startOfDay(
    parseISO(preferredDuration.startAt)
  ).toISOString();
  const { startAt, endAt } = preferredDuration;
  const startDate = parseISO(startAt);
  const endDate = parseISO(endAt);

  const result = eachMinuteOfInterval(
    {
      start: startDate,
      end: endDate,
    },
    { step: 30 }
  );

  result.pop(); // Remove last timing because that is not a start time

  result.forEach((e) => {
    myDayTiming.startTimings[e.toISOString()] =
      myDayTiming.startTimings[e.toISOString()] + 1;
  });
  return myDayTiming;
};

export const generateHalfHourSlotsInGivenDate = (date: Date) => {
  let startTimings = eachMinuteOfInterval(
    {
      start: startOfDay(date),
      end: endOfDay(date),
    },
    { step: 30 }
  ).pop();
};
