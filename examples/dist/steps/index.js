import { LinComponent } from "../common/component";
LinComponent({
  classes: ["step-class", "message-text", "circle-class", "line-class"],
  props: {
    // 步骤
    steps: {
      type: Array,
      value: []
    },
    // 当前步骤
    active: {
      type: Number,
      value: 0
    },
    // 显示方向
    direction: {
      type: String,
      value: "horizontal",
      options: ["horizontal", "vertical"]
    },
    // 激活状态颜色
    activeColor: String,
    // 未激活状态颜色
    inactiveColor: String,
    // 激活状态底部图标
    activeIcon: {
      type: String,
      value: "round-active"
    },
    // 未激活状态底部图标
    inactiveIcon: String
  }
});
