export const dateVisualizer = (date: string | undefined) => {
  if (date?.length !== 8 || !date) {
    return date;
  } else {
    return (
      date.slice(0, 4) +
      "年" +
      (date.slice(4, 6)[0] == "0" ? date.slice(5, 6) : date.slice(4, 6)) +
      "月" +
      (date.slice(6)[0] == "0" ? date.slice(7) : date.slice(6)) +
      "日"
    );
  }
};
