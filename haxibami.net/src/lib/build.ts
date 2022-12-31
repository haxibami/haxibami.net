export const dateConverter = (date: string | undefined) => {
  if (!date) return "";
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
};
