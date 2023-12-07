export function isSameMonthAndDay(dateString: Date) {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const targetMonth = targetDate.getMonth() + 1;
  const targetDay = targetDate.getDate();

  return currentMonth === targetMonth && currentDay === targetDay;
}
