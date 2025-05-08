export const calculateNights = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const diffTime = Math.abs(endDate - startDate);

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};