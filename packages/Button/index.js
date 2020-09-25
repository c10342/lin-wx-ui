Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
      observer(color) {
        let style = "";
        if (color) {
          style += `color: ${this.data.plain ? color : "white"};`;
          if (!this.data.plain) {
            style += `background: ${color};`;
          }
          if (color.indexOf("gradient") !== -1) {
            style += "border: none;";
          } else {
            style += `border-color:${color};`;
          }
        }
        if (style !== this.data.baseStyle) {
          this.setData({ baseStyle: style });
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseStyle: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
