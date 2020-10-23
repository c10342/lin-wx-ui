import { getYearMonthDay, getDate, isCurrentMonth, isEqual } from "./utils.js";
const nowDate = new Date().getTime();
Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: "handleShow",
    },
    value: {
      type: null,
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
  },
  data: {
    daysList: ["日", "一", "二", "三", "四", "五", "六"],
    time: nowDate,
    visibeDaysList: [],
    selectTime: "",
  },
  methods: {
    handleShow(val) {
      const value = this.properties.value;
      if (value && val) {
        this.setData({
          selectTime: value,
          time: value,
          visibeDaysList: this.getVisibeDays(value),
        });
      }
    },
    onMaskClick() {
      this.triggerEvent("mask-click");
    },
    handleValue() {
      if (this.properties.value) {
        return this.properties.value;
      }
      return nowDate;
    },
    getVisibeDays(date) {
      const { year, month } = getYearMonthDay(date);
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
        arr.push(da.getTime());
      }
      return arr;
    },
    onLabelClick(event) {
      const index = event.target.dataset.index;
      const selectTime = this.data.visibeDaysList[index];
      if (isEqual(selectTime, this.data.selectTime)) {
        return;
      }
      if (!isCurrentMonth(selectTime, this.data.time)) {
        this.setData({
          visibeDaysList: this.getVisibeDays(selectTime),
          time: selectTime,
        });
      }
      this.setData({
        selectTime: selectTime,
      });
      this.triggerEvent("change", selectTime);
    },
    prevMonth() {
      const date = new Date(this.data.time);
      date.setMonth(date.getMonth() - 1);
      this.setData({
        time: date.getTime(),
        visibeDaysList: this.getVisibeDays(date),
      });
      this.triggerEvent("prevMonth", date);
    },
    nextMonth() {
      const date = new Date(this.data.time);
      date.setMonth(date.getMonth() + 1);
      this.setData({
        time: date.getTime(),
        visibeDaysList: this.getVisibeDays(date),
      });
      this.triggerEvent("nextMonth", date);
    },
    prevYear() {
      const date = new Date(this.data.time);
      date.setFullYear(date.getFullYear() - 1);
      this.setData({
        time: date.getTime(),
        visibeDaysList: this.getVisibeDays(date),
      });
      this.triggerEvent("prevYear", date);
    },
    nextYear() {
      const date = new Date(this.data.time);
      date.setFullYear(date.getFullYear() + 1);
      this.setData({
        time: date.getTime(),
        visibeDaysList: this.getVisibeDays(date),
      });
      this.triggerEvent("nextYear", date);
    },
    onConfirmClick() {
      this.triggerEvent("confirm", this.data.selectTime);
    },
    onResetClick() {
      this.setData({ selectTime: "" });
      this.triggerEvent("reset");
    },
    onClose() {
      this.triggerEvent("close");
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {
    const handleValue = this.handleValue();
    const visibeDaysList = this.getVisibeDays(handleValue);
    this.setData({
      time: handleValue,
      visibeDaysList,
    });
  },
  moved: function () {},
  detached: function () {},
});
