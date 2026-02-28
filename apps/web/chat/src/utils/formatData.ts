/**
 * Format a date string into a human-readable format.
 * If the date string is invalid, returns the original string.
 * If the date string is undefined or null, returns undefined.
 * @param dateString - The date string to format.
 * @returns The formatted date string or undefined if the input is undefined or null.
 */
export const formatDate = (dateString: string | undefined | null): string | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format an ISO time string into a human-readable format.
 * If the time string is invalid, returns the original string.
 * If the time string is undefined or null, returns undefined.
 * @param isoTime - The ISO time string to format.
 * @returns The formatted time string or undefined if the input is undefined or null.
 */
export function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Calculate the number of nights between two dates.
 * If either of the dates is invalid or undefined/null, returns undefined.
 * @param departureDate - The departure date string.
 * @param returnDate - The return date string.
 * @returns The number of nights between the two dates, or undefined if the input is invalid.
 */
export const calculateNights = (
  departureDate: string | undefined | null,
  returnDate: string | undefined | null,
): number | undefined => {
  if (!departureDate || !returnDate) return undefined;
  const departure = new Date(departureDate + 'T00:00:00');
  const returnD = new Date(returnDate + 'T00:00:00');
  if (isNaN(departure.getTime()) || isNaN(returnD.getTime())) return undefined;
  const diffMs = returnD.getTime() - departure.getTime();
  const nights = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : undefined;
};
