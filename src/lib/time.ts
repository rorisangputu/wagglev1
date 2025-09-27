// utils/time.ts
export function parseTimeToDate(
  time: string,
  baseDate: Date = new Date()
): Date {
  const [hoursStr, minutesStr, meridiem] = time
    .replace(" ", "")
    .match(/(\d+):(\d+)(AM|PM)/i)!
    .slice(1);

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);

  return date;
}
