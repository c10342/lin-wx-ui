/**
 * 根据日期对象返回年月日
 * @param {Date} date
 */
export const getYearMonthDay = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
};

/**
 * 根据年月日返回一个日期对象
 * @param {number} year
 * @param {number} month
 * @param {number} day
 */
export const getDate = (year, month, day) => {
  if (!year || !month || !day) {
    return new Date();
  }
  return new Date(year, month - 1, day);
};

// 对比2个时间
const compareDate = (time1, time2, type) => {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  // 传入的时间虽然可能是同一天的，但是可能会有时间差，所以需要统一一下
  // toLocaleDateString() 方法返回该日期对象日期部分的字符串，该字符串格式因不同语言而不同
  const newDate1 = new Date(date1.toLocaleDateString('zh'));
  const newDate2 = new Date(date2.toLocaleDateString('zh'));
  const obj = {
    Equal: newDate1.getTime() === newDate2.getTime(),
    EqAndLt: newDate1 <= newDate2,
    EqAndGt: newDate1 >= newDate2,
    Lt: newDate1 < newDate2,
    Gt: newDate1 > newDate2,
  };
  return obj[type];
};

// time1是否等于time2
export const isEqual = (time1, time2) => compareDate(time1, time2, 'Equal');

// time1是否小于等于time2
export const isEqAndLt = (time1, time2) => compareDate(time1, time2, 'EqAndLt');

// time1是否大于等于time2
export const isEqAndGt = (time1, time2) => compareDate(time1, time2, 'EqAndGt');

// time1是否小于time2
export const isLt = (time1, time2) => compareDate(time1, time2, 'Lt');

// time1是否大于time2
export const isGt = (time1, time2) => compareDate(time1, time2, 'Gt');

// 判断是否为当前月
export const isCurrentMonth = (time, currentTime) => {
  const date1 = new Date(time);
  const date2 = new Date(currentTime);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};
