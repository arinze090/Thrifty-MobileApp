// Function to Obscure Email Using Asterisks
export const obscureEmail = emilString => {
  var splitEmail = emilString.split('@');
  var domain = splitEmail[1];
  var name = splitEmail[0];
  return name.substring(0, 3).concat('****@').concat(domain);
};

export const setPriceTo2DecimalPlaces = price => {
  const priceFigure = price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return priceFigure;
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function checkForLikedItemsInRedux(array, itemId) {
  return array.some(item => item.id === itemId);
}

export function timeAgo(timestamp) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}

export function convertTimestampToCustomFormat(timestamp) {
  const date = new Date(timestamp);
  const month = date.toLocaleString('en-US', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? 'pm' : 'am';

  const formattedDate = `${month} ${day < 10 ? '0' + day : day}, ${year}`;
  const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${
    minutes < 10 ? '0' + minutes : minutes
  }${meridiem}`;

  return `${formattedDate} at ${formattedTime}`;
}

export function timestampToDate(timestamp) {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Extract year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}

export function calculatePercentage(initialPrice, percentage) {
  return (initialPrice * percentage) / 100;
}

export const RNToast = (Toast, text2) => {
  Toast.show({
    type: 'thriftyToast',
    text2: text2,
  });
};
