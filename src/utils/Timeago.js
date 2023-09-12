import { parseISO, formatDistanceToNowStrict } from "date-fns";

export const Timeago = (timeStamp) => {
  let timeAgo = "";
  const date = parseISO(timeStamp);
  const timePeriod = formatDistanceToNowStrict(date);
  timeAgo = `${timePeriod} ago`;
  const convert = timeAgo.split(" ")
  const convert2 = convert[1].slice(0, 1)
  return `${convert[0]}${convert2}`;
};
