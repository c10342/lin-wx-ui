/**
 * 根据日期对象返回年月日
 * @param {Date} date
 */
export const getYearMonthDay = (time) => {
  if (!time) {
    return "";
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

const compareDate = (time1, time2, type) => {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  const newDate1 = new Date(
    date1.toLocaleDateString()
  );
  const newDate2 = new Date(
    date2.toLocaleDateString()
  );
  const obj = {
    Equal: newDate1.getTime() == newDate2.getTime(),
    EqAndLt: newDate1 <= newDate2,
    EqAndGt: newDate1 >= newDate2,
    Lt: newDate1 < newDate2,
    Gt: newDate1 > newDate2,
  };
  return obj[type];
};

export const isEqual = (time1, time2) => {
  return compareDate(time1, time2, "Equal");
};

export const isEqAndLt = (time1, time2) => {
  return compareDate(time1, time2, "EqAndLt");
};
export const isEqAndGt = (time1, time2) => {
  return compareDate(time1, time2, "EqAndGt");
};
export const isLt = (time1, time2) => {
  return compareDate(time1, time2, "Lt");
};
export const isGt = (time1, time2) => {
  return compareDate(time1, time2, "Gt");
};

export const isCurrentMonth = (time, currentTime) => {
  const date1 = new Date(time);
  const date2 = new Date(currentTime);

  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth()
  );
};


