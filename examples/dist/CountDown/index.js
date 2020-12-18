import { isSameSecond, parseFormat, parseTimeDate } from "./utils";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    time: {
      type: Number,
      observer: "updateTime",
    },
    format: {
      type: String,
      value: "HH:mm:ss",
    },
    autoStart: {
      type: Boolean,
      value: true,
    },
    millisecond: Boolean,
    useSlot: Boolean,
  },
  data: {
    formattedTime: "0",
  },
  methods: {
    updateTime() {
      this.pause();
      const { time, autoStart, format } = this.properties;
      this.mainTime = time;
      this.setData({ formattedTime: parseFormat(format, parseTimeDate(time)) });
      if (autoStart) {
        this.start();
      }
    },
    // 暂停
    pause() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.counting = false;
    },
    // 开始
    start() {
      if (this.counting) {
        return;
      }
      this.counting = true;
      this.endTime = Date.now() + this.mainTime;
      this.renderTime();
    },
    reset() {
      this.updateTime();
    },
    // 渲染时间
    renderTime() {
      if (this.properties.millisecond) {
        this.renderTimeByMill();
      } else {
        this.renderTimeBySecond();
      }
    },
    // 每秒渲染
    renderTimeBySecond() {
      this.timer = setTimeout(() => {
        const currentTime = this.getCurrentTime();
        // 秒数不一样才开始渲染
        if (!isSameSecond(currentTime, this.mainTime) || currentTime === 0) {
          this.setCurrentTime(currentTime);
        }
        if (this.mainTime !== 0) {
          this.renderTimeBySecond();
        }
      }, 1000);
    },
    // 毫秒级别渲染
    renderTimeByMill() {
      this.timer = setTimeout(() => {
        this.setCurrentTime(this.getCurrentTime());
        if (this.mainTime !== 0) {
          this.renderTimeByMill();
        }
      }, 30);
    },
    getCurrentTime() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setCurrentTime(currentTime) {
      this.mainTime = currentTime;

      const timeDate = parseTimeDate(currentTime);

      const { format } = this.properties;

      this.triggerEvent("change", timeDate);

      this.setData({
        formattedTime: parseFormat(format, timeDate),
      });

      if (currentTime === 0) {
        this.pause();
        this.triggerEvent("finish");
      }
    },
  },
  created: function() {
    this.timer = null;
    this.mainTime = 0;
    this.counting = false;
    this.endTime = null;
  },
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
});
