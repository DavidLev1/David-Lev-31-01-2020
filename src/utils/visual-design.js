export const get2DigitsValue = value => {
  if (value.length < 2) value = "0" + value;
  return value;
};

export const getFormattedDate = rawDateTime => {
  const rawTime = new Date(rawDateTime);

  return (
    get2DigitsValue(rawTime.getDate().toString()) +
    "/" +
    get2DigitsValue((rawTime.getMonth() + 1).toString()) +
    "/" +
    rawTime.getFullYear()
  );
};
