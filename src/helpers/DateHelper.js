export const calculateNights = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const diffTime = Math.abs(endDate - startDate);

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
