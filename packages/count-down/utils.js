// 长度不足这前面补0
function padZero(num, len = 2) {
  let str = `${num}`;
  while (str.length < len) {
    str = `0${str}`;
  }
  return str;
}

// 判断是否秒数相同
export function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

// 根据毫秒数转化成时分秒对象
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
export function parseTimeDate(time) {
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

/**
 * 根据timeDate转化成时间文本
 * @param {*} format 需要格式化的格式
 * @param {*} timeDate 包含时分秒毫秒的的对象
 * @returns
 */
export function parseFormat(format, timeDate) {
  const { days } = timeDate;
  // 获取对应的时分秒毫秒
  let { hours, minutes, seconds, milliseconds } = timeDate;

  if (format.indexOf('DD') > -1) {
    // DD存在则说明需要格式化天
    format = format.replace('DD', padZero(days));
  } else {
    // 不存在DD则需要，在小时这里加上天的时间
    // 比如 1天1小时，不显示天则是25小时
    hours += days * 24;
  }

  if (format.indexOf('HH') > -1) {
    // HH存在则说明需要格式化小时
    format = format.replace('HH', padZero(hours));
  } else {
    // HH不存在，就是不显示小时，分钟需要加上小时的时间
    // 比如1小时20分钟，不显示小时就是80分钟
    minutes += hours * 60;
  }

  // 分钟
  if (format.indexOf('mm') > -1) {
    format = format.replace('mm', padZero(minutes));
  } else {
    seconds += minutes * 60;
  }

  // 秒
  if (format.indexOf('ss') > -1) {
    format = format.replace('ss', padZero(seconds));
  } else {
    milliseconds += seconds * 1000;
  }

  return format.replace('SSS', padZero(milliseconds, 3));
}
