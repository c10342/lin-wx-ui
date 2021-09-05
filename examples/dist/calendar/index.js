import {
  getYearMonthDay,
  getDate,
  isCurrentMonth,
  isEqual,
  isEqAndLt,
  isEqAndGt
} from "./utils";
const nowDate = new Date().getTime();
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      value: false,
      observer: "handleShow"
    },
    // 绑定值
    value: {
      // @ts-ignore
      type: [String, Number]
    },
    // 日历标题
    title: {
      type: String,
      value: "日期选择"
    },
    // 是否展示日历标题
    showTitle: {
      type: Boolean,
      value: true
    },
    // 是否展示确认按钮
    showConfirm: {
      type: Boolean,
      value: true
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      value: "确定"
    },
    // 禁用确定按钮
    disabledConfirm: {
      type: Boolean,
      value: false
    },
    // 日期行高
    rowHeight: {
      // @ts-ignore
      type: [String, Number]
    },
    // 重置按钮文案
    restText: {
      type: String,
      value: "重置"
    },
    // 是否展示重置按钮
    showReset: {
      type: Boolean,
      value: false
    },
    // 禁用重置按钮
    disabledReset: {
      type: Boolean,
      value: false
    },
    // 禁用该日期前的日期
    disabledBeforeDate: {
      // @ts-ignore
      type: [String, Number]
    },
    // 禁用该日期后的日期
    disabledAfterDate: {
      // @ts-ignore
      type: [String, Number]
    },
    // 禁用范围内的日期
    disabledRangeDate: Array,
    // 禁用指定日期
    disabledDate: Array,
    // 禁用所有日期
    disabled: Boolean,
    // 是否以弹层的形式展示日历
    poppable: {
      type: Boolean,
      value: true
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {
    // 顶部日期显示
    daysList: ["日", "一", "二", "三", "四", "五", "六"],
    // 当前日期,跟选中日期区别是，当前日期记录的是当前日历显示的年月，即选中日期为1月1号，但是当前日历上显示的是2月份，所以当前日期就是2月份
    time: nowDate,
    // 需要显示的日期
    visibeDaysList: [],
    // 选中的日期
    selectTime: ""
  },
  observers: {
    // 监听指定数据变化
    "time,selectTime,disabledBeforeDate,disabledAfterDate,disabledRangeDate,disabledDate,disabled": function (
      time,
      selectTime,
      disabledBeforeDate,
      disabledAfterDate,
      disabledRangeDate,
      disabledDate,
      disabled
    ) {
      // 根据当前时间获取年月
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
        arr.push(
          Object.assign(Object.assign({}, this.getVisibeTimeObj(da)), {
            // 是否为当前月，不是当前月的日期需要在样式上区分开来
            isCurrentMonth: isCurrentMonth(da, time.date),
            // 日期是否被选中
            isSelected: selectTime && isEqual(da, selectTime.date),
            // 是否被禁用
            isDisabled:
              disabled ||
              (disabledBeforeDate && isEqAndLt(da, disabledBeforeDate)) ||
              (disabledAfterDate && isEqAndGt(da, disabledAfterDate)) ||
              (disabledRangeDate &&
                this.handleRangeDate(da, disabledRangeDate)) ||
              (disabledDate && disabledDate.some((item) => isEqual(item, da)))
          })
        );
      }
      // 设置显示的日期
      this.setData({
        visibeDaysList: arr
      });
    }
  },
  methods: {
    // 判断日期是否在禁用范围内的日期
    handleRangeDate(date, disabledRangeDate) {
      if (Array.isArray(disabledRangeDate) && disabledRangeDate.length !== 0) {
        if (disabledRangeDate.length === 1) {
          // 如果日期数组长度为1
          const d = new Date(disabledRangeDate[0]);
          if (isEqAndLt(d, date)) {
            // 小于或等于，则禁用，跟disabledBeforeDate效果一样
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
    // 处理显示的时候
    handleShow(val) {
      // 获取绑定值
      const { value } = this.properties;
      if (value && val) {
        // 绑定值存在并且show为true
        const da = new Date(value);
        this.setData({
          // 选中的时间
          selectTime: this.getVisibeTimeObj(da),
          // 当前时间
          time: this.getTime(value)
        });
      }
    },
    // 点击遮罩层
    onMaskClick() {
      this.triggerEvent("mask-click");
    },
    // 处理绑定值
    handleValue() {
      let date = null;
      if (this.properties.value) {
        // 有绑定值则使用绑定值
        date = new Date(this.properties.value);
      } else {
        // 没有则使用当前时间，为默认时间
        date = new Date(nowDate);
      }
      // 返回对象
      return {
        label: `${date.getFullYear()}年${date.getMonth() + 1}月`,
        date,
        times: date.getTime()
      };
    },
    // 点击日期项
    onLabelClick(event) {
      // 获取点击的是第几个
      const { index } = event.target.dataset;
      // 获取点击的时间对象
      const selectTime = this.data.visibeDaysList[index];
      if (
        isEqual(selectTime.times, this.data.selectTime.times) ||
        selectTime.isDisabled
      ) {
        // 被禁用的或者点击的日期就是当前选中的日期
        return;
      }
      this.setData({
        selectTime,
        time: this.getTime(selectTime.times)
      });
      this.triggerEvent("change", selectTime.times);
    },
    // 点击上一个月
    prevMonth() {
      // 获取当前时间
      const date = new Date(this.data.time.times);
      // 设置上一个月
      date.setMonth(date.getMonth() - 1);
      // 设置当前时间，会触发observers中的东西
      this.setData({
        time: this.getTime(date.getTime())
      });
      this.triggerEvent("prevMonth", date);
    },
    // 点击下一个月
    nextMonth() {
      const date = new Date(this.data.time.times);
      date.setMonth(date.getMonth() + 1);
      this.setData({
        time: this.getTime(date.getTime())
      });
      this.triggerEvent("nextMonth", date);
    },
    // 点击上一年
    prevYear() {
      const date = new Date(this.data.time.times);
      date.setFullYear(date.getFullYear() - 1);
      this.setData({
        time: this.getTime(date.getTime())
      });
      this.triggerEvent("prevYear", date);
    },
    // 点击下一年
    nextYear() {
      const date = new Date(this.data.time.times);
      date.setFullYear(date.getFullYear() + 1);
      this.setData({
        time: this.getTime(date.getTime())
      });
      this.triggerEvent("nextYear", date);
    },
    // 点击确定按钮
    onConfirmClick() {
      this.triggerEvent("confirm", this.data.selectTime.times);
    },
    // 点击重置按钮
    onResetClick() {
      this.setData({ selectTime: "" });
      this.triggerEvent("reset");
    },
    // 点击关闭按钮
    onClose() {
      this.triggerEvent("close");
    },
    // 根据时间转化为对象数据
    getTime(date) {
      date = new Date(date);
      return {
        label: `${date.getFullYear()}年${date.getMonth() + 1}月`,
        date,
        times: date.getTime()
      };
    },
    // 根据时间对象转化成需要显示的对象数据
    getVisibeTimeObj(date) {
      return {
        label: date.getDate(),
        date,
        times: date.getTime()
      };
    }
  },
  ready() {
    // 一开始先初始化当前时间
    const handleValue = this.handleValue();
    this.setData({
      time: handleValue
    });
  }
});
