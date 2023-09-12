export const convertDate = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const convertToTime = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
