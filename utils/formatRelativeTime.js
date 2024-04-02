export default function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const secondsDifference = timeDifference / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = hoursDifference / 24;
  const monthsDifference = daysDifference / 30;
  const yearsDifference = monthsDifference / 12;

  if (yearsDifference >= 1) {
    return `${Math.floor(yearsDifference)} years ago`;
  } else if (monthsDifference >= 1) {
    return `${Math.floor(monthsDifference)} months ago`;
  } else if (daysDifference >= 1) {
    return `${Math.floor(daysDifference)} days ago`;
  } else if (hoursDifference >= 1) {
    return `${Math.floor(hoursDifference)} hours ago`;
  } else if (minutesDifference >= 1) {
    return `${Math.floor(minutesDifference)} minutes ago`;
  } else {
    return `${Math.floor(secondsDifference)} seconds ago`;
  }
}
