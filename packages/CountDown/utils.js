function padZero (num, len = 2) {
  let str = `${num}`;
  while (str.length < len) {
    str = `0${str}`;
  }
  return str;
}

// 判断是否秒数相同
export function isSameSecond (time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

// 根据毫秒数转化成时分秒
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
export function parseTimeDate (time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}

export function parseFormat (format, timeDate) {
  const { days } = timeDate;
  let {
    hours, minutes, seconds, milliseconds
  } = timeDate;

  if (format.indexOf('DD') > -1) {
    format = format.replace('DD', padZero(days));
  } else {
    hours += days * 24;
  }

  if (format.indexOf('HH') > -1) {
    format = format.replace('HH', padZero(hours));
  } else {
    minutes += hours * 60;
  }

  if (format.indexOf('mm') > -1) {
    format = format.replace('mm', padZero(minutes));
  } else {
    seconds += minutes * 60;
  }

  if (format.indexOf('ss') > -1) {
    format = format.replace('ss', padZero(seconds));
  } else {
    milliseconds += seconds * 1000;
  }

  return format.replace('SSS', padZero(milliseconds, 3));
}
