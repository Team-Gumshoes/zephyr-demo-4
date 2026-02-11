export const formatDate = (
  dateString: string | undefined | null ,
): string | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const calculateNights = (
  departureDate: string | undefined | null,
  returnDate: string | undefined | null,
): number | undefined => {
  if (!departureDate || !returnDate) return undefined;
  const departure = new Date(departureDate);
  const returnD = new Date(returnDate);
  if (isNaN(departure.getTime()) || isNaN(returnD.getTime())) return undefined;
  const diffMs = returnD.getTime() - departure.getTime();
  const nights = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : undefined;
};
