import { DateTime } from "luxon";

export const formatdate = (date: string | undefined) => {
  if (date) {
    const d = new Date(date);
    return date ? DateTime.fromJSDate(d).toLocaleString(DateTime.DATE_MED) : "";
  }
  return "";
};
