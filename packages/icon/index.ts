import { LinComponent } from "../common/component";
import { addUnit } from "../common/utils";
LinComponent({
  props: {
    // 图标名称
    icon: {
      type: String,
      require: true,
      value: ""
    },
    // 图标类型
    type: {
      type: String,
      value: "default",
      options: ["default", "primary", "info", "warning", "danger", "success"]
    },
    // 图标大小
    size: {
      type: [String, Number],
      value: "",
      observer: "setStyle"
    },
    // 图标颜色
    color: {
      type: String,
      observer: "setStyle"
    }
  },
  data: {
    viewStyle: ""
  },
  methods: {
    // 设置样式
    setStyle() {
      let style = "";
      const { size, color } = this.data;
      if (size) {
        style += `font-size:${addUnit(size)};`;
      }
      if (color) {
        style += `color:${color};`;
      }

      if (style !== this.data.viewStyle) {
        this.setData({ viewStyle: style });
      }
    }
  }
});
