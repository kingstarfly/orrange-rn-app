import { parse } from "date-fns";
import { DATE_FORMAT } from "screens/Create/SelectDates/DatePicker";

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
