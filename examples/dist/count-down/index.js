import { LinComponent } from "../common/component";
import { isSameSecond, parseFormat, parseTimeDate } from "./utils";
LinComponent({
  props: {
    // 倒计时时长，单位毫秒
    time: {
      type: Number,
      observer: "updateTime"
    },
    // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
    format: {
      type: String,
      value: "HH:mm:ss"
    },
    // 是否自动开始倒计时
    autoStart: {
      type: Boolean,
      value: true
    },
    // 是否开启毫秒级渲染
    millisecond: Boolean,
    // 是否使用自定义样式插槽
    useSlot: Boolean
  },
  data: {
    // 格式化之后的时间文本
    formattedTime: "0"
  },
  methods: {
    // 更新时间
    updateTime() {
      // 首先暂停掉，就是清空定时器
      this.pause();
      const { time, autoStart, format } = this.data;
      // 记录还剩下的倒计时时长
      this.mainTime = time;
      this.setData({ formattedTime: parseFormat(format, parseTimeDate(time)) });
      if (autoStart) {
        // 自动开始倒计时
        this.start();
      }
    },
    // 暂停
    pause() {
      if (this.timer) {
        // 清空定时器
        clearTimeout(this.timer);
        this.timer = null;
      }
      // 停止倒计时
      this.counting = false;
    },
    // 开始
    start() {
      if (this.counting) {
        // 已经是在倒计时了
        return;
      }
      // 开始倒计时
      this.counting = true;
      // 倒计时结束时间
      this.endTime = Date.now() + this.mainTime;
      // 渲染时间
      this.renderTime();
    },
    // 重置时间
    reset() {
      this.updateTime();
    },
    // 渲染时间
    renderTime() {
      if (this.data.millisecond) {
        // 开启毫秒级渲染
        this.renderTimeByMill();
      } else {
        this.renderTimeBySecond();
      }
    },
    // 每秒渲染
    renderTimeBySecond() {
      this.timer = setTimeout(() => {
        // 获取当前需要倒计时的时长
        const currentTime = this.getCurrentTime();
        // 秒数不一样才开始渲染
        if (!isSameSecond(currentTime, this.mainTime) || currentTime === 0) {
          // 更新时间
          this.setCurrentTime(currentTime);
        }
        if (this.mainTime !== 0) {
          // 剩下的倒计时时长不为0，说明还没有结束
          this.renderTimeBySecond();
        }
      }, 1000);
    },
    // 毫秒级别渲染
    renderTimeByMill() {
      this.timer = setTimeout(() => {
        this.setCurrentTime(this.getCurrentTime());
        if (this.mainTime !== 0) {
          // 剩下的倒计时时长不为0，说明还没有结束
          this.renderTimeByMill();
        }
      }, 30);
    },
    // 获取当前还剩下的倒计时时长
    getCurrentTime() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setCurrentTime(currentTime) {
      // 还剩下的倒计时时长
      this.mainTime = currentTime;
      // 转化时间，会得到一个对象
      const timeDate = parseTimeDate(currentTime);
      const { format } = this.data;
      this.triggerEvent("change", timeDate);
      // 设置时间文本
      this.setData({
        formattedTime: parseFormat(format, timeDate)
      });
      if (currentTime === 0) {
        // 倒计时结束
        this.pause();
        this.triggerEvent("finish");
      }
    }
  },
  beforeCreate() {
    // 定时器
    this.timer = null;
    // 记录还剩下的倒计时时长
    this.mainTime = 0;
    // 标志位，是否正在倒计时
    this.counting = false;
    // 倒计时结束时间
    this.endTime = null;
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
});
