import { formatDistanceToNow } from "date-fns";

export const Timeago = (createdAt) => {
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    // addSuffix: true,
  });
  const shortenedTime = formattedTime
    .replace(" seconds", "s")
    .replace(" second", "s")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(/^about /, "")
  return shortenedTime;
};
