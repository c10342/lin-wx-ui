import {
  getYearMonthDay,
  getDate,
  isCurrentMonth,
  isEqual,
  isEqAndLt,
  isEqAndGt,
} from "./utils.js";
const nowDate = new Date().getTime();
Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: "handleShow",
    },
    value: {
      type: String,
      optionalTypes: [String, Number],
    },
    title: {
      type: String,
      value: "日期选择",
    },
    showTitle: {
      type: Boolean,
      value: true,
    },
    showConfirm: {
      type: Boolean,
      value: true,
    },
    confirmText: {
      type: String,
      value: "确定",
    },
    disabledConfirm: {
      type: Boolean,
      value: false,
    },
    rowHeight: String,
    restText: {
      type: String,
      value: "重置",
    },
    showReset: {
      type: Boolean,
      value: false,
    },
    disabledReset: {
      type: Boolean,
      value: false,
    },
    disabledBeforeDate: {
      type: Number,
      optionalTypes: [String, Number],
    },
    disabledAfterDate: {
      type: String,
      optionalTypes: [String, Number],
    },
    disabledRangeDate: Array,
    disabledDate: Array,
    disabled: Boolean,
    poppable: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    daysList: ["日", "一", "二", "三", "四", "五", "六"],
    time: nowDate,
    visibeDaysList: [],
    selectTime: "",
  },
  observers: {
    "time,selectTime,disabledBeforeDate,disabledAfterDate,disabledRangeDate,disabledDate,disabled": function(
      time,
      selectTime,
      disabledBeforeDate,
      disabledAfterDate,
      disabledRangeDate,
      disabledDate,
      disabled
    ) {
      const { year, month } = getYearMonthDay(time.date);
      //   本月1号的时间对象
      const currentFirstDay = getDate(year, month, 1);
      //   本月1号星期几
      const week = currentFirstDay.getDay();
      //   日历上第一行第一列的开始时间
      const startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
      const arr = [];
      //   42:日历上6行7列
      for (let i = 0; i < 42; i++) {
        const da = new Date(startDay + i * 60 * 60 * 1000 * 24);
        arr.push({
          ...this.getVisibeTimeObj(da),
          isCurrentMonth: isCurrentMonth(da, time.date),
          isSelected: selectTime && isEqual(da, selectTime.date),
          isDisabled:
            disabled ||
            (disabledBeforeDate && isEqAndLt(da, disabledBeforeDate)) ||
            (disabledAfterDate && isEqAndGt(da, disabledAfterDate)) ||
            (disabledRangeDate &&
              this.handleRangeDate(da, disabledRangeDate)) ||
            (disabledDate && disabledDate.some((item) => isEqual(item, da))),
        });
      }
      this.setData({
        visibeDaysList: arr,
      });
    },
  },
  methods: {
    handleRangeDate(date, disabledRangeDate) {
      if (Array.isArray(disabledRangeDate) && disabledRangeDate.length !== 0) {
        if (disabledRangeDate.length === 1) {
          const d = new Date(disabledRangeDate[0]);
          if (isEqAndLt(d, date)) {
            return true;
          }
        }
        if (disabledRangeDate.length >= 2) {
          const d1 = new Date(disabledRangeDate[0]);
          const d2 = new Date(disabledRangeDate[1]);
          if (isEqAndLt(d1, date) && isEqAndGt(d2, date)) {
            return true;
          }
        }
      }
      return false;
    },
    handleShow(val) {
      const value = this.properties.value;
      if (value && val) {
        const da = new Date(value);
        this.setData({
          selectTime: this.getVisibeTimeObj(da),
          time: this.getTime(value),
        });
      }
    },
    onMaskClick() {
      this.triggerEvent("mask-click");
    },
    handleValue() {
      let date = null;
      if (this.properties.value) {
        date = new Date(this.properties.value);
      } else {
        date = new Date(nowDate);
      }
      return {
        label: `${date.getFullYear()}年${date.getMonth() + 1}月`,
        date: date,
        times: date.getTime(),
      };
    },
    onLabelClick(event) {
      const index = event.target.dataset.index;
      const selectTime = this.data.visibeDaysList[index];
      if (
        isEqual(selectTime.times, this.data.selectTime.times) ||
        selectTime.isDisabled
      ) {
        return;
      }
      this.setData({
        selectTime: selectTime,
        time: this.getTime(selectTime.times),
      });
      this.triggerEvent("change", selectTime.times);
    },
    prevMonth() {
      const date = new Date(this.data.time.times);
      date.setMonth(date.getMonth() - 1);
      this.setData({
        time: this.getTime(date.getTime()),
      });
      this.triggerEvent("prevMonth", date);
    },
    nextMonth() {
      const date = new Date(this.data.time.times);
      date.setMonth(date.getMonth() + 1);
      this.setData({
        time: this.getTime(date.getTime()),
      });
      this.triggerEvent("nextMonth", date);
    },
    prevYear() {
      const date = new Date(this.data.time.times);
      date.setFullYear(date.getFullYear() - 1);
      this.setData({
        time: this.getTime(date.getTime()),
      });
      this.triggerEvent("prevYear", date);
    },
    nextYear() {
      const date = new Date(this.data.time.times);
      date.setFullYear(date.getFullYear() + 1);
      this.setData({
        time: this.getTime(date.getTime()),
      });
      this.triggerEvent("nextYear", date);
    },
    onConfirmClick() {
      this.triggerEvent("confirm", this.data.selectTime.times);
    },
    onResetClick() {
      this.setData({ selectTime: "" });
      this.triggerEvent("reset");
    },
    onClose() {
      this.triggerEvent("close");
    },
    getTime(date) {
      date = new Date(date);
      return {
        label: `${date.getFullYear()}年${date.getMonth() + 1}月`,
        date: date,
        times: date.getTime(),
      };
    },
    getVisibeTimeObj(date) {
      return {
        label: date.getDate(),
        date: date,
        times: date.getTime(),
      };
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    const handleValue = this.handleValue();
    this.setData({
      time: handleValue,
    });
  },
  moved: function() {},
  detached: function() {},
});
