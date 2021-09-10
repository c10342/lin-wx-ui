import { LinComponent } from "../common/component";
import { addUnit } from "../common/utils";
LinComponent({
  classes: ["text-class", "loading-class"],
  props: {
    // 加载文案文案
    text: String,
    // 图标类型
    type: {
      type: String,
      value: "primary",
      options: ["primary", "success", "info", "warning", "danger"]
    },
    // 尺寸大小
    size: {
      type: [String, Number],
      observer: "setLoadingStyle"
    },
    // 加载颜色
    color: {
      type: String,
      observer: "setLoadingStyle"
    },
    // 加载文案颜色
    textColor: {
      type: String,
      observer: "setTextStyle"
    },
    // 加载文案大小
    textSize: {
      type: [String, Number],
      observer: "setTextStyle"
    },
    // 转速时间
    time: {
      type: String,
      observer: "setLoadingStyle"
    },
    // 加载文案对齐方式
    vertical: {
      type: String,
      options: ["row", "col"],
      value: "row"
    }
  },
  data: {
    // loading样式
    loadingStyle: "",
    // 文本样式
    textStyle: ""
  },
  methods: {
    // 设置loading样式
    setLoadingStyle() {
      let style = "";
      const { size, time, color } = this.data;
      if (size) {
        style += `width:${addUnit(size)};height:${addUnit(size)};`;
      }
      if (time) {
        style += `animation-duration:${time};`;
      }
      if (color) {
        style += `border-right-color:${color};`;
        style += `border-top-color:${color};`;
        style += `border-bottom-color:${color};`;
      }
      if (style !== this.data.loadingStyle) {
        this.setData({ loadingStyle: style });
      }
    },
    // 设置文本样式
    setTextStyle() {
      let style = "";
      const { textColor, textSize } = this.data;
      if (textColor) {
        style += `color:${textColor};`;
      }
      if (textSize) {
        style += `font-size:${addUnit(textSize)};`;
      }
      if (style !== this.data.textStyle) {
        this.setData({ textStyle: style });
      }
    }
  }
});
