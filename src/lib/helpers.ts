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
