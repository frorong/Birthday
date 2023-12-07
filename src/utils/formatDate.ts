export const formatDate = (inputDateString: Date) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const date = new Date(inputDateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  const formattedDate = `${month}월 ${day}일 (${dayOfWeek})`;
  return formattedDate;
};
